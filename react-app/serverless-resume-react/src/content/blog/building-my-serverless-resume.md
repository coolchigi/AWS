---
title: "Building a Serverless Resume on AWS"
date: "2026-01-10"
description: "How I built and deployed this personal site using AWS Lambda, DynamoDB, API Gateway, and a React frontend — with automated CI/CD via GitHub Actions."
tags: ["AWS", "Serverless", "React", "DynamoDB", "GitHub Actions"]
---

## Overview

This site you're reading right now is fully serverless. The frontend is a React + Vite app deployed to S3 and served through CloudFront. The visitor counter hits an API Gateway endpoint backed by a Lambda function that reads and writes to DynamoDB.

Here's the architecture:

```
Browser → CloudFront → S3 (static assets)
Browser → API Gateway → Lambda → DynamoDB
```

## The Frontend

The React app is built with Vite and styled with Tailwind CSS v4. Deployment is fully automated — every push to `main` triggers a GitHub Actions workflow that:

1. Builds the Vite app (`npm run build`)
2. Syncs the `dist/` folder to S3 (`aws s3 sync`)
3. Invalidates the CloudFront cache

No manual deploys, ever.

## The Visitor Counter

The counter is the most interesting bit. Here's the Lambda function (Python):

```python
import boto3
import json

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("visitor-count")

def handler(event, context):
    response = table.update_item(
        Key={"id": "visitors"},
        UpdateExpression="ADD #count :inc",
        ExpressionAttributeNames={"#count": "count"},
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )
    count = int(response["Attributes"]["count"])
    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"count": count}),
    }
```

The `ADD` expression is atomic — no race conditions even if two visitors hit it simultaneously.

## What I Learned

- **CloudFront SPA routing**: You need a custom error response (404 → `/index.html` with a 200 status) or client-side routes return 403 from S3.
- **IAM least privilege**: The Lambda execution role only has `dynamodb:UpdateItem` and `dynamodb:GetItem` on that specific table ARN. Nothing else.
- **Cost**: Essentially $0/month. S3 storage, CloudFront free tier, Lambda free tier, and DynamoDB on-demand pricing all keep this well under a dollar.

## Next Steps

Adding a markdown blog (the one you're reading this on). Posts live as `.md` files in the repo, parsed at build time — no CMS, no database, no new infrastructure.
