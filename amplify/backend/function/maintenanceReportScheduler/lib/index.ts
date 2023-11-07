/* Amplify Params - DO NOT EDIT
	API_BETAAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_BETAAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { APIGatewayProxyHandler } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`)
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify('Hello from Lambda!'),
    }
}

export { handler }
