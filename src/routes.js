const { Router } = require('express') // com {} é possivel buscar um determinado campo 

const DevController = require('./controllers/DevController')
const SearchControoler = require('./controllers/SearchController')

const routes = Router()
routes.get('/devs',DevController.index)
routes.post('/devs',DevController.store);

routes.get('/search',SearchControoler.index)

module.exports = routes;

// Metodos HTTP: GET , PUT , DELETE , POST

//Tipos de parametros  

// Query parms : req.query(filtros,ordenaçao,paginaçao)
// Route parms : req.params(identificar um recurso na alteração ou remoção)
// Body : req.body(Dados para criação ou alteraçao de um registro)
