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
            defaultCapacity: 2
        });
    }
}
