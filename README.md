<p align="center">
  <h1 align="center"><b> 👨‍💻 Serverless Resume Website </b></h1>
💭 A step-by-step guide for Cloud Enthusiasts
</p>

<blockquote>
   <cite>  <a href="https://github.com/digitalden3/serverless-website-backend" target="_blank">ReadMe Template Inspo</a>
</blockquote>

<details open="open">
  <summary><h2 style="display: inline-block">Project Details</h2></summary>
  <ol>
    <li><a href="#readme-goal">ReadMe Goal</a>
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
    <li><a href="#challenges-closing">Challenges & Closing</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


### ReadMe Goal
---------------------
I actually completed this project last year and wanted to create a journal/blog to share my experience this year. I was looking through the code and I noticed, I didnt have a single documentation that explains what I accomplished(hello developer 101 eyeroll). I had just passed the AWS SAA and decided to give this a shot. I completed it but I couldnt understand a single line of code. So instead of redoing everything, I decided to rework the application into better reproducible code. 

### Modifications
---------------- 
- Working Lambda function. Last year, I took the micro-service approach and created two lambda functions. I've decided to use just one.
- Utilizing the Javascript Fetch API to make requests to my API gateway endpoint.
- Create two CI/CD pipelines with Github Actions for both frontend and backend
- Documentation: This has been a game changer. I failed to document this project after completing it last year. With a more focused mind and approach, I decided to redo with the above changes. 
- Local testing with `sam local start-api` & `sam local invoke {functionName}`
- YAML Template that is reusable and expandable



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
This is the Serverless Resume Website built using the SAM(Serverless Application Model) CLI. Infrastructure is defined in `template.yaml` that SAM uses to create, update resources. SAM pipelines are used for setting up a fully automated continuous integration and delivery (CI/CD) pipeline.  You can update the template to add AWS resources through the same deployment process that updates your application code.

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
serverless-resume-website$ sam logs -n ResumeViewCountFunction --stack-name serverless-resume-web-app --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).


### **Cleanup**

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name serverless-resume-website
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

[SAM Workshop](https://catalog.workshops.aws/complete-aws-sam/en-US) This is truly a gold mine that is often overlooked. The AWS workshops are next level, and I highly recommend them. I followed the workshop and customized my function to display the time based on the user's entered time zone. It truly helped me to better understand the concept 

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)


## DynamoDB
----------------------------
Here's my table definition, you can use:
```yaml
CounterTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: visitorsCountTable
      AttributeDefinitions:
        - AttributeName: "ID"
          AttributeType: "S"
      KeySchema:
        - AttributeName: "ID"
          KeyType: "HASH"
      BillingMode: PAY_PER_REQUEST
```
What does it do?
- Defines CloudFormation stack resource called CounterTable which is a DynamoDB table with the table name visitorsCountTable
- Table has one attribute called ID with data type String (denoted by "S") and it is the partition key for the table (denoted by HASH)
- The BillingMode is set to PAY_PER_REQUEST, which means that the requester pays for the provisioned and consumed read and write activity.

That's right, nothing too fancy. And that's the power of designing infrastructure as code using SAM. I encountered an error with the key schema and after minutes of research (AKA Googling), I was able to figure it out by simply changing one line. The best part was SAM doesn't deploy until the resources are good to go! Thank you, SAM, for saving my sanity

## Lambda Function
----------------------------------
For my project, I decided to follow a monolithic approach by designing a single Lambda function to handle both the retrieval and updating of the counter value. While microservices are often preferred for their modular and independent nature, I chose a monolithic design considering the specific requirements and constraints of my project.

One of the factors influencing this decision was the challenge I encountered when attempting to use separate Lambda functions. I realized that using distinct API Gateway endpoints for each function introduced complexity, and there was a risk of triggering the wrong function due to misconfiguration. To avoid potential complications and streamline the development process, I opted for a single Lambda function.

By implementing a monolithic design, I could ensure that both the retrieval and updating of the counter value were handled within a single codebase. This approach simplified the overall architecture and reduced the risk of inconsistencies or dependencies between separate functions. Additionally, it allowed for easier code maintenance and deployment as changes made to one part of the codebase would not impact the functionality of the other.

