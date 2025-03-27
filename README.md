# The CDK TypeScript project of couchbase-eks

This project is to test the integration between Couchbase Server and AWS EKS. It uses AWS CDK v2 to manage the CloudFormation stack in AWS.

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

cdk synth test-couchbase-eks
cdk synth test-couchbase-eks > ./test-couchbase-eks.yaml

cdk diff --fail && echo "no diffs found" || echo "diffs found"
cdk deploy --require-approval never test-couchbase-eks

# Use the destroy command only when needed.
# cdk destroy test-couchbase-eks
# cdk destroy test-couchbase-eks --force
```
