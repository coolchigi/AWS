provider "aws" {
  region = "us-east-1"
}


resource "aws_instance" "mywebserver" {
  ami           = "ami-006dcf34c09e50022"
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-did-that"
  }
}
