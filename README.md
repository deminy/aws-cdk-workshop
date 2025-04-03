# Workshop: AWS CDK

Demonstration of building API services using AWS CDK, with each stack configured as Infrastructure as Code (IaC).

## Setup The Project With AWS CDK

Here are the commands to setup the project with AWS CDK v2:

```bash
# To install TypeScript.
npm install -g typescript

# To install/upgrade AWS CDK.
npm install -g aws-cdk
cdk --version # To check the version of AWS CDK.

# To bootstrap the environment.
cdk bootstrap
```

## Manage The CloudFormation Stack Using AWS CDK

```bash
export AWS_PROFILE=default       # Replace with your AWS profile.
export AWS_ACCOUNT_ID=1234567890 # Replace with your AWS account ID.
export AWS_REGION=us-east-1      # Replace with your AWS region.

export AWS_STACK_PREFIX=test- # Set the stack prefix to avoid conflicts with other stacks. Default is `test-`.
```

### Stack "vpc"

A first example to create a VPC in AWS.

```bash
cdk synth test-vpc
cdk synth test-vpc > ./test-vpc.yaml
cdk diff  test-vpc

cdk deploy --require-approval never test-vpc

# Use the destroy command only when needed.
# cdk destroy test-vpc
# cdk destroy test-vpc --force
```

### Stack "state-machine"

To test state machines in AWS.

```bash
cdk synth test-state-machine
cdk synth test-state-machine > ./test-state-machine.yaml
cdk diff  test-state-machine

cdk deploy --require-approval never test-state-machine

aws stepfunctions start-execution --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine

# Use the destroy command only when needed.
# cdk destroy test-state-machine
# cdk destroy test-state-machine --force
```

### Stack "eni"

To create a new security group with two new network interfaces attached to it.

```bash
cdk synth test-eni
cdk synth test-eni > ./test-eni.yaml
cdk diff  test-eni

cdk deploy --require-approval never test-eni

# Use the destroy command only when needed.
# cdk destroy test-eni
# cdk destroy test-eni --force
```
