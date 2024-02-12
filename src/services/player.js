
const models = require('../models');
const { Op,Sequelize, where } = require("sequelize");
const AWS = require('aws-sdk');
const teamService = require('./teams');
const s3Service = require('./s3Service');


async function getPlayers(id){
    return new Promise(async (resolve, reject) => {
        try {
            let players =[];
            if(id){
                players = await models.players.findAll({where :{team_id : id}});
            }else{
                players = await models.players.findAll();
            }
            let promiseArray =[];
            players.forEach(async (element,index) => {
                promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "cricket-players"}))
            });
            let profilePromises = await Promise.allSettled(promiseArray)
            if(players.length>0){
            players.forEach((element,index)=>{
                players[index]['profile_image'] = profilePromises[index].value;
                if(index == players.length-1){
                    resolve(players)
                }
            })
        }else{
            resolve(players)
        }
            
        }catch(e){
            console.log("error occured in getPlayers= ", e);
            reject(e);
        }
    })
}

async function getNonBidPlayers(id) {

    return new Promise(async (resolve, reject) => {
        try {
            let players =[];

            if(id){
                players = await models.players.findAll({
                    where: {
                      bid_amount: null,
                      id : id
                    }
                  });
            }else{
                players = await models.players.findAll({
                    where: {
                      bid_amount: null
                    }
                  });
            }
            let promiseArray =[];
            if(players.length>0){
                players.forEach(async (element,index) => {
                    promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "cricket-players"}))
                });
                let profilePromises = await Promise.allSettled(promiseArray)

                players.forEach((element,index)=>{
                    players[index]['profile_image'] = profilePromises[index].value;

                    if(index == players.length-1){
                        resolve(players)
                    }
                })
            }else{
                resolve([])
            }
            
        }catch(e){
            console.log("error occured in getPlayers= ", e);
            reject(e);
        }
    })


}

async function addPlayers(player){
    return new Promise(async (resolve, reject) => {
        try {
            let players = await models.players.create(player);
            resolve(players)
        }catch(e){
            console.log("error occured in addPlayers= ", e);
            reject(e);
        }
    })
}

async function updatePlayers(player){
    return new Promise(async (resolve, reject) => {
        try {
            let selectedPlayer = await models.players.findOne({where : {id : player.id}});
            selectedPlayer.set(player);
            await selectedPlayer.save();
            let updateTeamParam = {
                id : player.team_id,
                bid_amount : player.bid_amount
            }
            let updateTeam = await teamService.updateTeam(updateTeamParam)
            resolve(selectedPlayer)
        }catch(e){
            console.log("error occured in addPlayers= ", e);
            reject(e);
        }
    })
}





module.exports = {
    getPlayers : getPlayers,
    addPlayers : addPlayers,
    updatePlayers : updatePlayers,
    getNonBidPlayers :getNonBidPlayers
};