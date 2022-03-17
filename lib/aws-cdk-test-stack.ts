import * as cdk from '@aws-cdk/core';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import { TodoBackend } from './todo-backend';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const path = require('path');

export class AwsCdkTestStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const todoBackend = new TodoBackend(this, "TodoBackend");

		// The code that defines your stack goes here

		// example resource
		// const queue = new sqs.Queue(this, 'AwsCdkTestQueue', {
		//   visibilityTimeout: cdk.Duration.seconds(300)
		// });
		new apiGateway.LambdaRestApi(this, "MyEndpoint", {
			handler: todoBackend.handler
		})

		const logoBucket = new s3.Bucket(this, "LogoBucket", {
			publicReadAccess: true
		});

		new s3Deployment.BucketDeployment(this, "DeployLogo", {
			destinationBucket: logoBucket,
			sources: [s3Deployment.Source.asset('./assets')]
		})
	}
}
