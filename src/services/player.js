
const models = require('../models');
const { Op,Sequelize } = require("sequelize");
const AWS = require('aws-sdk');
const teamService = require('./teams');
const s3Service = require('./s3Service');


async function getPlayers(){
    return new Promise(async (resolve, reject) => {
        try {
            let players = await models.players.findAll();
            let promiseArray =[];
            players.forEach(async (element,index) => {
                promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "cricket-players"}))
            });
            let profilePromises = await Promise.allSettled(promiseArray)

            console.log("before resolveeeeeeeeee",profilePromises)
            players.forEach((element,index)=>{
                console.log("profilePromises[index].value=== ", profilePromises[index].value)
                players[index]['profile_image'] = profilePromises[index].value;

                if(index == players.length-1){
                    resolve(players)
                }
            })
            
        }catch(e){
            console.log("error occured in getPlayers= ", e);
            reject(e);
        }
    })
}

async function getNonBidPlayers() {

    return new Promise(async (resolve, reject) => {
        try {
            let players = await models.players.findAll({
                where: {
                  bid_amount: null
                }
              });
            let promiseArray =[];
            players.forEach(async (element,index) => {
                promiseArray.push(s3Service.getDownloadUrl({"key" : element.profile_image, "bucket" : "cricket-players"}))
            });
            let profilePromises = await Promise.allSettled(promiseArray)

            console.log("before resolveeeeeeeeee",profilePromises)
            if(players.lnegth>0){
            players.forEach((element,index)=>{
                console.log("profilePromises[index].value=== ", profilePromises[index].value)
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
    console.log("inside add player--- ", player);
    return new Promise(async (resolve, reject) => {
        try {
            let players = await models.players.create(player);
            console.log("players added====== ", players);
            resolve(players)
        }catch(e){
            console.log("error occured in addPlayers= ", e);
            reject(e);
        }
    })
}

async function updatePlayers(player){
    console.log("inside updatePlayers--- ", player);
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