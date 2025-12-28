import boto3
import json
import logging
from botocore.exceptions import ClientError

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table_name = 'visitorsCountTable'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Lambda function to track and return visitor count.
    Increments count in DynamoDB and returns the updated value.
    """
    try:
        logger.info("Incrementing visitor count")

        # Update the visitor count atomically
        update_response = table.update_item(
            Key={'ID': 'viewCount'},
            UpdateExpression='ADD #viewCount :incr',
            ExpressionAttributeNames={'#viewCount': 'viewCount'},
            ExpressionAttributeValues={':incr': 1},
            ReturnValues='UPDATED_NEW'
        )

        # Get the updated count from the response
        if 'Attributes' in update_response and 'viewCount' in update_response['Attributes']:
            view_count = int(update_response['Attributes']['viewCount'])
            logger.info(f"Visitor count updated to: {view_count}")
        else:
            logger.warning("viewCount not found in update response, fetching separately")
            # Fallback: fetch the item
            get_response = table.get_item(Key={'ID': 'viewCount'})

            if "Item" in get_response and 'viewCount' in get_response['Item']:
                view_count = int(get_response['Item']['viewCount'])
            else:
                logger.error("viewCount item not found in DynamoDB")
                raise ValueError("Visitor count not initialized in database")

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            'body': json.dumps(view_count)
        }

    except ClientError as e:
        logger.error(f"DynamoDB error: {e.response['Error']['Message']}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'error': 'Failed to update visitor count',
                'message': 'Database error occurred'
            })
        }

    except ValueError as e:
        logger.error(f"Value error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'error': 'Invalid data',
                'message': str(e)
            })
        }

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': 'An unexpected error occurred'
            })
        }



        

        

