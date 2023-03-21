resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.type

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF

  user_data_replace_on_change = true

  vpc_security_group_ids = [aws_security_group.instance_sg.id]

  tags = {
    Name = var.name
  }

}

resource "aws_security_group" "instance_sg" {
  name = "${var.name}-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


}


