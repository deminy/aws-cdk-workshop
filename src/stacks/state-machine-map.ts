import { Duration, Stack} from 'aws-cdk-lib';
import { DefinitionBody, JsonPath, Map, Pass, Result, StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { StackProps } from '../props';

export class TestStateMachineMap extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const iterator = new Pass(this, 'Iterator', {
      result: Result.fromArray([{}, {}]),
      resultPath: '$.result',
    });
    const map = new Map(this, 'Map', {
      maxConcurrency: 1,
      inputPath: '$',
      itemsPath: JsonPath.stringAt('$.result'),
      resultPath: '$.result',
    });
    map.itemProcessor(new Pass(this, 'Pass'));

    new StateMachine(this, 'State Machine', {
      stateMachineName: `${props.prefix}state-machine-map`,
      definitionBody: DefinitionBody.fromChainable(iterator.next(map).next(new Pass(this, 'Final', {resultPath: '$.result'}))),
      timeout: Duration.minutes(5),
    });
  }
}
