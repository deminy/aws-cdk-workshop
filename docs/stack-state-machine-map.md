# Stack "state-machine-map"

How to use map in state machines.

```bash
cdk synth test-state-machine-map
cdk synth test-state-machine-map > ./test-state-machine-map.yaml
cdk diff  test-state-machine-map

cdk deploy --require-approval never test-state-machine-map

aws stepfunctions start-execution --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-map

# Use the destroy command only when needed.
# cdk destroy test-state-machine-map
# cdk destroy test-state-machine-map --force
```
