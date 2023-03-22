variable "ami" {
  type        = string
  description = "AMI ID for the EC2 instance"
  default     = "ami-02f3f602d23f1659d"

  validation {
    condition     = length(var.ami) > 4 && substr(var.ami, 0, 4) == "ami-"
    error_message = "Please provide a valid value for variable AMI."
  }
}

variable "instance_name" {
  type    = string
  default = "My EC2 instance"
}

variable "type" {
  type        = string
  description = "Instance type for the EC2 instance"
  default     = "t2.micro"
  sensitive   = true
}

variable "server_port" {
  description = "The port the server will use for HTTP requests"
  type        = number
  default     = 80
}



variable "subnet" {
  type        = string
  description = "Subnet ID for network interface"
  default     = "subnet-0988665dba0fa414b"
}
