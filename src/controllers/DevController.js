const axios = require('axios'); // axios faz a chamada para API's disponiveis
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray')
const {findConnections , sendMessage} = require('../websocket')
//index : Mostrar uma lista  - Show : Mostrar um unico 'usuario' , store : cadastrar , update : atualizar os dados , destroy : deletar
module.exports = {
    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs)
    },
    async store (request,response) {
        // request : onde vai vir todos os dados do front .  . . ex : dados do usuario  && response : como irei devolver estes dados para front
        const {github_username , techs ,latitude , longitude} = request.body

        console.log(request.body)

        let dev = await Dev.findOne({github_username})

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const {name = login , avatar_url,bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates :[longitude,latitude]
            }
        
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //Filtrar as conexoes que estao no maximo 10km de distancia e que possua algumas techs filtradas

            const sendSocketMessageTo = findConnections(
                { latitude , longitude },
                 techsArray,)
                
                 sendMessage(sendSocketMessageTo , 'new-dev',dev)
        
        }
        return response.json(dev)
    
    }

};