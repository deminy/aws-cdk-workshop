# Stack "layer-swoole"

To Test the Swoole layer of Bref.

```bash
cdk synth test-layer-swoole
cdk synth test-layer-swoole > ./test-layer-swoole.yaml
cdk diff  test-layer-swoole

cdk deploy --require-approval never test-layer-swoole

# To run the Lambda function in AWS:
aws lambda invoke --function-name test-layer-swoole --cli-binary-format raw-in-base64-out /tmp/response.json
cat /tmp/response.json | jq .

# Use the destroy command only when needed.
# cdk destroy test-layer-swoole
# cdk destroy test-layer-swoole --force
```
