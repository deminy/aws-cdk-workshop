#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CouchbaseEks } from "../lib/couchbase-eks";

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

new CouchbaseEks(app, 'test-couchbase-eks', {
    env: { account: aws_account_id, region: aws_region },
    stackName: 'test-couchbase-eks',
    description: "Test integration of Couchbase Server with AWS EKS.",
});
