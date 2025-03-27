import * as cdk from 'aws-cdk-lib';
import { Cluster } from 'aws-cdk-lib/aws-eks';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { DebugStackProps } from "../lib/props";

export class Debug extends cdk.Stack {
    private readonly vpc: Vpc;
    private readonly prefix: string;
    private cluster: Cluster;

    constructor(scope: Construct, id: string, props: DebugStackProps) {
        super(scope, id, props);
        this.vpc = props.vpc;
        this.prefix = props.prefix;
        this.cluster = props.cluster;
    }
}
