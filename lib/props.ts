import { StackProps } from 'aws-cdk-lib';
import { IVpc } from 'aws-cdk-lib/aws-ec2';

export interface EksStackProps extends StackProps {
  vpc: IVpc,
}
