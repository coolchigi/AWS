import boto3
import json

# Connect to the DynamoDB table

dynamodb = boto3.resource('dynamodb')
table_name = 'visitorsCountTable'
table = dynamodb.Table(table_name)

# Event is data passed to the function upon execution



def lambda_handler(event, context):
    try:
        response = table.get_item(Key={'ID': 'viewCount'})
        if 'Item' in response:
            view_count = response['Item']['count']
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*', # Required for CORS support to work
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': '*', # Required for cookies, authorization headers with HTTPS 
                    'Content-Type': 'application/json',
                    'Access-Control-Expose-Headers' : '*'
                },
                'body': json.dumps(view_count)
            }
        else:
            return {
                'statusCode': 404,
                'body': 'Item not found'
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }
