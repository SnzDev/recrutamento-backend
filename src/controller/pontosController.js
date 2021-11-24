const { Ponto } = require('../app/models');
const { Cliente } = require('../app/models');
const { Endereco } = require('../app/models');

const { Op } = require('Sequelize');

class PontosController {
    async cadastrar(req, res) {
        const { cliente_id, endereco_id } = req.body;

        try {
            const verificaSeExistePonto = await Ponto.count({ where: { cliente_id, endereco_id } });
            if (verificaSeExistePonto > 0) {
                const verificaDeletePonto = await Ponto.findOne({ where: { cliente_id, endereco_id } });
                if (verificaDeletePonto.data_remocao != null) {
                    const ponto = await Ponto.update({ data_remocao: null }, { where: { cliente_id, endereco_id } })
                    if (ponto) {
                        res.status(201).send();
                    }
                } else {
                    res.status(400).send();
                }
            } else {
                const verificaDeleteCliente = await Cliente.findOne({ where: { id: cliente_id } }).data_remocao;
                const verificaDeleteEndereco = await Endereco.findOne({ where: { id: endereco_id } }).data_remocao;
                if (verificaDeleteCliente == null && verificaDeleteEndereco == null) {
                    const ponto = await Ponto.create({ cliente_id, endereco_id });
                    if (ponto) {
                        res.status(201).send();
                    }
                } else {
                    res.status(400).send();
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const { data_remocao } = await Ponto.findOne({ where: { id: uuid } });
            if (data_remocao != null) {
                res.status(400).send();
            } else {
                const ponto = await Ponto.update({ data_remocao: new Date }, { where: { id: uuid } })
                if (ponto) {
                    res.status(204).send();
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async listar(req, res) {
        const { cliente_id, endereco_id } = req.query;
        try {
            const ponto = await Ponto.findOne({
                where: { cliente_id, endereco_id }
            })
            const cliente = await Cliente.findOne({
                where: { id: cliente_id }
            })
            const endereco = await Endereco.findOne({
                where: { id: endereco_id }
            })

            const jsonPreparado = {
                'id': ponto.id,
                'cliente_id': ponto.cliente_id,
                'cliente_nome': cliente.nome,
                'cliente_tipo': cliente.tipo,
                'endereco_id': ponto.endereco_id,
                'endereco_logradouro': endereco.logradouro,
                'endereco_bairro': endereco.bairro,
                'endereco_numero': endereco.numero,
            }

            if (ponto) {
                res.status(200).json({ dados: jsonPreparado });
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new PontosController();