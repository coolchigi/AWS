## 🌟 **Getting Started with Terraform Syntax** 🌟
**Welcome** to the world of Terraform! In this guide, we'll dive into the basics of Terraform's primary user interface: Hashicorp Configuration Language (HCL), or Configuration Language (CL) for short. 🚀

HCL is the key to defining infrastructure resources and the foundation of your Terraform code. 😎

In this guide, we'll cover all the essentials of HCL, including data types, resource blocks, variables, and more. We'll also provide examples and tips to help you master the art of writing efficient and effective Terraform code. 💻

Whether you're new to Terraform or a seasoned pro, this guide is a great resource to help you get up and running with Terraform Syntax. Let's get started! 🤘

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


### **Step 3: Configure your provider**
Create an empty folder, choose any name, put a file named `main.tf` in your folder
- Install HashiCorp config extension for syntax highlighting > Search Terraform in the extensions marketplace and click Install
- Add the following to your main.tf
```go
provider "aws" {
  region = "us-east-1"
}
```
The `"aws"` keyword is indicating that this is an AWS provider block. "region" is a required parameter in the block that specifies the region where resources will be created.
- 



## Closing Note
To fully leverage the benefits of defining your infrastructure as code with Terraform, it is essential to have a clear understanding of your infrastructure's intended structure and required functionality. While Terraform does provide a way to define your infrastructure as code, this understanding is necessary to maximize its potential.