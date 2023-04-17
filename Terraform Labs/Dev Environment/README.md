## **Building a Dev Environment with Terraform**

Welcome to this guide on how to build a dev environment using Terraform. In this tutorial, we will show you how to create a virtual private cloud (VPC), subnet, internet gateway, security group, EC2 instance, and more using Terraform.

---------------------

## **Architecture**
Before we begin, let's take a look at the architecture we'll be building:

- VPC: A virtual private cloud (VPC) that isolates your resources from the public internet
- Subnet: A private subnet that will host our EC2 instance
- Internet Gateway & Route Table: Allows communication between our VPC and the internet
- Security Group: A set of firewall rules that control incoming and outgoing traffic to our EC2 instance
- AMI Datasource: A data source that fetches the Amazon Machine Image (AMI) that we'll use to launch our EC2 instance
Key Pair: A pair of keys that will allow us to securely connect to our EC2 instance
- EC2 Instance: A virtual machine that we'll launch in our private subnet
- Userdata and the File Function: We'll use Userdata and the File Function to automatically install and configure software on our EC2 instance
- SSH Config Scripts: Scripts that will help us configure our SSH connection to our EC2 instance

## **Getting Started**
To get started, you'll need to install Terraform on your local machine. Once you've done that, you can clone this repository and navigate to the `terraform` directory


```bash
git clone https://github.com/your/repo.git
cd AWS/terraform-getting-started
```

Next, you'll need to configure your AWS credentials. You can do this by setting the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables, or by creating a ~/.aws/credentials file.


## **Usage**

```csharp
terraform init
terraform apply
```


