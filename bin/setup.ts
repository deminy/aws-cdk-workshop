#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StackProps, StackPropsWithVpc } from "../lib/props";
import { NetworkInterfaces } from "../lib/network-interfaces";
import { Vpc } from "../lib/vpc";

const aws_stack_prefix = process.env.AWS_STACK_PREFIX ?? 'test-';
const aws_account_id = process.env.AWS_ACCOUNT_ID ?? '';
const aws_region = process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? '';
if (!aws_account_id) {
    console.warn('Warning: AWS_ACCOUNT_ID is not set or is empty. Please set it in your environment variables.');
    process.exit(1);
}
if (!aws_region) {
    console.warn('Warning: AWS_REGION and AWS_DEFAULT_REGION are not set or are empty. Please set one of it in your environment variables.');
    process.exit(1);
}
console.log(`AWS account ID: ${aws_account_id}`);
console.log(`AWS region: ${aws_region}`);

const stackProps: StackProps = {
    prefix: aws_stack_prefix,
    env: { account: aws_account_id, region: aws_region },
};

const app = new cdk.App();

const stackVpc = new Vpc(app, `${aws_stack_prefix}vpc`, {
    ...stackProps,
    stackName: `${aws_stack_prefix}vpc`,
    description: "The customized VPC to have our EKS service running inside.",
});

const stackPropsWithVpc: StackPropsWithVpc = {
    ...stackProps,
    vpc: stackVpc.vpc,
};

new NetworkInterfaces(app, `${aws_stack_prefix}eni`, {
    ...stackPropsWithVpc,
    stackName: `${aws_stack_prefix}eni`,
    description: 'To create new security group with network interfaces attached it.',
});
