import boto3
import json


dynamodb = boto3.resource('dynamodb')
table_name = 'visitrosCountTable'

table = dynamodb.Table(table_name)

def handler(event, context):

    table.update_item(
        Key={'ID': 'viewCount'},
        UpdateExpression='ADD #count :incr',
        ExpressionAttributeNames={'#count': 'count'},
        ExpressionAttributeValues={':incr': 1}
    )
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': '*',
            'Content-Type': 'application/json'
        }
    }