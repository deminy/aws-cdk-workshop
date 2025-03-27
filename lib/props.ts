import { StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-eks';

export interface CustomizedProps {
  vpc: Vpc,
  prefix: string,
}

export interface EksStackProps extends CustomizedProps, StackProps {
}

export interface DebugStackProps extends EksStackProps {
  cluster: Cluster
}
