import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const path = require('path');

export class AwsCdkTestStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// The code that defines your stack goes here

		// example resource
		// const queue = new sqs.Queue(this, 'AwsCdkTestQueue', {
		//   visibilityTimeout: cdk.Duration.seconds(300)
		// });
		const fn = new lambda.Function(this, 'MyFunction', {
			runtime: lambda.Runtime.NODEJS_12_X,
			handler: 'hello.handler',
			code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
		});
	}
}
