resource "aws_instance" "webserver" {
  ami                    = var.ami
  instance_type          = var.type
  vpc_security_group_ids = [aws_security_group.instance_sg.id]

  user_data                   = <<-EOF
              #!/bin/bash
             echo "Hello, World" > index.html
             sudo yum -y update
             sudo yum -y install httpd
             sudo service httpd start
            EOF
  user_data_replace_on_change = true


  tags = {
    Name = var.instance_name
  }

}

resource "aws_security_group" "instance_sg" {
  name        = "instance_sg"
  description = "Enable SSH and HTTP access"

  ingress {
    from_port   = var.server_port
    to_port     = var.server_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #Allow incoming TCP requests on port 22 from any IP
  ingress {
    description = "Incoming SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #Allow incoming TCP requests on port 443 from any IP
  ingress {
    description = "Incoming 443"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #Allow all outbound requests
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "instance_sg"
  }

}

output "public_ip" {
  value = aws_instance.webserver.public_ip
}
