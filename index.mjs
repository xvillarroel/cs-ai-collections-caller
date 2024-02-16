// https://fq6usk6c7kbsrdwstmklvki7x40ececm.lambda-url.us-east-1.on.aws/

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fetch from 'node-fetch';

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:', reason);
});

const globals = {
    OPENAI_APIKEY:  'Bearer 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',
    ZDDOMAIN:       'central-supportdesk.zendesk.com',
    ZDAUTH:         'Basic Y2FybG9zLmVuY2FsYWRhQHRyaWxvZ3kuY29tL3Rva2VuOmhnQTltaFFvQjlWV1dnaGV6UjZFeEdDZFlPTFZMRFp3dUlmU1RTbGE=',
    SHEETS_LINK:    '13rBFlGSpmXah2pzvUjYDm6xsv5tDhGFBu1q2ImvQQVk',
    CALL_LINK:     'https://voiceflow-twilio-collections.replit.app/ivr/call',
    SERVICEACCOUNTAUTH: new JWT({
        email:  'javascript-writer@groupsproject-370909.iam.gserviceaccount.com',
        key:    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtAUZp72L3zq+6\nGdBUrgGqs7kbUtWx0mKHfdMiliRsLe6wj0UYdhSqU/Nd505ic0EGRwrhxL3rq4FV\nIQI5creAGfNWzOZKtAPMV4YoSqN8HgfvF/DrLgGAwScn56dVituCOxv4j9pXQIIo\nMiIm9O13mWlEBEFjw+jXP/Z+6M7Rgk25lDZR0/1A/KX5eG/XJ0fmcC+TSM0NpS6V\nKrbqHweFfgLDTbUqsf8TUOqLFJ0Qaj7VBuGjd9yp9+icZ68giksMuyFdqlo4MKD6\ns2WW3YR2NeSbQ/+D+6IGWyts+9NA9OVDazaT1nJ6+KYO+Oq6c1l8lxS9ur01JrSU\nPIP1PLTjAgMBAAECggEAOG8MCw5dmDxBslEtVhIU1RwfK7yPnJvmLBBtSQD1DJzH\nGa0CewI5p34PCvii5xZ1hZizAgZtdWzSmXRVB2xWU2EjsZLRJFkoTAXY61e9kIUz\nTVjf67dsIhXfsfKs8QiEpiyl6STzsjaGvpnr7g1DURon7ln9ApAraduhirBilpCD\ne6HpFv81gRT+2ujzFvWWW4NE0E2uy8LxnOxSyFGOpK4PUWPpoJuLf52MCwOae+oB\nRXKpxjMjM9kBJ4Rex9ugR6ETwkf1JDQfa/uM/cOlEQjqS9rp20jbZCWPtYfSpLt0\n+nr+TfM+nGYYu0zWRLH6mTHVnHGItFcjUAQTIZdk0QKBgQDWYglr4IIAZh6BYe/z\nbXI+mQN9UbkTzQ691abyjY5pUEu0lKd/HrYwS0Phzj+5lhaUtrEvbN0HclaTCEd7\n10v0m30jiwJPQDmu9RXj6Tl3qKb2rxnHLviX9ypJ7mkDHO7KTRDahVvm6jZmcHnR\nzNA/9mYLpiVNpGQakoyVVX3vrQKBgQDOluu1C2j5PCuGkmkEEOSb4uZt9MvTGdDi\ns/7fcPEyPS/1Vbh/IrKwBBSnfpcUfCpD1dC8YbQhjsHewdPqnpiOHFj9hOsoQeH4\nRYaZTRFAW95a6LnBRmTXqCWyru8Q2Llr3Zz0agtc/L1+LvF2jcltjNgsAfed0Gu3\nNiswM+SIzwKBgEH4QxvuJzMGOabow1TuPfSjU16R8lj0he/GuivzgXpI2jMEd5J3\nmeq8jnQC6rsqQ2KZ4WZNoqpy9c8jAhRKyTXJTzXLxfcrNVTwWD8c+rEmtdI9Sbpw\natEgnuPHOItbsOOR2XjVBtXFBt55CBOWahL0uKwnAV2mE6PVqusdNra1AoGARbJI\n5xVoXt1b2dS/NS310lmkX+g8c4W8IR+UlxFlbguSiHRZABtWqWdXCIL+uVyCbcxO\n1Z8oxEGDSoGd2wOSeC88HpufMj+32qiqFkIX1dyokYb+VCRJlTAXN8coxEg5lhh4\nAUVdfAuQamev8s027YycyYwIW+eaz36o52Q6b6UCgYAUs79KmYnzSWBI4NGueCGB\n6isZWyB/CXm7FO19YNLeUZSaeCtV6MpE3bnuu/lD0RTZeh3kO9iCU/hSBe2NLywt\nR5sECyYkR5WA4on/XUk5dlPu1XGtrdH9EBg6idDTdbSoE5r1PAQ3uztYAVecztOW\nEovCHd0/5Gw1Cw5aanfUqw==\n-----END PRIVATE KEY-----\n',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

};

/////////////////////////////////////////////////////

const addDelay = (sec) => new Promise((resolve) => setTimeout(resolve, (sec * 1000)));

const assembleResponse = async (status, message) => {
    let object = {
        statusCode: status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: message
    }
        if (globals.LOGMODE) console.log(`Assembling Response: ${JSON.stringify(object,null,2)}` )
    return object;
};

const convertToMatrix = (row) => {
    return row.map(
        index => { let array = Object.values(index)[2]
            return array; 
        }  
    );
};

const filterMatrix = (row, shift) => {
    return row.filter(row => row[8] === shift);
};

const makeCall = async (phoneNumber) => {
    await addDelay(10);
    const url = `${globals.CALL_LINK}?phone=${phoneNumber}`;
    const headers = {
      "Content-Type": "application/json"
    };
  
    const payload = {};
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log('Call Made:', data);
      return data;
    } catch (error) {
      console.error('Call error:', error);
      throw error;
    }
};

function getRowIndex(matrix, array) {
    return matrix.findIndex(item => (item[1] === array[1]) && (item[2] === array[2]) && (item[3] === array[3])); //&& (item[4] === array[4]) && (item[5] === array[5])
}

export const handler = async (event, context) => {  

    console.log (`****************\n Starting Function - V1 (PROD VERSION) \n****************`)
    let response; 

    let body = JSON.parse(event.body);

        if (event.requestContext && event.requestContext.http.method !== 'POST') {

            response = await assembleResponse(400,'Method is not allowed - Only accepts POST'); //if it's not a POST 
            console.log(JSON.stringify(response),null,2);
            return response;

        } 

        if (!body.shift) { 
            response =  await assembleResponse(400,'The "shift" parameter is missing'); 
            console.log(JSON.stringify(response),null,2);
            return response;
        }

    const shift2Call = body.shift;
    const doc = new GoogleSpreadsheet(globals.SHEETS_LINK, globals.SERVICEACCOUNTAUTH);
    await doc.loadInfo();
    let tabName = 'Raw';
    console.log(`Title of the doc: ${doc.title}`);
    let activeSheet = doc.sheetsByTitle[tabName];

        if (!activeSheet){
            response =  await assembleResponse(400,'The "Raw" tab is missing'); 
            console.log(JSON.stringify(response),null,2);
            return response;
        } 


    await activeSheet.loadCells('A1:Z');
    let rows = await activeSheet.getRows();
    let rawMatrix = convertToMatrix(rows); 

    // let rowsObject = divideMatrix(matrix);
    
    let matrix = filterMatrix(rawMatrix, shift2Call)

    if (!matrix.length){
        response =  await assembleResponse(400,'No one to call in this shift'); 
        console.log(JSON.stringify(response,null,2));
        return response;
    } 

    let newPeopleToCall = false;
    let customersCalled = "";

    for (let i = 0; i < matrix.length; i++){

        let phone2Call = matrix[i][3]
                        .replace(/ /g,'')
                        .replace(/\+/g,'');

        let alreadyCalled = (matrix[i][9] === 'FALSE') ? false : true;

        let location = getRowIndex(rawMatrix, matrix[i]);
        let relativeLocation = location + 2;

        if (!alreadyCalled){ 

            response = await makeCall(phone2Call);
            // response = {"status": "Call initiated to"}; // ELIMINATE THIS
            console.log(`Calling customer (${relativeLocation})${matrix[i][2]} at ${phone2Call} (Shift ${matrix[i][8]}). Status: ${(response.status = "Call initiated to") ? "Called Successfully" : "Called Failed"}`)
            newPeopleToCall = true;

            if (response.status.search('Call initiated to') > -1) { //If that response exist.
                
                customersCalled += `<${matrix[i][2]}>, `
                console.log(response.status);
                rows[location].set('Called', true);
                rows[location].set('AP Contact Number', `'+${phone2Call.toString()}`);
                await rows[location].save();

            }

        } else {
            console.log(`(${relativeLocation}) ${matrix[i][2]} (${phone2Call}) was already called.`)
        }

    }

    customersCalled = `List of customers called: ${customersCalled}.`.replace(`, .`,".");

    let finalResponse;

    if (!newPeopleToCall) {
        finalResponse =  await assembleResponse(400,`All the customers in shift ${shift2Call} were already called.`); 
    } else {
        finalResponse =  await assembleResponse(200,`New customers have been called. ${customersCalled}`); 
    }

    console.log(JSON.stringify(finalResponse, null, 2));

    return finalResponse;

};


// (async function(shift) {

//     let body = "{\r\n    \"shift\": \"" + shift.toString() + "\",\r\n    \"parameter\": \"true\"\r\n}";

//     (await handler({
//         "version": "2.0",
//         "routeKey": "$default",
//         "rawPath": "/",
//         "rawQueryString": "",
//         "headers": {
//             "content-length": "31",
//             "x-amzn-tls-version": "TLSv1.2",
//             "x-forwarded-proto": "https",
//             "postman-token": "10af8a54-d2c6-4d15-9c58-efbbcad5d9ce",
//             "x-forwarded-port": "443",
//             "x-forwarded-for": "181.43.127.230",
//             "accept": "*/*",
//             "x-amzn-tls-cipher-suite": "ECDHE-RSA-AES128-GCM-SHA256",
//             "x-amzn-trace-id": "Root=1-65ae9dcb-7fcbc611605448014d81fad9",
//             "host": "lopwygpie4ijxb7a3furyd57ni0oumpb.lambda-url.us-east-1.on.aws",
//             "content-type": "application/json",
//             "accept-encoding": "gzip, deflate, br",
//             "user-agent": "PostmanRuntime/7.36.1"
//         },
//         "requestContext": {
//             "accountId": "anonymous",
//             "apiId": "lopwygpie4ijxb7a3furyd57ni0oumpb",
//             "domainName": "lopwygpie4ijxb7a3furyd57ni0oumpb.lambda-url.us-east-1.on.aws",
//             "domainPrefix": "lopwygpie4ijxb7a3furyd57ni0oumpb",
//             "http": {
//                 "method": "POST",
//                 "path": "/",
//                 "protocol": "HTTP/1.1",
//                 "sourceIp": "181.43.127.230",
//                 "userAgent": "PostmanRuntime/7.36.1"
//             },
//             "requestId": "a985a8f1-9ce0-4f67-bdb6-c8af045dadba",
//             "routeKey": "$default",
//             "stage": "$default",
//             "time": "22/Jan/2024:16:54:35 +0000",
//             "timeEpoch": 1705942475796
//         },
//         "body": body,
//         "isBase64Encoded": false
//     }));
// })('S2');