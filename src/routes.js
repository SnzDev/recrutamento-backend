const routes = require('express').Router();

const clientesController = require('./controller/clientesController');

routes.get('/', async (req, res) => {
    res.json('msg: Hello World!')
})


routes.post('/api/v1/clientes', clientesController.cadastrar)//CREATE
routes.get('/api/v1/clientes', clientesController.listar)//READ
routes.put('/api/v1/cliente/:uuid')//EDIT
routes.get('/api/v1/cliente/:uuid')//SHOW
routes.delete('/api/v1/cliente/:uuid')//SOFT-DELETE

routes.post('/api/v1/enderecos')//CREATE
routes.get('/api/v1/enderecos')//READ
routes.put('/api/v1/endereco/:uuid')//EDIT
routes.get('/api/v1/endereco/:uuid')//SHOW
routes.delete('/api/v1/endereco/:uuid')//SOFT-DELETE

routes.post('/api/v1/pontos')//CREATE
routes.get('/api/v1/pontos')//READ
routes.delete('/api/v1/ponto/:uuid')//SOFT-DELETE

routes.post('/api/v1/contratos')//CREATE
routes.get('/api/v1/contratos')//READ
routes.get('/api/v1/endereco/:uuid')//SHOW
routes.delete('/api/v1/endereco/:uuid')//SOFT-DELETE

routes.get('/api/v1/endereco/:uuid/historico')//SHOW



module.exports = routes;