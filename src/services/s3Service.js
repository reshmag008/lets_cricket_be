const models = require('../models');
const { Op,Sequelize } = require("sequelize");
const AWS = require('aws-sdk');


async function getUploadUrl(params){
    return new Promise(async (resolve, reject) => {
        try {
            const s3 = new AWS.S3({
                accessKeyId: 'AKIA6ODU5GORGU6OXYMO',
                secretAccessKey: '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'
            });
            const reqestParams = {
                Bucket: params.bucket,
                Key: params.key,
                ContentType: params.contentType,
            };
            const uploadUrl = await s3.getSignedUrlPromise('putObject', reqestParams);
            resolve(uploadUrl);
        }catch(e){
            console.log("error occured in uploadPlayerImage= ", e);
            reject(e);
        }
    })
}

async function getDownloadUrl(params){
    return new Promise(async (resolve, reject) => {
        try {
            const s3 = new AWS.S3({
                accessKeyId: 'AKIA6ODU5GORGU6OXYMO',
                secretAccessKey: '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'
            });
            const requestParams = {
                Bucket: params.bucket,
                Key: params.key, // Use the generated path as the Key
                Expires: 3600, // URL expiration time in seconds
              };
            const uploadUrl = await s3.getSignedUrlPromise('getObject', requestParams);
            resolve(uploadUrl);
        }catch(e){
            console.log("error occured in uploadPlayerImage= ", e);
            reject(e);
        }
    })
}


module.exports = {
    getUploadUrl : getUploadUrl,
    getDownloadUrl : getDownloadUrl
}