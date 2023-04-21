
<p align="center">
  <h1 align="center"><b> 👨‍💻 Serverless Resume Website </b></h1>
💭 I suck at making these things so here goes!
</p>

<br>

<blockquote>
   <cite>  <a href="https://github.com/digitalden3/serverless-website-backend" target="_blank">ReadMe Template Inspo</a>
  
</blockquote>

<br>

<details open="open">
  <summary><h2 style="display: inline-block">Project Details</h2></summary>
  <ol>
    <li><a href="#tech-stack">Tech Stack</a>
    </li>
    <li><a href="#project-description">Project Description</a></li>
    <li><a href="#sam-cli">SAM CLI</a></li>    
    <li><a href="#dynamodb">DynamoDB</a></li>
    <li><a href="#lambda-function">Lambda Function</a></li>
    <li><a href="#api-gateway">API Gateway</a></li>
    <li><a href="#javascript">JavaScript</a></li>
    <li><a href="#sam-local-invoke">SAM Local Invoke</a></li>
    <li><a href="#github-actions">Github Actions</a></li>
    <li><a href="#unit-testing">Unit Testing</a></li>
    <li><a href="#integration-testing">Integration Testing</a></li>
    <li><a href="#project-files">Project Files</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



### Tech Stack
------------------
- AWS SAM
- DynamoDB
- AWS Lambda
- API Gateway
- JavaScript
- GitHub Actions (CI/CD) using SAM Pipelines(need to figure out the cost of this because SAM creates additional resources for the pipelines)


### Project Description
-----------------
This is the Serverless Resume Website built using the SAM(Serverless Application Model) CLIInfrastructure is defined in `template.yaml` that SAM uses to create, update resources. SAM pipelines are used for setting up a fully automated continuous integration and delivery (CI/CD) pipeline.  You can update the template to add AWS resources through the same deployment process that updates your application code.

Aim to showcases the use of serverless architecture to create a web application for hosting a personal resume. It utilizes AWS Lambda, Amazon S3, AWS CloudFront, AWS DNS, API Gateway, and DynamoDB to create a scalable and cost-effective solution that is easy to deploy and maintain.

At the heart of the architecture is a DynamoDB table that stores visitor count information. A Lambda function written in Python3 is used to interact with the DynamoDB table and retrieve the visitor count. The function is exposed via a REST API created with Amazon API Gateway. Whenever the REST API endpoint is called, it triggers the Lambda function and returns a response back to the user.

The frontend of the website is served by Amazon S3, which is configured to host the website static files. When a user loads the website, a short JavaScript script sends a request to the API Gateway endpoint to retrieve the visitor count data. The response is then displayed in the footer of the webpage. The Lambda function also handles incrementation of the visitor count as each interaction with the website occurs.



## SAM CLI

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 16](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam init
sam build
sam deploy --guided
```

The first command initializes a new application project. The second command will build the source of your application. The third command will package and deploy your application to AWS, with a series of prompts. Follow the prompts


### **Use the SAM CLI to build and test locally**

Build your application with the `sam build` command.

```bash
serverless-resume-website$ sam build
```

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
serverless-resume-website$ sam local invoke {functionName} --event events/event.json
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /counter
            Method: get
```

### **Add a resource to your application**
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

### **Fetch, tail, and filter Lambda function logs**

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
serverless-resume-website$ sam logs -n HelloWorldFunction --stack-name serverless-resume-website --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).


### **Cleanup**

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name serverless-resume-website
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
