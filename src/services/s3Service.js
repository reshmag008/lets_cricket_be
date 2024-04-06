const models = require('../models');
const { Op,Sequelize } = require("sequelize");
const AWS = require('aws-sdk');


async function getUploadUrl(params){
    return new Promise(async (resolve, reject) => {
        try {
            const s3 = new AWS.S3({
                accessKeyId: 'AKIAZQ3DPAR4ZIGPSULL',
                secretAccessKey: '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',
                signatureVersion: 'v4',
                region : "ap-south-1"
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
                accessKeyId: 'AKIAZQ3DPAR4ZIGPSULL',
                secretAccessKey: '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',
                signatureVersion: 'v4',
                region : "ap-south-1"
            });
            const requestParams = {
                Bucket: params.bucket,
                Key: params.key, // Use the generated path as the Key
                Expires: 3600, // URL expiration time in seconds
              };
            const uploadUrl = await s3.getSignedUrlPromise('getObject', requestParams);
            resolve(uploadUrl);
        }catch(e){
            console.log("error occured in getDownloadUrl= ", e);
            reject(e);
        }
    })
}


module.exports = {
    getUploadUrl : getUploadUrl,
    getDownloadUrl : getDownloadUrl
}