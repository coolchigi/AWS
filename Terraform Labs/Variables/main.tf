resource "aws_instance" "webserver" {
  ami                    = var.ami
  instance_type          = var.type
  vpc_security_group_ids = [aws_security_group.instance_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p ${var.server_port} &
              EOF

  user_data_replace_on_change = true


  tags = {
    Name = var.instance_name
  }

}

resource "aws_security_group" "instance_sg" {
  name        = "MyEC2instance"
  description = "Enable SSH and HTTP access"
  ingress {
    from_port   = var.server_port
    to_port     = var.server_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

output "public_ip" {
  value = aws_instance.webserver.public_ip
}
