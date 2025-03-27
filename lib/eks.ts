import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EksStackProps } from "../lib/props";

export class Eks extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EksStackProps) {
        super(scope, id, props);
    }
}
