import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { StackProps } from "./props";

export class Vpc extends Stack {
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'VPC', {
            vpcName: `${props.prefix}vpc`,
            maxAzs: 2,
        });
    }
}
