import json

# https: // boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html


# import requests
import boto3

client = boto3.client("dynamodb")
tableName = "count_table"


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format
        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html
        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """
    data = client.update_item(tableName="count_table",
                              Key={"views": "view_count"},                      UpdateExpression='ADD Quantity :inc',                    ExpressionAttributeValues={":inc": {"N": "1"}},
                              ReturnValues='UPDATED_NEW')

    value = response['Attributes']['Quantity']['N']

    return {
        'statusCode': 200,
        'body': value}
