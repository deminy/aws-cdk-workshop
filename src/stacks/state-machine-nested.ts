import { Stack} from 'aws-cdk-lib';
import { Chain, DefinitionBody, IntegrationPattern, Pass, StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { StepFunctionsStartExecution } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import { StackProps } from '../props';

export class TestStateMachineNested extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const childStateMachine = new StateMachine(this, 'State Machine (child)', {
      stateMachineName: `${props.prefix}state-machine-nested-child`,
      definitionBody: DefinitionBody.fromChainable(new Pass(this, 'State Child')),
    });
    const stateChildStateMachine = new StepFunctionsStartExecution(this, 'State: State Machine (nested)', {
      stateMachine: childStateMachine,
      resultPath: '$.result',
      integrationPattern: IntegrationPattern.RUN_JOB,
    });

    const chain: Chain = Chain.start(new Pass(this, 'State Start'))
        .next(stateChildStateMachine)
        .next(new Pass(this, 'State End'));

    new StateMachine(this, 'State Machine (parent)', {
      stateMachineName: `${props.prefix}state-machine-nested-parent`,
      definitionBody: DefinitionBody.fromChainable(chain),
    });
  }
}
