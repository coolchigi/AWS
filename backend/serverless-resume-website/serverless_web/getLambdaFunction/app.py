import boto3
import json
from boto3.dynamodb.conditions import Key

# Connect to the DynamoDB table

dynamodb = boto3.resource('dynamodb')
table_name = 'visitorsCountTable'
table = dynamodb.Table(table_name)

# Event is data passed to the function upon execution
def lambda_handler(event, context):
        response = table.get_item(Key={'ID': 'viewCount'})
        if "Item" in response:
                view_count = response['Item']['viewCount']
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': '*',
            'Access-Control-Allow-Methods' : 'GET',
            'Content-Type': 'application/json'
        },
        "body": view_count
}



        
