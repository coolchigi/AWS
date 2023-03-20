## 🌟 **Getting Started with Multiple Providers** 🌟
**Welcome**
If you were paying attention, you would notice, the code provided in terraform basics doesn't work. This was done on purpose🤪 - so here's a challenge, make that code work!

Today, we are going to talk about Multiple Providers - In some use scenarios, it's typical to spread cloud deployments across several Amazon AWS Accounts. This might be done to segregate DEV and PROD environments or, for a variety of other reasons, to manage cloud resources differently across different Amazon Accounts or other Cloud Providers. 

Terraform being the god-tier IaC has made provision for this use case as well basically becomes an orchestrator.

Here is a standard provider configuration:
```go

provider "aws" {
    region          = "us-east-1" #--North V
    access_key      = ${AWS_ACCESS_KEY} #-- your access key
    secret_key      = ${AWS_SECRET_KEY}
}
```
We can see that Terraform configurations using AWS resources will now by default be produced or changed in the us-east-1 region (Virginia).

This is fine for a single region configuration, but what if we have resources in N.Virginia and others in Ohio (us-east-2)? We don't want to have to switch between configurations all the time. Fortunately, a solution exists in the form of provider aliases.

## **Provider Aliases**
We can set up multiple instances of the same provider by using aliases within our provider configurations. For example, in the following example, we are setting up two AWS providers, one for us-east-1 with the alias Virginia and one for us-east-2 with the alias Ohio:
```go

provider "aws" {
    alias           = "Virginia"
    region          = "us-east-1"
    access_key      = ${AWS_ACCESS_KEY} #-- your access key
    secret_key      = ${AWS_SECRET_KEY}
}

provider "aws" {
    alias           = "Ohio"
    region          = "us-east-2"
    access_key      = ${AWS_ACCESS_KEY} #-- your access key
    secret_key      = ${AWS_SECRET_KEY}

}   
```

When provisioning resources, we can now specify which of these provider instances to use. In the example below, we'll create a VPC in each region:

```go
resource "aws_vpc" "tinfoilvpc_ohio" {
    provider   = aws.ohio
    cidr_block = "10.1.0.0/16"
}

resource "aws_vpc" "tinfoilvpc_virginia" {
    provider   = aws.virginia
    cidr_block = "10.2.0.0/16"
}
```