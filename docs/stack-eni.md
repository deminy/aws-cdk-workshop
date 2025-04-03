# Stack "eni"

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
