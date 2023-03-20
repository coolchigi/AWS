## 🌟 **Getting Started with Variables** 🌟
**Welcome** "Don't repeat yourself" is a principle in software engineering. Andy Hunt and Dave Thomas coined the phrase "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system" in their book The Pragmatic Programmer.

We have used several variables so far, sometimes it's hard to keep up. These values are hard coded and generally bad practice for the following reasons
- Limits reusability
- You may forget to update the variables as you build larger infrastructure
- Limits readbility

Such as any general purpose programming language, Terraform allows you to define your input variables. Unlike other programming languages, you need to create it in a seperate configuration file

## **Variable.tf file**
The "variable" keyword is used to create a variable in terraform, followed by the name of the variable. Use an appropriate name!

```go
    variable "instance_name" {
  default = "webserver"
}
```

Now, how do we use this in our main.tf?
There are a couple of ways to do this, we'll look at a few

If you have the following arrangement

```go
variable "instance {
 ami  = "ami-0d26eb3972b7f8c96"
 type = "t2.micro"
 tags = {
   Name = "My Virtual Machine"
   Env  = "Dev"
 }
 subnet = "subnet-76a8163a"
 nic    = aws_network_interface.my_nic.id
}
```
You'll reference it like: 

```go
resource "aws_instance" "myvm" {
  ami           = var.instance.ami
  instance_type = var.instance.type
  tags          = var.instance.type

  network_interface {
    network_interface_id = var.nic
    device_index         = 0
  }
}
```

Ideally, it's best to define each variable seperately, something like this:

```go
variable "type" {
  type        = string
  description = "Instance type for the EC2 instance"
  default     = "t2.micro"
  sensitive   = true
}

variable "subnet" {
  type        = string
  description = "Subnet ID for network interface"
  default     = "subnet-76a8163a"
}
```

This way, you can reference like

```go
resource "aws_instance" "myvm" {
  ami           = var.ami
  instance_type = var.type
  tags          = var.tags

  network_interface {
    network_interface_id = var.nic
    device_index         = 0
  }
}

```

Variables, like the one above, use a couple of different types: strings, lists, maps, and boolean. Here are some examples of how each type are defined and used.

## **String**
Strings are commonly used to simplify and make complicated values more user-friendly by marking a single value per structure. An example of a string variable definition is shown below.

```go
variable "terraformrocks" {
  type = string
  default = "we all knew that"
}
```
Here the name of the variable is "terraformrocks" with a default value of "we all knew that"

---------------------------------------------
## **Lists**
Terraform variables can also be written as lists. They work much like numbered catalogues of values where each value is called by the index that corresponds to the position in the list. An example of a list variable definition is shown below.

```go
variable "users" {
  type    = list
  default = ["root", "dev", "prod"]
}
```
-----------------------------------------------------------------------------------


## **Map**
Maps are made up of strings with keys and values. These can be useful for selecting values based on predefined parameters like server configuration by monthly price.

```go
variable "plans" {
  type = map
  default = {
    "5CAD"  = "1xCPU-1GB"
    "10CAD" = "1xCPU-2GB"
    "20CAD" = "2xCPU-4GB"
  }
}
```
You can access the right value by using the matching key. For example, the variable below would set the plan to "1xCPU-1GB".

plan = var.plans["20CAD"]

------------------------------------------------------------------------------------
## **Boolean**
The final variable type available we are going to be looking at is boolean. They provide the option of using simple true or false values. On a new deployment, for example, you might want to have a variable that determines when to generate the root user password. The following sets the delete_on_termination attribute of an ebs volume to false

```go
variable "delete_on_termination" {
    type = bool
    default = false
}
```
