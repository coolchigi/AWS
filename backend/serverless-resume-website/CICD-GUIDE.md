# Backend CI/CD Setup Guide

## Overview
This guide explains the automated deployment pipeline for your Lambda function.

---

## How It Works

### The Pipeline Flow
```
1. You push code to main branch
   ↓
2. GitHub detects changes in backend/**
   ↓
3. Workflow starts automatically
   ↓
4. Runs tests (validates code works)
   ↓
5. Builds Lambda package (with dependencies)
   ↓
6. Deploys to AWS (updates your Lambda)
   ↓
7. Verifies deployment (health check)
   ↓
8. Done! Your changes are live
```

---

## Step-by-Step Breakdown

### Step 1: Trigger Conditions
```yaml
on:
  push:
    branches:
      - main
    paths:
      - 'backend/serverless-resume-website/**'
```

**Why this matters:**
- Only runs when backend code changes (saves GitHub Actions minutes)
- Doesn't run for frontend changes (you have a separate workflow for that)
- `workflow_dispatch` allows manual trigger if needed

**Example:** If you only change `Projects.tsx`, this workflow won't run.

---

### Step 2: Checkout Code
```yaml
- uses: actions/checkout@v3
```

**Why:**
- GitHub Actions runs on a fresh Ubuntu VM each time
- It doesn't have your code by default
- This step clones your repository into the VM

**What happens:** GitHub literally does `git clone` of your repo

---

### Step 3: Set Up Python
```yaml
- uses: actions/setup-python@v4
  with:
    python-version: '3.9'
```

**Why:**
- Your Lambda uses Python 3.9 runtime
- Need same version locally to ensure compatibility
- Different Python versions can have breaking changes

**Critical:** This MUST match your Lambda runtime in template.yaml

---

### Step 4: Install SAM CLI
```yaml
- run: pip install aws-sam-cli
```

**Why:**
- SAM CLI is the tool that builds and deploys serverless apps
- It's not pre-installed on GitHub Actions runners
- Alternative: Could use a Docker image with SAM pre-installed

**What it does:**
- `sam build` - packages your code
- `sam deploy` - pushes to AWS

---

### Step 5: AWS Credentials
```yaml
- uses: aws-actions/configure-aws-credentials@v2
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

**Why:**
- GitHub needs permission to deploy to YOUR AWS account
- Uses IAM credentials with limited permissions (security best practice)

**Security:**
- Credentials stored as GitHub Secrets (encrypted)
- Never visible in logs
- Can be rotated without changing code

**You'll need to create these secrets** (explained below)

---

### Step 6: Validate Template
```yaml
- run: sam validate --lint
```

**Why:**
- Catches YAML syntax errors
- Validates CloudFormation/SAM template structure
- Fails fast before wasting time on deployment

**Example errors it catches:**
- Invalid indentation
- Missing required properties
- Invalid resource types

---

### Step 7: Run Tests
```yaml
- run: python -m pytest tests/unit/ -v
  continue-on-error: false
```

**Why:**
- Don't deploy broken code to production
- Catches bugs before users see them
- `continue-on-error: false` = stop if tests fail

**Currently:** Your tests are minimal, but you can add more

---

### Step 8: Build
```yaml
- run: sam build --use-container
```

**Why:**
- Packages your Python code
- Installs dependencies (boto3, etc.)
- Creates deployment artifacts in `.aws-sam/` folder

**`--use-container` flag:**
- Builds inside a Docker container
- Ensures same environment as Lambda (Amazon Linux)
- Catches platform-specific bugs (e.g., compiled dependencies)

**What gets created:**
```
.aws-sam/
  build/
    ResumePutCountFunction/
      app.py
      (all dependencies)
```

---

### Step 9: Deploy
```yaml
- run: sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
```

**Why:**
- Uploads built artifacts to S3
- Updates CloudFormation stack
- Updates Lambda function code

**Flags explained:**
- `--no-confirm-changeset`: Auto-approve (don't wait for human)
- `--no-fail-on-empty-changeset`: Don't error if nothing changed
- `--stack-name`: Name of your CloudFormation stack
- `--capabilities CAPABILITY_IAM`: Allow SAM to create IAM roles

**What happens in AWS:**
1. SAM uploads code to S3
2. CloudFormation detects changes
3. Updates Lambda function
4. Updates DynamoDB (if schema changed)
5. Updates API Gateway (if routes changed)

---

### Step 10: Health Check
```yaml
- run: curl ${API_URL}counter
```

**Why:**
- Verify deployment actually works
- Catch runtime errors immediately
- Automatic rollback if health check fails

**What it tests:**
- API Gateway is accessible
- Lambda function executes
- DynamoDB connection works
- Returns HTTP 200

---

## Setting Up GitHub Secrets

You need to add these secrets to your GitHub repository:

### 1. Navigate to GitHub Secrets
```
Your Repo → Settings → Secrets and variables → Actions → New repository secret
```

### 2. Add AWS_ACCESS_KEY_ID

**What it is:** Your AWS IAM access key

**How to get it:**
```bash
# Option 1: From AWS Console
IAM → Users → [Your User] → Security credentials → Create access key

