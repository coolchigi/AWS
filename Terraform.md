About Terraform

- Allows you provision, manage and maintain cloud resources including networking, storage etc all in one centralized set of code.
- Let's you define your infrastructure as code
- Define and make changes to cloud infrastructure
- Also a language that defines infrastructure changes
- Not a config managemet tool
- Can create a server - think of it like a blank canvas
- Terraform code is used to integrate infrastructure resources to the cloud. A repo is needed to manage code versions
- Terraform allows you run your infrastructure as code and its cloud agnostic
- You can use data from one resource to define another
- Terraform figures out the hard part of resource ordering and lets you treate the infrastructure as static code
- Mainly an infrastructure provisioning tool
- Execution Plan    
    - Can cause a serious outage
    - You will see what Terraform will attempt to create and have a chance to decide what will actually happen.
    - Takes the infrastructure as code, compares it with what exists and makes the step-by-step changes
    - Figures out what needs to be done and in what order
    - Used directed acylic graph - a graph is made up of a series of connected dots where each node is a resource
    - Sometimes you'll have to change your code so you dont have 2 interdependent resources, forming a cycle
    https://www.linkedin.com/learning/learning-terraform-15575129/how-terraform-works?autoSkip=true&autoplay=true&resume=false&u=56975201
    - Terraform will attempt and have a chance to decide


- Steps to reproduce
    - Login to te AWS and go to the IAM console > Users > Add Users
    - Create new user > Choose a name > Tick Programmatic access and leave password unchecked.
    - Click on Attach existing policies directly but be sure to delete the user
    - Next you need to setup a terraform account

- Terraform Account
    - Search Terraform in your web browser
    - Click "Try Terraform Cloud" 
    - Enter in your details, after confirming your email, you'll see a page with some options. Click "Start from scratch" >  "Create a new organization"
        - Enter the name you want to use for the organization and an email address as well
        - Connect to VCS, choose the version control of your choice
        - Next, authorize Terraform, choose the repo you want the modules installed in, and click install
        - Choose the default and click "create workspace"
        - Next you need to configure terraform variables 
        - Click "Continue to workplac overview" and click configure variables
        - "Add variable" > "Environment Variable"
        - AWS_ACCESS_KEY_ID : {your access key from the IAM user}
        - AWS_SECRET_KEY : {your secret key from the IAM user}


- Terraform In Action
    - From your workspace, click on "Start a new plan"

- Terraform States
    - TF is aware of the states of our AWS infrastructure
    - Has state file to click that

- Resources
    - The building blocks of TF code
    - Define the what of your infrastruture
    - Different settings for every provider
    - Code example
        ```
        provider "aws"{
            profile = "default"
            region = "us-west-2
        ``` 
        - The above is called provider definition. Gives access to resources and provides a set of possible resources to define. Tells TF where the resources should go
        ```
        resource "aws_s3_bucket"(resource type -  defined by provider) "tf-course"(name TF uses for the resource){
            bucket = "chigo-terraform-2023-19-01"(bucket name)
            acl = "private"
        }
        ```
        tf-course 
    Basic resource types 
        - Egress: what outbound traffic is allowed
        - Elastic IP - aws_eip 
        - Indentation is two spaces rather than a tab 
        - Meta argument - how you want Terraform to intepret ur code. 
            - Explicitly define a dependency relationship btw two resources so TF knows to provision one before the other
            - Block MA should go at the end of a resource definition
            - Blank lines for clarity
            - Single arguments should be in a group
            - Line up the equal sign
            - Data in tf file is the information that is used to configure the resources in the file. The resources are the actual components that are created as a result of running the terraform file.
            - Modules are a TF feature that lets you combine some of your code into a logical group that can be managed together
                - Bundle together a subset of code
                - Pass in arguments, work w custom resources
                - U cant access data in a module unless its an output
                - Complex modules might call out to other modules
                - main.tf, variables.tf, outputs.tf & readme(describing the module)
