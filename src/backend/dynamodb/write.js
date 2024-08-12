const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const awsConfig = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    credentials: {
        accessKeyId: ACCESSID,
        secretAccessKey: SECRETID
    }
});

const save = async () => {
    const params = {
        TableName: "users",
        Item: {
            email_id: { S: "example-1@gmail.com" },
            created_by: { S: "clientUser" },
            created_on: { S: new Date().toString() },
            updated_by: { S: "clientUser" },
            updated_on: { S: new Date().toString() },
            is_deleted: { BOOL: false }
        }
    };

    try {
        const command = new PutItemCommand(params);
        await awsConfig.send(command);
        console.log("users::save::success");
    } catch (err) {
        console.log("users::save::error - " + JSON.stringify(err, null, 2));
    }
}

save();
