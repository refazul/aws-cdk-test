import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

const path = require('path');

export class TodoBackend extends cdk.Construct {
    public readonly handler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id);

        const todosTable = new dynamodb.Table(this, "TodoDatabase", {
            partitionKey: {
                name: "id",
                type: dynamodb.AttributeType.STRING
            }
        })

        this.handler = new lambda.Function(this, "TodoHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
			handler: 'todoHandler.handler',
			code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
            environment: {
                TABLE_NAME: todosTable.tableName
            }
        })

        todosTable.grantReadWriteData(this.handler);
    }
}