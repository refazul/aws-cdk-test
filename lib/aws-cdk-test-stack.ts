import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Notifications from '@aws-cdk/aws-s3-notifications';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
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
		
		new apiGateway.LambdaRestApi(this, "MyEndpoint", {
			handler: fn
		})

		const logoBucket = new s3.Bucket(this, "LogoBucket", {
			publicReadAccess: true
		});

		logoBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3Notifications.LambdaDestination(fn));

		new s3Deployment.BucketDeployment(this, "DeployLogo", {
			destinationBucket: logoBucket,
			sources: [s3Deployment.Source.asset('./assets')]
		})
	}
}
