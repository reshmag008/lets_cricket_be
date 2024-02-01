const models = require('../models');
const { Op,Sequelize } = require("sequelize");
const AWS = require('aws-sdk');
const playerService = require('./player')
const s3Service = require('./s3Service');



async function getTeams(){
    return new Promise(async (resolve, reject) => {
        try {
            let teams = await models.teams.findAll();
            let promiseArray =[];
            teams.forEach(async (element,index) => {
                promiseArray.push(s3Service.getDownloadUrl({"key" : element.team_logo, "bucket" : "cricket-team"}))
            });
            let profilePromises = await Promise.allSettled(promiseArray)
            console.log("before resolveeeeeeeeee",profilePromises)
            teams.forEach((element,index)=>{
                console.log("profilePromises[index].value=== ", profilePromises[index].value)
                teams[index]['team_logo'] = profilePromises[index].value;
                if(index == teams.length-1){
                    resolve(teams)
                }
            })
        }catch(e){
            console.log("error occured in getTeams= ", e);
            reject(e);
        }
    })
}

async function addTeams(team){
    console.log("inside add addTeams--- ", team);
    return new Promise(async (resolve, reject) => {
        try {
            let addedTeam = await models.teams.create(team);
            console.log("team added====== ", addedTeam);
            resolve(addedTeam)
        }catch(e){
            console.log("error occured in addTeams= ", e);
            reject(e);
        }
    })
}


async function updateTeam(team){
    console.log("inside add updateTeam--- ", team);
    return new Promise(async (resolve, reject) => {
        try {
            let addedTeam = await models.teams.findOne({where:{id : team.id}});
            let updateParam = {
                total_points : addedTeam.total_points - team.bid_amount
            }
            addedTeam.set(updateParam);
            await addedTeam.save();
            resolve(addedTeam)
        }catch(e){
            console.log("error occured in addTeams= ", e);
            reject(e);
        }
    })
}

async function getTeamNames() {

    return new Promise(async (resolve, reject) => {
        try {
            let teams = await models.teams.findAll();
            resolve(teams);
        }catch(e){
            console.log("error occured in getTeams= ", e);
            reject(e);
        }
    })



}



module.exports = {
    getTeams : getTeams,
    addTeams : addTeams,
    getTeamNames:getTeamNames,
    updateTeam :  updateTeam
}