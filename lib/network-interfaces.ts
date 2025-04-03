import * as cdk from 'aws-cdk-lib';
import { CfnNetworkInterface, SecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { StackPropsWithVpc } from "./props";

/**
 * This stack is to create a new security group with two new network interfaces attached to it.
 *
 * What we want to verify with this test is that:
 *     * Tags created for the security group and network interfaces (none).
 *     * Visible relationship between the security group and the network interfaces in AWS Console.
 *     * How the network interfaces look like in AWS Console, and if it's safe to remove the network interfaces.
 */
export class NetworkInterfaces extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackPropsWithVpc) {
        super(scope, id, props);

        const securityGroup = new SecurityGroup(this, 'sg', {
            vpc: props.vpc,
            securityGroupName: `${props.prefix}sg`,
            description: 'A newly-created security group for testing purpose.',
        });

        props.vpc.privateSubnets.map((subnet, index) => new CfnNetworkInterface(this, `eni-${index + 1}`, {
            subnetId: subnet.subnetId,
            groupSet: [securityGroup.securityGroupId],
            description: 'A newly-created network interface for testing purpose.',
        }));
    }
}
