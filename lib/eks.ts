import * as cdk from 'aws-cdk-lib';
import { Cluster, KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import { InstanceType, IVpc } from 'aws-cdk-lib/aws-ec2';
import { KubectlV32Layer } from '@aws-cdk/lambda-layer-kubectl-v32';
import { Construct } from 'constructs';
import { EksStackProps } from "../lib/props";

export class Eks extends cdk.Stack {
    private readonly vpc: IVpc;
    private readonly prefix: string;
    public readonly cluster: Cluster;

    constructor(scope: Construct, id: string, props: EksStackProps) {
        super(scope, id, props);
        this.vpc = props.vpc;
        this.prefix = props.prefix;

        // Create the EKS cluster with a default capacity (node group).
        this.cluster = new Cluster(this, 'EKS Cluster', {
            vpc: this.vpc,
            clusterName: this.prefix + `couchbase`,
            version: KubernetesVersion.V1_32,
            kubectlLayer: new KubectlV32Layer(this, 'Kubectl Layer'),
            defaultCapacityInstance: new InstanceType('t3.medium'),
            defaultCapacity: 2,
        });

        // Create a Kubernetes namespace for Couchbase resources.
        this.cluster.addManifest('Couchbase Namespace', {
            apiVersion: 'v1',
            kind: 'Namespace',
            metadata: {
                name: 'couchbase',
            }
        });

        // Creat a Kubernetes Secret for Couchbase admin credentials (temporarily).
        // TODO: use AWS Secret Manager or other secure storage for production.
        this.cluster.addManifest('Couchbase Admin Secret', {
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: 'couchbase-admin-secret',
                namespace: 'couchbase',
            },
            type: 'Opaque',
            data: {
                username: 'Administrator',
                password: 'password',
            }
        });

        // Install the Couchbase Autonomous Operator via Helm.
        //
        // @see https://github.com/helm/helm
        // @see https://docs.couchbase.com/operator/current/helm-setup-guide.html
        // @see https://artifacthub.io/packages/helm/couchbase/couchbase-operator
        this.cluster.addHelmChart('Couchbase Autonomous Operator', {
            chart: 'couchbase-operator',
            repository: 'https://couchbase-partners.github.io/helm-charts/',
            version: '2.80.3',
            namespace: 'couchbase',
            release: 'couchbase-autonomous-operator',
            values: {
                // TODO: Add customize operator settings.
            }
        });
    }
}