While a microservice architecture provides benefits in certain scenarios, such as scalability and independent development, the monolithic approach suited my project's specific needs by offering simplicity, reduced configuration overhead, and easier maintenance



### Get Function
Before deploying your application with SAM, make sure to test it locally. 

To test your individual functions use the command:

```bash
sam local invoke {functionName}
```
To test the API, use the command:
```bash
sam local start-api
```
- When you run the `sam local start-api` command, it identifies any functions defined in your AWS SAM template that have HttpApi or Api event sources and assigns them to specific HTTP paths. This creates a route that you can use to perform HTTP calls using Postman or any other API testing service of your choice.
- `sam local start-api` gives you a HTTP Path, you can perform your GET, POST, PUT or DELETE calls and produces the output
```bash
$ sam local start-api

Mounting HelloWorldFunction at http://127.0.0.1:3000/hello [GET]
Mounting HelloWorldFunction at http://127.0.0.1:3000/ [PUT]
{"statusCode":200,"body":"{\"message\":\"hello world\"}"} //if successful
```
  This output shows that the HelloWorldFunction has been mounted at two HTTP paths: http://127.0.0.1:3000/hello and http://127.0.0.1:3000/ for GET & PUT requests.

- Use a tool like curl of Postman to send requests to the local API Gateway endpoint (http://localhost:3000) and test your API endpoints. For example
  ```js
    curl http://localhost:3000/hello
  ```
  - Example terminal output:
  ```json
  {"message": "Hello, world!"}
  ```
  - As you make requests to the local API Gateway, SAM Local will execute the corresponding Lambda function locally and provide the output in the terminal.

[Check out the docs on start-api](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-start-api.html)

There are a couple of ways to make SAM detect changes in your Lambda function code. One is to delete the .aws-sam folder and run `sam local start-api` again, which will force SAM to hot-load the updated function code. Another way is to build the Lambda function with the updates and then deploy the API locally, which will also make SAM detect the changes.

[Discussion on this issue](https://stackoverflow.com/questions/66713446/how-to-force-aws-sam-cli-to-detect-changes)

To build just the lambda function:

```bash
sam local invoke {functionName}
# Then
sam local start-api
```
```py
def lambda_handler(event, context):
        response = table.get_item(Key={'ID': 'viewCount'})
        if "Item" in response:
                view_count = response['Item']['viewCount']
        print(view_count)
        return {
            "statusCode": 200,
                "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Credentials": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Expose-Headers": "*"
  },
  "body": view_count
}
```
This Python function serves as the handler for our Lambda function. When triggered, the Lambda function retrieves the item with the 'ID' of 'viewCount' from a DynamoDB table. The 'view_count' variable is then assigned the value of the 'count' attribute of the retrieved item. The function then constructs and returns an HTTP response with a status code of 200 and a JSON-encoded body containing the value of 'view_count'. 

The update is performed using the `update_item` function, which uses an UpdateExpression to add a value to an existing attribute in the item. The attribute is specified by the `Key` variable and the value to be added is specified by the `ExpressionAttributeValues` variable.

The function returns an HTTP 200 status code and some headers, including the 'Content-Type' header which specifies that the response is in JSON format. This indicates that the Lambda function is intended to be used as part of a web service that returns JSON data.


## API Gateway
I wish I had taken the time to understand this when I first created the project; it would have been tremendously helpful. Instead, I watched a couple of videos at 1.5x speed (deep sigh) and thought I had understood it. Guess what? I was wrong!

API Gateway carries this project because it acts as a *front door* for HTTP requests to access backend services like your Lambda functions. API Gateway enables the user to trigger those functions via HTTP endpoints. When an HTTP request is made to an API Gateway endpoint, it can pass the request to a Lambda function, which can then process the request and return a response.

Read the importance of CORS > [AWS Lambda CORS](https://docs.aws.amazon.com/lambda/latest/dg/API_Cors.html)


## Javascript
Javascript can be used in the front-end of the Cloud Resume Challenge website to retrieve and display the counter stored in the DynamoDB table. Here are two ways and the drawbacks:

<ol>
<li>
Directly accessing the DynamoDB table: JavaScript can directly access the DynamoDB table by using the AWS SDK for JavaScript. Here's an example code snippet that retrieves the counter value from the 'viewCount' item in the 'visitorsCounter' table:

```js
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

dynamodb.getItem({
  TableName: 'visitorsCounter',
  Key: {
    'ID': {
      S: 'viewCount'
    }
  }
}, function (err, data) {
  if (err) console.log(err);
  else console.log(data.Item.count.N);
});

```
</li>
<li> <i>pick me</i> Using an API Gateway endpoint with a Lambda function:
JavaScript can also retrieve the counter value from the DynamoDB table using an API Gateway endpoint with a Lambda function. Here's an example code snippet that sends a GET request to the API Gateway endpoint:

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://example.com/my-api-gateway-endpoint", true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    console.log(data.count);
  }
};

xhr.send();
```
In this case, the API Gateway endpoint is backed by a Lambda function that retrieves the counter value from the DynamoDB table and returns it as a JSON response to the client.  Provides a layer of abstraction between the client-side JavaScript code and the database
</li>
</ol>

  Drawbacks of the first option:
  - Scalability concerns: If you have a large number of users accessing the DynamoDB table directly from JavaScript, it can put a strain on your database and affect its scalability.

  - Maintainability concerns: As your application grows, it can become difficult to manage the code that directly accesses the database. This can lead to code that is difficult to maintain and update.

## SAM Local Invoke
-------------------------
Run and test your SAM Application locally before pushing your code to your central repo.

To fully understand how SAM works, I will advise following this workshop

https://catalog.workshops.aws/complete-aws-sam/en-US/module-2-local/

### Github Actions
------------------------

### CI/CD for FrontEnd
As I was revamping my index.html, I realized I had to either update my S3 bucket using the cli or to do so via the AWS console. This would have defeated my goal of not doing things manually and completing this project without using the console. 

To create the CI/CD, you need to create a .github/workflows folder. 
- Inside that folder, you would create a yaml file, give it a name you prefer. I am calling mine `frontend-cicd.yaml`
Paste this code
```yaml
name: Upload frontend folder to S3 bucket

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --follow-symlinks --delete
        env:
          DISTRIBUTION: ${{ secrets.DISTRIBUTION_FRONT }}
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: "us-east-1"
          SOURCE_DIR: "front-end"
```
- To use this GitHub Action, you will need to create four different secrets: `DISTRIBUTION_FRONT`, `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY`. To create a secret, go to your repository, navigate to "Settings" > "Secret & Variables" > "Actions" > "Create new secret". Enter in the name and the value. You can get the values by either logging into the AWS console or using the AWS CLI to perform a query.

Here is an example of some useful AWS CLI queries:

`aws cloudfront list-distributions` to list CloudFront distributions
`aws s3 ls` to list buckets in S3

### CI/CD for BackEnd
I am going to create another workflow such that an update is pushed to the backend code, the tests defined in Python gets run. If the tests pass, the SAM application should get packaged and deployed to AWS

We need to test our Lambda function and API Gateway endpoint respectively. To do this, we'd create a new stage called `dev`

Resource: https://www.mrnice.dev/posts/testing-aws-lambda-and-api-gateway/

### Challenges-Closing
----------
Ah, the joys of trial and error. The biggest challenge I faced was trying to figure out how to use SAM, but who needs documentation when you have sheer determination and a sense of adventure, am I right? (Insert eyeroll here). In all seriousness, I learned the hard way that it's always better to take advantage of the great resources provided by AWS, like their comprehensive documentation, instead of reinventing the wheel. Lesson learned!

Starting a project from scratch can be exciting, but it can also be stressful. Want to avoid headaches and save time? Create an architectural diagram. It gives a bird's-eye view of your project, helps you understand the why and how of each service, and ensures everything is interconnected properly. Think of it as a magic wand that solves 60% of your problems. And remember, always embrace the micro-service approach - it's the secret sauce to building great things! Now go forth and architect away 🏗️

### Acknowledgements
------------------
* [Cloud Resume Challenge](https://cloudresumechallenge.dev/)
