## 🌟 **Getting Started with Terraform Syntax** 🌟
**Welcome** to the world of Terraform! In this guide, we'll dive into the basics of Terraform's primary user interface & terraform workflow: Hashicorp Configuration Language (HCL), or Configuration Language (CL) for short. 🚀

HCL is the key to defining infrastructure resources and the foundation of your Terraform code. 😎

In this guide, we'll cover all the essentials of HCL, including data types, resource blocks, variables, and more. We'll also provide examples and tips to help you master the art of writing efficient and effective Terraform code. 💻



Whether you're new to Terraform or a seasoned pro, this guide is a great resource to help you get up and running with Terraform Syntax. Let's get started! 🤘

 ## 😀 **How Terraform Works**
Terraform works by defining the desired state of your infrastructure resources in configuration files, which are written in HashiCorp Configuration Language (HCL) or JSON format. These configuration files are then used to create and manage the resources on the cloud provider's platform.

Terraform uses a declarative syntax, which means that you define the desired end state of your infrastructure, and Terraform takes care of the details of how to get there. Terraform also supports modularization, allowing you to reuse common patterns and configurations across your infrastructure.

## **Language Syntax**
Terraform code is a declarative language so you need to *describe* the infrastructure you want and Terraform does the rest. The language has two basic concepts: Blocks & Arguments. 

A block has a container for content. In the context of a cloud architecture, there can be blocks for things like infrastructure resources, variable inputs, and resource outputs. They are the fundamental building block of the Configuration Language.

Here’s what a block looks like:
```js
resource "aws_instance" "web_server" {
  // block content
}
```

Arguments on the other hand assign values to names. They are like settings of blocks. In the context of a resource like an EC2 instance, the argument would set things like the instance type, the AMI ID, etc.

Here’s what arguments look like. Note that they are defined within the block.

```go
resource "aws_instance" "web_server" {
  ami           = "ami-0cf6f5c8a62fa5da6"
  instance_type = "t2.micro"
}
```

## **Resources**
Terraform uses resources to represent infrastructure components. These resources are defined by their type, which is specified using the resource block in your configuration file. Each `resource` has its own set of attributes that can be configured, such as the region it is deployed in or the instance type.

- Here's an example of creating an AWS EC2 Instance
    ```go
   resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "example-instance"
  }}
    ```

Resources would generally look like this:

```go
resource "<PROVIDER>_<TYPE>" "<NAME>" {
 [CONFIG …]
}
```

## **Providers**
Terraform providers are plugins that Terraform uses to interact with various infrastructure and service providers. Providers are responsible for translating the Terraform configuration files into API calls to the underlying services. Terraform has providers for a wide range of services, including AWS, Google Cloud Platform, Microsoft Azure, and many more.

Here is an example configuration block that declares a provider for AWS:

```go
provider "aws" {
  region = "us-west-2"
}
```

This block tells Terraform to use the AWS provider and specifies that resources should be created in the us-west-2 region. Each provider has its own configuration options, which are documented in the provider's documentation.


## **Variables**
Variables in Terraform allow you to parameterize your code, making it more flexible and reusable. You can define variables using the variable block, and reference them throughout your code using the `${var.variable_name}` syntax. You can also set default values for your variables, making them optional.
```go
variable "instance_type" {
  type    = string
  default = "t2.micro"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = var.instance_type
  # other configuration options
}

```

## **Modules**
A module is a set of Terraform configurations that can be used as a reusable component across your infrastructure. Modules can be shared across different projects and teams.

In this example, a variable called `instance_type` is defined as a string with a default value of `t2.micro`. The variable is then used in a resource block to set the instance_type attribute for an Amazon Web Services (AWS) instance.

## **Hands On**
***We are going to be deploying a single server with Terraform!***
### **Step 1: Install Terraform**

- First things first, if you haven't already, you need to install Terraform
Manual Installation:
- Download the appropriate Terraform package for your operating system from the Terraform website.
- Extract the downloaded package to a directory of your choice.
- Add the Terraform binary to your system's PATH environment variable.
- Verify the installation by running the terraform command in your terminal or command prompt.
Alternatively, if you're using a package manager like Homebrew on macOS or Chocolatey on Windows, you can simply run the appropriate command to install Terraform:

- For Homebrew: `brew install terraform`
- For Chocolatey: `choco install terraform`
Once installed, you can verify the installation by running the `terraform` command in your terminal or command prompt.

### **Step 2: Set env variables Terraform would use to communicate and make changes in your AWS account**
To grant Terraform access, we need to set our access keys & secret keys. AWS access keys and secret keys are used to authenticate and authorize AWS services and resources. The access key is a public identifier used to grant access, while the secret key is a private key used to sign requests. These keys are required to interact with AWS APIs and services using command-line tools, SDKs, and other AWS management interfaces. 

