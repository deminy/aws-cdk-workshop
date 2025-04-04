# Stack "state-machine-selective-execution"

How to run states selectively in a state machine.

```bash
cdk synth test-state-machine-selective-execution
cdk synth test-state-machine-selective-execution > ./test-state-machine-selective-execution.yaml
cdk diff  test-state-machine-selective-execution

cdk deploy --require-approval never test-state-machine-selective-execution

# Use the destroy command only when needed.
# cdk destroy test-state-machine-selective-execution
# cdk destroy test-state-machine-selective-execution --force
```

Execute the state machine with different inputs to run different states:

```bash
# To run nothing.
aws stepfunctions start-execution \
    --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-selective-execution

# To run state A-1 only.
aws stepfunctions start-execution \
    --input '{"state_a_1": true}' \
    --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-selective-execution

# To run state A-2 only.
aws stepfunctions start-execution \
    --input '{"state_a_2": true}' \
    --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-selective-execution

# To run state B only.
aws stepfunctions start-execution \
    --input '{"state_b": true}' \
    --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-selective-execution

# To run state A-1 and B only.
aws stepfunctions start-execution \
    --input '{"state_a_1": true, "state_b": true}' \
    --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-selective-execution

# To run state A-2 and B only.
aws stepfunctions start-execution \
    --input '{"state_a_2": true, "state_b": true}' \
    --state-machine-arn arn:aws:states:${AWS_REGION}:${AWS_ACCOUNT_ID}:stateMachine:test-state-machine-selective-execution
```
