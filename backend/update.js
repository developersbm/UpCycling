const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const awsConfig = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    credentials: {
        accessKeyId: ACCESSID,
        secretAccessKey: SECRETID
    }
});

const modify = async () => {
    const params = {
        TableName: "users",
        Key: {
            email_id: { S: "example-1@gmail.com" }
        },
        UpdateExpression: "SET updated_by = :byUser, is_deleted = :boolValue",
        ExpressionAttributeValues: {
            ":byUser": { S: "updateUser" },
            ":boolValue": { BOOL: true }
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const command = new UpdateItemCommand(params);
        const data = await awsConfig.send(command);
        console.log("users::update::success " + JSON.stringify(data));
    } catch (err) {
        console.log("users::update::error - " + JSON.stringify(err, null, 2));
    }
}

modify();
