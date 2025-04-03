import { Duration, RemovalPolicy, Stack} from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Chain, DefinitionBody, Parallel, StateMachine, TaskInput } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import { StackProps } from '../props';

export class TestStateMachine extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const name: string = `${props.prefix}state-machine`;

    const sleepLambda = new Function(this, 'Lambda sleep', {
      functionName: name,
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromInline(`
        exports.handler = async (event, context) => {
          const sleepTime = event.SLEEP_TIME || 60; // default to 1 minute
          console.log(\`Sleeping for \${sleepTime} seconds...\`);
          await new Promise(resolve => setTimeout(resolve, sleepTime * 1000));
          console.log('Done sleeping!');
          return { statusCode: 200 };
        };
      `),
      handler: 'index.handler',
      timeout: Duration.minutes(3),
      logGroup: new LogGroup(this, "Log Group", {
        logGroupName: name,
        retention: RetentionDays.ONE_DAY,
        removalPolicy: RemovalPolicy.DESTROY
      }),
    });

    const taskStart = new LambdaInvoke(this, "Execution Started", {
      lambdaFunction: sleepLambda,
      payload: TaskInput.fromObject({'SLEEP_TIME': 1}), // 1 second
    });
    const parallelState = new Parallel(this, 'Parallel Running Tasks').branch(
        new LambdaInvoke(this, "Fast Track", {
          lambdaFunction: sleepLambda,
          payload: TaskInput.fromObject({'SLEEP_TIME': 3}), // 3 seconds
        }),
        new LambdaInvoke(this, "Slow Track", {
          lambdaFunction: sleepLambda,
          payload: TaskInput.fromObject({'SLEEP_TIME': 7}), // 7 seconds
        }),
    );
    const taskEnd = new LambdaInvoke(this, "Execution Finished", {
      lambdaFunction: sleepLambda,
      payload: TaskInput.fromObject({'SLEEP_TIME': 1}), // 1 second
    });

    new StateMachine(this, 'State Machine', {
      stateMachineName: name,
      definitionBody: DefinitionBody.fromChainable(Chain.start(taskStart).next(parallelState).next(taskEnd)),
      timeout: Duration.minutes(5),
    });
  }
}
