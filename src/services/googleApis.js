const fs = require('fs');
const { google }= require('googleapis');

const apikeys = require('../../apiKey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// A Function that can provide access to google drive api
async function authorize(){
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

// A Function that will upload the desired file to google drive folder
async function uploadFile(params, file){
    console.log("file.mimeType== ", file.mimeType);
    return new Promise(async (resolve, reject) => {
        let authClient = await authorize();
        const drive = google.drive({version:'v3',auth:authClient}); 

        var fileMetaData = {
            name:params.file_name,    
            parents:['1WlimkFE1AkNQwjW_yjqZd4yWpDMJ3zd7'] // A folder ID to which file will get uploaded
        }

        drive.files.create({
            resource:fileMetaData,
            media:{
                body: fs.createReadStream('public/player_images/' +params.file_name ), // files that will get uploaded
                mimeType:file.mimeType
            },
            fields:'id'
        },function(error,file){
            if(error){
                console.log("error=== ", error);
                return reject(error)
            }
            resolve(file);
        })
    });
}

module.exports = {
    uploadFile : uploadFile
   
};