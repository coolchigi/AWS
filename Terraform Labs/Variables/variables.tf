variable "ami" {
  type        = string
  description = "AMI ID for the EC2 instance"
  default     = "ami-0d26eb3972b7f8c96"

  validation {
    condition     = length(var.ami) > 4 && substr(var.ami, 0, 4) == "ami-"
    error_message = "Please provide a valid value for variable AMI."
  }
}

variable "type" {
  type        = string
  description = "Instance type for the EC2 instance"
  default     = "t2.micro"
  sensitive   = true
}

variable "tags" {
  type = object({
    name = string
    env  = string
  })
  description = "Tags for the EC2 instance"
  default = {
    name = "My Virtual Machine"
    env  = "Dev"
  }
}

variable "subnet" {
  type        = string
  description = "Subnet ID for network interface"
  default     = "subnet-76a8163a"
}
