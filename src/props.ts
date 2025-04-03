import * as lib from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';

export interface StackProps extends lib.StackProps {
  prefix: string,
}

export interface StackPropsWithVpc extends StackProps {
  vpc: Vpc,
}
