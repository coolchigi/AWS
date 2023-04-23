import boto3
import json

# Connect to the DynamoDB table

dynamodb = boto3.resource('dynamodb')
table_name = 'visitrosCountTable'
table = dynamodb.Table(table_name)

# Event is data passed to the function upon execution

def lambda_handler(event, context):

    response = table.get_item(Key={'ID': 'viewCount'})
    view_count = response['Item']['count']

    return{
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*', # Required for CORS support to work
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': '*', # Required for cookies, authorization headers with HTTPS 
            'Content-Type': 'application/json'
        },
        'body': json.dumps(view_count)
    }