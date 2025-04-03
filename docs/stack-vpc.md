# Stack "vpc"

An example to create a VPC in AWS.

```bash
cdk synth test-vpc
cdk synth test-vpc > ./test-vpc.yaml
cdk diff  test-vpc

cdk deploy --require-approval never test-vpc

# Use the destroy command only when needed.
# cdk destroy test-vpc
# cdk destroy test-vpc --force
```
