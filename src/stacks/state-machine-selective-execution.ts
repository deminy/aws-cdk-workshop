import { Duration, RemovalPolicy, Stack} from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Choice, Condition, DefinitionBody, StateMachine, Succeed, TaskInput } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import { StackProps } from '../props';

export class TestStateMachineSelectiveExecution extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const name: string = `${props.prefix}state-machine-selective-execution`;

    const lambdaFunction: Function = new Function(this, 'State A Lambda Function', {
      functionName: name,
      runtime: Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: Code.fromInline(`exports.handler = async (event) => { console.log('State ' + event.stateName + ' executed'); };`),
      logGroup: new LogGroup(this, "Log Group", {
        logGroupName: name,
        retention: RetentionDays.ONE_DAY,
        removalPolicy: RemovalPolicy.DESTROY,
      }),
    });

    // Create Choice states
    const stateAChoice: Choice = new Choice(this, 'State A Choice')
        .when(
            Condition.and(
                Condition.isPresent('$.state_a_1'),
                Condition.booleanEquals('$.state_a_1', true)
            ),
            new LambdaInvoke(this, 'Execute State A-1', {
              lambdaFunction: lambdaFunction,
              payload: TaskInput.fromObject({'stateName': 'A-1'}),
              resultPath: '$.result',
            })
        )
        .when(
            Condition.and(
                Condition.isPresent('$.state_a_2'),
                Condition.booleanEquals('$.state_a_2', true)
            ),
            new LambdaInvoke(this, 'Execute State A-2', {
              lambdaFunction: lambdaFunction,
              payload: TaskInput.fromObject({'stateName': 'A-2'}),
              resultPath: '$.result',
            })
        );

    const stateBChoice: Choice = new Choice(this, 'State B Choice')
        .when(
            Condition.and(
                Condition.isPresent('$.state_b'),
                Condition.booleanEquals('$.state_b', true)
            ),
            new LambdaInvoke(this, 'Execute State B', {
              lambdaFunction: lambdaFunction,
              payload: TaskInput.fromObject({'stateName': 'B'}),
              resultPath: '$.result',
            })
        )
        .otherwise(new Succeed(this, 'State B Skipped'));

    // Connect states.
    stateAChoice.afterwards({includeOtherwise: true}).next(stateBChoice);

    new StateMachine(this, 'State Machine', {
      stateMachineName: name,
      definitionBody: DefinitionBody.fromChainable(stateAChoice),
      timeout: Duration.minutes(3),
    });
  }
}
