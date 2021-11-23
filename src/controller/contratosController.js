const { Ponto } = require('../app/models');
const { Contrato } = require('../app/models');



class ContratosController {
    async cadastrar(req, res) {
        const { ponto_id } = req.body;
        try {
            const contratos = await Contrato.create({ ponto_id, estado: 'Em vigor' });

            if (contratos) {
                res.status(201).send();
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async listar(req, res) {
        const { cliente_id, endereco_id } = req.query;
        try {
            const ponto = await Ponto.findAll({
                include: ['cliente'],
                where: {cliente_id, endereco_id},
                attributes:['id']
            })
            if (ponto) {
                res.status(200).json({ dados: ponto });
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async buscar(req, res) {
        try {
            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async deletar(req, res) {
        try {
            res.status(204).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new ContratosController();