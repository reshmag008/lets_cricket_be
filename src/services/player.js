
const models = require('../models');
const { Op,Sequelize, where } = require("sequelize");
const AWS = require('aws-sdk');
const teamService = require('./teams');
const s3Service = require('./s3Service');
// const {io} = require('../app');


async function displayPlayer(player){
    return new Promise(async (resolve, reject) => {
        try {
            console.log("fdfsdf----socket--Connect----sdfsdfsdf----")
            global?.socket?.emit('current_player', JSON.stringify(player))
            resolve('success')
        }catch(e){
            console.log("error occured in displayPlayer= ", e);
            reject(e);
        }
    })
}

async function teamCall(teamCallData){
    return new Promise(async (resolve, reject) => {
        try {
            global.socket.emit('team_call', JSON.stringify(teamCallData))
            resolve('success')
        }catch(e){
            console.log("error occured in displayPlayer= ", e);
            reject(e);
        }
    })
}

async function getSoldPlayers(){
    return new Promise(async (resolve, reject) => {
        try {
            let players = await models.players.findAll({
                where: {
                  bid_amount: {
                    [Sequelize.Op.not]: null
                  }
                },limit : 10,order: [['updatedAt', 'DESC']]
              });
            let promiseArray =[];
            let teamPromiseArray = [];
            players.forEach(async (element,index) => {
                promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "palloor-players"}))
                teamPromiseArray.push(models.teams.findOne({where:{id : element.team_id}}))
            });
            let profilePromises = await Promise.allSettled(promiseArray);
            let teamPromises = await Promise.allSettled(teamPromiseArray);
            if(players.length>0){
            players.forEach((element,index)=>{
                players[index]['profile_image'] = profilePromises[index].value;
                console.log("teamPromises[index].value== ", teamPromises[index].value);
                players[index]['team_id'] = teamPromises[index].value.team_name
            })

            let response = {
                players : players
            }
            resolve(response);
        }else{
            resolve(players)
        }
            
        }catch(e){
            console.log("error occured in getPlayers= ", e);
            reject(e);
        }
    })
}

async function getPlayers(id){
    return new Promise(async (resolve, reject) => {
        try {
            let players =[];
            if(id){
                players = await models.players.findAll({where :{team_id : id}});
            }else{
                players = await models.players.findAll({offset:85});
            }
            let promiseArray =[];
            players.forEach(async (element,index) => {
                promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "palloor-players"}))
            });
            let profilePromises = await Promise.allSettled(promiseArray);
            if(players.length>0){
            players.forEach((element,index)=>{
                players[index]['profile_image'] = profilePromises[index].value;
            })

            
            let unSoldPlayerCount = await models.players.count({where: {un_sold : true} });
            let soldPlayerCount = await models.players.count({where: {
                bid_amount: {
                  [Op.not]: null
                }
              }})
            let pendingPlayerCount = await models.players.count({where:{
                bid_amount : null ,
                un_sold : false
            }})

            let response = {
                players : players,
                unSoldPlayerCount:unSoldPlayerCount,
                soldPlayerCount:soldPlayerCount,
                pendingPlayerCount:pendingPlayerCount
            }
            resolve(response);
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
                      id : id,
                      un_sold : false
                    }
                  });
            }else{
                players = await models.players.findAll({
                    where: {
                      bid_amount: null,
                      un_sold : false
                    }
                  });
            }
            let promiseArray =[];
            if(players.length>0){
                players.forEach(async (element,index) => {
                    promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "palloor-players"}))
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
            let updateTeam;
            if(player.team_id){
                let updateTeamParam = {
                    id : player.team_id,
                    bid_amount : player.bid_amount
                }
                updateTeam = await teamService.updateTeam(updateTeamParam)
            }
            global.socket.emit('player_sold', JSON.stringify(player))
            resolve(updateTeam)
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
    getNonBidPlayers :getNonBidPlayers,
    displayPlayer : displayPlayer,
    teamCall : teamCall,
    getSoldPlayers : getSoldPlayers
};