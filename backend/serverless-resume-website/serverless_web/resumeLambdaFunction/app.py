import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table_name = 'visitorsCountTable'

table = dynamodb.Table(table_name)

def lambda_handler(event, context):

    response = table.update_item(
        Key={'ID': 'viewCount'},
        UpdateExpression='ADD #viewCount :incr',
        ExpressionAttributeNames={'#viewCount': 'viewCount'},
        ExpressionAttributeValues={':incr': 1},
        ReturnValues='UPDATED_NEW'
    )

    response = table.get_item(Key={'ID': 'viewCount'})

    if "Item" in response:
                view_count = response['Item']['viewCount']
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET'
        },
        "body": view_count
    }



        

        

