#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StackProps, StackPropsWithVpc } from "../src/props";
import { TestLayerSwoole } from "../src/stacks/layer-swoole";
import { TestNetworkInterfaces } from "../src/stacks/network-interfaces";
import { TestStateMachine } from "../src/stacks/state-machine";
import { TestStateMachineMap } from "../src/stacks/state-machine-map";
import { TestStateMachineNested } from "../src/stacks/state-machine-nested";
import { TestVpc } from "../src/stacks/vpc";

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

new TestLayerSwoole(app, `${aws_stack_prefix}layer-swoole`, {
    ...stackProps,
    stackName: `${aws_stack_prefix}layer-swoole`,
    description: "Test the Swoole layer of Bref.",
});

new TestStateMachine(app, `${aws_stack_prefix}state-machine`, {
    ...stackProps,
    stackName: `${aws_stack_prefix}state-machine`,
    description: "Test state machines in AWS.",
});

new TestStateMachineMap(app, `${aws_stack_prefix}state-machine-map`, {
    ...stackProps,
    stackName: `${aws_stack_prefix}state-machine-map`,
    description: "How to use map in state machines.",
});

new TestStateMachineNested(app, `${aws_stack_prefix}state-machine-nested`, {
    ...stackProps,
    stackName: `${aws_stack_prefix}state-machine-nested`,
    description: "To test state machine execution within another state machine.",
});

const stackVpc = new TestVpc(app, `${aws_stack_prefix}vpc`, {
    ...stackProps,
    stackName: `${aws_stack_prefix}vpc`,
    description: "The customized VPC to have our EKS service running inside.",
});

const stackPropsWithVpc: StackPropsWithVpc = {
    ...stackProps,
    vpc: stackVpc.vpc,
};

new TestNetworkInterfaces(app, `${aws_stack_prefix}eni`, {
    ...stackPropsWithVpc,
    stackName: `${aws_stack_prefix}eni`,
    description: 'To create new security group with network interfaces attached it.',
});
