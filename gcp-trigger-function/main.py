import base64
import json
import os

from google.cloud import pubsub_v1


# Instantiates a Pub/Sub client
publisher = pubsub_v1.PublisherClient()
# PROJECT_ID = os.getenv('GOOGLE_CLOUD_PROJECT')


# Publishes a message to a Cloud Pub/Sub topic.
def trigger_test(request):
    print(request.get_json().get('test'))
    request_json = request.get_json(silent=True)

    # topic_name = request_json.get("topic")
    topic_name = 'test-trigger'
    message = request_json.get("test")

    #if not topic_name or not message:
    #    return ('Missing "test" parameter.', 400)

    print(f'Publishing message to topic {topic_name}')

    # References an existing topic
    PROJECT_ID = 'myfirstgcpfunction'
    topic_path = publisher.topic_path(PROJECT_ID, topic_name)

    message_json = json.dumps({
        'data': {'message': message},
    })
    message_bytes = message_json.encode('utf-8')

    # Publishes a message
    try:
        publish_future = publisher.publish(topic_path, data=message_bytes)
        publish_future.result()  # Verify the publish succeeded
        return 'Message published.'
    except Exception as e:
        print(e)
        return (e, 500)

