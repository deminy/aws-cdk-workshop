import { Stack } from 'aws-cdk-lib';
import { CompositePrincipal, Effect, ManagedPolicy, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { StackProps } from "../props";

export class TestRoles extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const roleA = new Role(this, 'Role A', {
            roleName: `${props.prefix}role-a`,
            description: 'A simplest role without any policies applied to.',
            assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
        });

        const roleB = new Role(this, 'Role B', {
            roleName: `${props.prefix}role-b`,
            description: 'A second role with a managed policy attached.',
            assumedBy: new ServicePrincipal('lambda.amazonaws.com')
        });
        roleB.addManagedPolicy(new ManagedPolicy(this, "Managed Policy", {
            roles: [roleA],
            statements: [
                // To describe EC2 instances.
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ["ec2:DescribeInstances"],
                    resources: ['*'],
                }),
            ],
        }));

        const roleC = new Role(this, 'Role C', {
            roleName: `${props.prefix}role-c`,
            description: 'A third role with inline policies attached.',
            assumedBy: new CompositePrincipal(
                new ServicePrincipal('ecs-tasks.amazonaws.com'),
                new ServicePrincipal('lambda.amazonaws.com')
            ),
        });
        roleC.attachInlinePolicy(
            new Policy(this, 'Attached Policy', {
                statements: [
                    new PolicyStatement({
                        effect: Effect.ALLOW,
                        actions: ["sts:AssumeRole"],
                        resources: [roleB.roleArn],
                    }),

                    // To get list of active instances in Amazon Elastic Load Balancer (ELB).
                    new PolicyStatement({
                        effect: Effect.ALLOW,
                        actions: ["elasticloadbalancing:DescribeTargetHealth"],
                        resources: ['*'],
                    }),
                ]
            })
        );
    }
}
