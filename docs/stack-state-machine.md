# Stack "state-machine"

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
