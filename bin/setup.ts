#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Debug } from "../lib/debug";
import { Eks } from "../lib/eks";
import { Vpc } from "../lib/vpc";
import {CustomizedProps} from "../lib/props";

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

const app = new cdk.App();

const stackVpc = new Vpc(app, `${aws_stack_prefix}vpc`, {
    env: { account: aws_account_id, region: aws_region },
    stackName: `${aws_stack_prefix}vpc`,
    description: "The customized VPC to have our EKS service running inside.",
});

const customizedProps: CustomizedProps = {
    vpc: stackVpc.vpc,
    prefix: aws_stack_prefix,
};

const eks = new Eks(app, `${aws_stack_prefix}eks`, {
    ...customizedProps,
    env: { account: aws_account_id, region: aws_region },
    stackName: `${aws_stack_prefix}eks`,
    description: "The AWS EKS to test integration of Couchbase Server.",
});

new Debug(app, `${aws_stack_prefix}debug`, {
    ...customizedProps,
    cluster: eks.cluster,
    env: { account: aws_account_id, region: aws_region },
    stackName: `${aws_stack_prefix}debug`,
    description: "For debugging/testing purposes only.",
});
