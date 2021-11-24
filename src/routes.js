const routes = require('express').Router();

const clientesController = require('./controller/clientesController');
const enderecosController = require('./controller/enderecosController');
const pontosController = require('./controller/pontosController');
const contratosController = require('./controller/contratosController');
const historicoController = require('./controller/historicoController');





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

routes.post('/api/v1/pontos', pontosController.cadastrar)//CREATE
routes.get('/api/v1/pontos', pontosController.listar)//READ
routes.delete('/api/v1/ponto/:uuid', pontosController.deletar)//SOFT-DELETE

routes.post('/api/v1/contratos', contratosController.cadastrar)//CREATE
routes.get('/api/v1/contratos', contratosController.listar)//READ
routes.get('/api/v1/contrato/:uuid', contratosController.buscar)//SHOW
routes.delete('/api/v1/contrato/:uuid', contratosController.deletar)//SOFT-DELETE

routes.put('/api/v1/contrato/:uuid/vigorar', historicoController.mudarParaEmVigor)//SHOW
routes.put('/api/v1/contrato/:uuid/desativar',historicoController.mudarParaDesativadoTemporario)//SHOW
routes.put('/api/v1/contrato/:uuid/cancelar',historicoController.mudarParaCancelado)//SHOW
routes.get('/api/v1/contrato/:uuid/historico',historicoController.buscarHistorico)//SHOW




module.exports = routes;