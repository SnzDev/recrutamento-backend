const { Ponto } = require('../app/models');
const { Op } = require('Sequelize');

class PontosController {
    async cadastrar(req, res) {
        const { cliente_id, endereco_id } = req.body;

        try {
            const ponto = await Ponto.create({ cliente_id, endereco_id });
            if (ponto) {
                res.status(201).send();
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const ponto = await Ponto.update({ data_remocao: new Date }, { where: { id: uuid } })
            if (ponto) {
                res.status(204).send();
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
                where: {
                    cliente_id, endereco_id
                }
            })
            if (ponto) {
                res.status(200).json({ dados: ponto });
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new PontosController();