resource "aws_instance" "myvm" {
  ami           = var.ami
  instance_type = var.type
  tags          = var.tags

  network_interface {
    network_interface_id = var.nic
    device_index         = 0
  }
}

resource "aws_network_interface" "my_nic" {
  description = "My NIC"
  subnet_id   = var.subnet

  tags = {
    Name = "My NIC"
  }
}
