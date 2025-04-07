import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { join } from "path";
import { Construct } from 'constructs';
import { StackProps } from '../props';

export class TestLayerSwoole extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const name: string = `${props.prefix}layer-swoole`;

    new Function(this, 'Lambda function', {
      functionName: name,
      description: 'Test the Swoole layer of Bref.',

      handler: 'index.php',
      code: Code.fromAsset(join(__dirname, '../lambdas/layer-swoole')),
      environment: {
        BREF_PHP_RUNNER: "\\Bref\\Runner\\Swoole",
      },

      runtime: Runtime.PROVIDED_AL2,
      layers: [
        LayerVersion.fromLayerVersionArn(this, `lambda-layer-bref`, props.lambdaLayers.bref),
        LayerVersion.fromLayerVersionArn(this, `lambda-layer-swoole`, props.lambdaLayers.swoole),
      ],

      timeout: Duration.seconds(120), // 2 minutes.
      retryAttempts: 0,

      logGroup: new LogGroup(this, "Log Group", {
        logGroupName: name,
        retention: RetentionDays.ONE_DAY,
        removalPolicy: RemovalPolicy.DESTROY,
      }),
    });
  }
}
