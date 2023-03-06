provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "defaultsg" {
  name = "terraform-security-group"

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "mywebserver" {
  ami                         = "ami-006dcf34c09e50022"
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.defaultsg.id]
  user_data                   = <<-EOF
              #!/bin/bash
              echo "Terraform is the future" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF
  user_data_replace_on_change = true


  tags = {
    Name = "terraform-did-that"
  }
}