# Option 2: If you have AWS CLI configured
cat ~/.aws/credentials
```

**Best Practice:** Create a dedicated IAM user for deployments with minimal permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:*",
        "lambda:*",
        "apigateway:*",
        "dynamodb:*",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "s3:*"
      ],
      "Resource": "*"
    }
  ]
}
```

### 3. Add AWS_SECRET_ACCESS_KEY

**What it is:** The secret key that pairs with your access key

**Security:**
- Never commit this to Git
- Rotate regularly
- Use AWS Secrets Manager for sensitive data

---

## Testing the Pipeline

### Manual Test
1. Go to GitHub → Actions → Backend Lambda Deployment
2. Click "Run workflow"
3. Watch it execute each step

### Automatic Test
1. Make a small change to `app.py`:
   ```python
   logger.info("Testing CI/CD deployment")
   ```
2. Commit and push to main
3. Go to GitHub Actions tab
4. Watch the workflow run

### What Success Looks Like
```
✅ Checkout code
✅ Set up Python 3.9
✅ Install AWS SAM CLI
✅ Configure AWS credentials
✅ Validate SAM template
✅ Run unit tests
✅ Build SAM application
✅ Deploy to AWS
✅ Get API Gateway URL
✅ Test deployed endpoint
```

---

## Troubleshooting

### Common Errors

#### "AWS credentials not configured"
**Cause:** Missing or incorrect GitHub secrets
**Fix:**
1. Check secrets are named exactly: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
2. Verify IAM user has deployment permissions
3. Check access key is still active (not expired)

#### "sam: command not found"
**Cause:** SAM CLI installation failed
**Fix:** Check Python installation step succeeded

#### "Stack does not exist"
**Cause:** First deployment needs different parameters
**Fix:** Run manual `sam deploy --guided` once, then CI/CD will work

#### "Health check failed"
**Cause:** Lambda has runtime error
**Fix:**
1. Check CloudWatch logs
2. Run `sam logs -n ResumePutCountFunction --tail`
3. Fix the error in code

---

## Deployment Process Details

### What Happens in AWS

1. **S3 Upload**
   - Code package uploaded to SAM deployment bucket
   - Bucket auto-created: `aws-sam-cli-managed-default-samclisourcebucket-*`

2. **CloudFormation Update**
   - Stack: `serverless-resume-web-app`
   - Creates/updates: Lambda, API Gateway, DynamoDB
   - CloudFormation = Infrastructure as Code manager

3. **Lambda Update**
   - Function code updated atomically
   - Old version kept (can rollback)
   - New version activated immediately

4. **API Gateway**
   - Routes updated if changed
   - Deployment stage: `Prod`
   - URL stays the same

---

## Best Practices

### ✅ DO
- Test changes locally first (`sam local invoke`)
- Write unit tests for Lambda functions
- Use `sam logs` to debug issues
- Monitor CloudWatch metrics
- Set up CloudWatch alarms for errors

### ❌ DON'T
- Commit AWS credentials to Git
- Skip local testing
- Deploy directly to production without testing
- Ignore failed deployments
- Disable health checks

---

## Cost Considerations

### GitHub Actions
- Free tier: 2,000 minutes/month for public repos
- This workflow uses ~3-5 minutes per run
- Estimate: ~400 deployments/month on free tier

### AWS Costs
- Lambda: Free tier covers most personal sites
- API Gateway: First 1M requests free
- DynamoDB: On-demand pricing (pay per request)
- S3: Negligible for deployment artifacts

---

## Next Steps

1. **Add More Tests**
   - Unit tests for Lambda handler
   - Integration tests for DynamoDB
   - End-to-end API tests

2. **Add Staging Environment**
   - Separate stack for testing
   - Deploy to staging first, then production

3. **Add Monitoring**
   - CloudWatch alarms for errors
   - SNS notifications for deployment failures
   - X-Ray tracing for performance

4. **Improve Security**
   - Use AWS Secrets Manager for sensitive data
   - Implement least-privilege IAM policies
   - Enable CloudTrail for audit logs

---

## Questions?

- SAM Documentation: https://docs.aws.amazon.com/serverless-application-model/
- GitHub Actions: https://docs.github.com/en/actions
- AWS Lambda: https://docs.aws.amazon.com/lambda/
