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

## List of Stacks

* [test-layer-swoole](docs/stack-layer-swoole.md) - To Test the Swoole layer of [Bref].
* [test-roles](docs/stack-roles.md) - To test AWS role creation.
* state machines:
  * [test-state-machine](docs/stack-state-machine.md) - To test state machines in AWS.
  * [test-state-machine-map](docs/stack-state-machine-map.md) - How to use map in state machines.
  * [test-state-machine-nested](docs/stack-state-machine-nested.md) - To test state machine execution within another state machine.
  * [test-state-machine-selective-execution](docs/stack-state-machine-selective-execution.md) - How to run states selectively in a state machine.
* [test-vpc](docs/stack-vpc.md) - An example to create a VPC in AWS.
* [test-eni](docs/stack-eni.md) - To create a new security group with two new network interfaces attached to it.

[Bref]: https://bref.sh
