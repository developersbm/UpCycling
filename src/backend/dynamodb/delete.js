const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const awsConfig = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    credentials: {
        accessKeyId: ACCESSID,
        secretAccessKey: SECRETID
    }
});

const remove = async () => {
    const params = {
        TableName: "users",
        Key: {
            email_id: { S: "example@gmail.com" }
        }
    };

    try {
        const command = new DeleteItemCommand(params);
        await awsConfig.send(command);
        console.log("users::delete::success");
    } catch (err) {
        console.log("users::delete::error - " + JSON.stringify(err, null, 2));
    }
}

remove();
