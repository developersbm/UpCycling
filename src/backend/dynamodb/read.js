const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const awsConfig = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    credentials: {
        accessKeyId: ACCESSID,
        secretAccessKey: SECRETID
    }
});

const fetchOneByKey = async () => {
    const params = {
        TableName: "users",
        Key: {
            email_id: { S: "example@gmail.com" }
        }
    };

    try {
        const command = new GetItemCommand(params);
        const data = await awsConfig.send(command);
        console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
    } catch (err) {
        console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
    }
}

fetchOneByKey();