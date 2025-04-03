# Stack "state-machine-nested"

To test state machine execution within another state machine.

```bash
cdk synth test-state-machine-nested
cdk synth test-state-machine-nested > ./test-state-machine-nested.yaml
cdk diff  test-state-machine-nested

cdk deploy --require-approval never test-state-machine-nested

aws stepfunctions start-execution --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-nested-parent

# Use the destroy command only when needed.
# cdk destroy test-state-machine-nested
# cdk destroy test-state-machine-nested --force
```
