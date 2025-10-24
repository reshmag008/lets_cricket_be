const fs = require('fs');
const { google }= require('googleapis');
const models = require('../models');


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


// Upload file to Google Drive
// const uploadFile = async (fileBuffer, fileName, mimeType) => {
//     let authClient = await authorize();
// const drive = google.drive({ version: 'v3', auth:authClient });
//   try {
//     const response = await drive.files.create({
//       requestBody: {
//         name: fileName,
//         mimeType: mimeType,
//       },
//       media: {
//         mimeType: mimeType,
//         body: Buffer.from(fileBuffer, 'binary'),
//       },
//     });
//     console.log('File uploaded to Google Drive with ID:', response.data.id);
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading to Google Drive:', error);
//     throw error;
//   }
// };


// A Function that will upload the desired file to google drive folder
async function uploadFile(params, file){
    console.log("file.params== ", params);
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
        },async function(error,file){
            if(error){
                console.log("error=== ", error);
                return reject(error)
            }
            let fileId = file?.data?.id;
            console.log("fileId=== ", fileId);
            if(fileId){
                // if(params.player_id){
                //     let selectedPlayer = await models.players.findOne({where : {id : params.player_id}});
                //     selectedPlayer.set({profile_image : fileId});
                //     await selectedPlayer.save();
                //     resolve(selectedPlayer);
                // }
                // if(params.team_id){
                //     let selectedTeam = await models.teams.findOne({where : {id : params.team_id}});
                //     selectedTeam.set({team_logo : fileId});
                //     await selectedTeam.save();
                //     resolve(selectedTeam)
                // }
            }else{
                resolve(file);
            }
            
        })
    });
}

async function previewFile(fileId){
    return new Promise(async (resolve, reject) => {
        let authClient = await authorize();
        const drive = google.drive({version:'v3',auth:authClient}); 

        try {
            const response = await drive.files.get({ fileId, fields: 'webViewLink' });
            resolve(response.data.webViewLink);
          } catch (error) {
            console.error('Error retrieving image URL:', error);
            reject(error);
          }
    });
}

module.exports = {
    uploadFile : uploadFile,
    previewFile : previewFile
   
};