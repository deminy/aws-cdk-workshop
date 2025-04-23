# Stack "roles"

To test AWS role creation.

```bash
cdk synth test-roles
cdk synth test-roles > ./test-roles.yaml
cdk diff  test-roles

cdk deploy --require-approval never test-roles

# Use the destroy command only when needed.
# cdk destroy test-roles
# cdk destroy test-roles --force
```