Set Instructions for Windows || Unix/Linux/macOS
For Windows:

Open Command Prompt
Type `set AWS_ACCESS_KEY_ID=(your access key id)`
Type `set AWS_SECRET_ACCESS_KEY=(your secret access key)`
For Unix/Linux/macOS:

Open Terminal
Type `export AWS_ACCESS_KEY_ID=(your access key id)`
Type `export AWS_SECRET_ACCESS_KEY=(your secret access key)`


### **Step 3: Configure your provider & resource**
Create an empty folder, choose any name, put a file named `main.tf` in your folder
- Install HashiCorp config extension for syntax highlighting > Search Terraform in the extensions marketplace and click Install
- Add the following to your main.tf
```go
provider "aws" {
  region = "us-east-1"
}
```
The `aws` keyword is indicating that this is an AWS provider block. "region" is a required parameter in the block that specifies the region where resources will be created.
- Next, we are going to deploy our virtual server also known as an EC2 instance. EC2 instance is a resource so we need to add a resource block
```go
resource "aws_instance" "mywebserver" {
  ami           = "ami-006dcf34c09e50022"
  instance_type = "t2.micro"
}
```
  - This code is defining an AWS EC2 instance resource named `"mywebserver"`. It specifies the Amazon Machine Image (AMI) to be used for the instance, which is identified by its unique ID `"ami-006dcf34c09e50022"`. It also specifies the instance type to be "t2.micro", which is a small, low-cost instance type suitable for simple applications or development environments.

- Next `terraform init` in your terminal ![Success](/images/Success.png)
  Terraform init initializes a new or existing Terraform working directory by downloading and installing the necessary plugins and modules for a given configuration.
  Usually, this command is run only at the beginning of a Terraform project – as far as we stick with the same provider

- Next `terraform plan`
  Terraform plan examines the current state of your infrastructure, compares it to the desired state declared in your Terraform configuration files, and then shows you a preview of the changes that Terraform will make to reach the desired state.

- Next type in `terraform apply`
  Terraform apply is a command that is used to apply the changes described in your Terraform configuration files. It creates, modifies, or deletes the resources in your cloud infrastructure according to the changes you have defined in the Terraform configuration.
  ![Console](/images/aws%20tf.png)
  The instance name could be added by including the tags resource in your Terraform script > then run `terraform apply` again
  Here is the updated resource block:
```go
  resource "aws_instance" "mywebserver" {
  ami           = "ami-006dcf34c09e50022"
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-did-that"
  }
}
```
Here's the terminal output:
![Terminal Output](/images/terminal.png)

- Our next step is do deploy a single web server on this instance
  - We are going to run a simple web server that always returns "Terraform is the future" because it literally is
  - To do this, we are going to add a user_data block to our terraform file
  EC2 user data is the script or data passed to an instance when launched to automate tasks, install software or configure instance settings. It's accessible in plain text from within the instance and can specify a script to be executed at launch.
```go
user_data = <<-EOF
              #!/bin/bash
              echo "Terraform is the future" > index.html
              nohup busybox httpd -f -p 3000 &
              EOF
  user_data_replace_on_change = true
  ```
  The `user_data` parameter specifies the script or data that is passed to the instance when it is launched. In this case, the script is a bash script that writes "Terraform is the future" to an index.html file and starts a busybox httpd server on port `3000`. The nohup command is used to ensure that the server continues running even if the SSH session is closed.

  The `user_data_replace_on_change` parameter specifies that the user data should be replaced if the instance is replaced or modified. This ensures that any changes to the user data are reflected in the new instance.

  AWS does not allow any incoming or outgoing traffic from an EC2 instance. Both inbound & outbound traffic is blocked by default so you need to define a security group. a security group acts as a virtual firewall for your EC2 instances to control inbound and outbound traffic.
```go
ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
```
This code is defining a security group ingress rule  for a specific port (in this case, port 3000) to allow inbound traffic over TCP protocol. The cidr_blocks attribute specifies the IP range of incoming traffic that will be allowed. In this case, "0.0.0.0/0" means that traffic from any IP address will be allowed.
```go
resource "aws_security_group" "defaultsg" {
  name = "terraform-security-group"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```
- Now that we've created a security group, we need to tell the EC2 instance resource to make use of this. 
Add the following to your main.tf
```go
vpc_security_group_ids = [aws_security_group.instance.id]
```
This is called a `reference` and it's amongst the many types of expressions in Terraform
[Terraform Expressions](https://developer.hashicorp.com/terraform/language/expressions/references)






## Closing Note
Congratulations! You’ve learned the basics of Terraform with AWS!
To fully leverage the benefits of defining your infrastructure as code with Terraform, it is essential to have a clear understanding of your infrastructure's intended structure and required functionality. While Terraform does provide a way to define your infrastructure as code, this understanding is necessary to maximize its potential.
