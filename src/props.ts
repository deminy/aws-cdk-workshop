import * as lib from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';

/**
 * Layer versions by ARNs.
 */
interface LambdaLayers {
  /**
   * A layer version of Bref by ARN.
   *
   * @see https://runtimes.bref.sh/
   */
  bref: string,

  /**
   * A layer version of Swoole by ARN.
   *
   * @see https://github.com/brefphp/extra-php-extensions/blob/master/layers.json
   */
  swoole: string,
}

export interface StackProps extends lib.StackProps {
  /**
   * The prefix of the CloudFormation stack and AWS resources used in this stack.
   */
  prefix: string,

  lambdaLayers: LambdaLayers,
}

export interface StackPropsWithVpc extends StackProps {
  /**
   * The VPC to use for the stack.
   */
  vpc: Vpc,
}
