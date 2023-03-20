# Single Provider
provider "aws" {
  region     = "us-east-1"    #--North V
  access_key = AWS_ACCESS_KEY #-- your access key
  secret_key = AWS_SECRET_KEY
}


# Multiple Providers using Aliases

provider "aws" {
  alias      = "Virginia"
  region     = "us-east-1"
  access_key = AWS_ACCESS_KEY #-- your access key
  secret_key = AWS_SECRET_KEY
}

provider "aws" {
  alias      = "Ohio"
  region     = "us-east-2"
  access_key = AWS_ACCESS_KEY #-- your access key
  secret_key = AWS_SECRET_KEY

}
