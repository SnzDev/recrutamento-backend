const routes = require('express').Router();

const clientesController = require('./controller/clientesController');
const enderecosController = require('./controller/enderecosController');


routes.get('/', async (req, res) => {
    res.json('msg: Hello World!')
})


routes.post('/api/v1/clientes', clientesController.cadastrar)//CREATE
routes.get('/api/v1/clientes', clientesController.listar)//READ
routes.put('/api/v1/cliente/:uuid', clientesController.alterar)//EDIT
routes.get('/api/v1/cliente/:uuid', clientesController.buscar)//SHOW
routes.delete('/api/v1/cliente/:uuid', clientesController.deletar)//SOFT-DELETE

routes.post('/api/v1/enderecos', enderecosController.cadastrar)//CREATE
routes.get('/api/v1/enderecos', enderecosController.listar)//READ
routes.put('/api/v1/endereco/:uuid',enderecosController.alterar)//EDIT
routes.get('/api/v1/endereco/:uuid',enderecosController.buscar)//SHOW
routes.delete('/api/v1/endereco/:uuid', enderecosController.deletar)//SOFT-DELETE

routes.post('/api/v1/pontos')//CREATE
routes.get('/api/v1/pontos')//READ
routes.delete('/api/v1/ponto/:uuid')//SOFT-DELETE

routes.post('/api/v1/contratos')//CREATE
routes.get('/api/v1/contratos')//READ
routes.get('/api/v1/endereco/:uuid')//SHOW
routes.delete('/api/v1/endereco/:uuid')//SOFT-DELETE

routes.get('/api/v1/endereco/:uuid/historico')//SHOW



module.exports = routes;