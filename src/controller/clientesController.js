const { Cliente } = require('../app/models');
const { Op } = require('Sequelize');

class ClientesController {
    async cadastrar(req, res) {
        const { nome, tipo } = req.body;

        try {
            const verificaDuplicidade = await Cliente.count({ where: { nome } });

            if (verificaDuplicidade > 0) {
                const { data_remocao } = await Cliente.findOne({ where: { nome } });

                if (data_remocao == null) {
                    res.status(400).send();
                }

                if (data_remocao != null) {
                    const updateCliente = await Cliente.update({ data_remocao: null }, { where: { nome } })
                    res.status(201).send();
                }

            } else {
                const cliente = await Cliente.create({ nome, tipo });
                if (cliente) {
                    res.status(201).send();
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async listar(req, res) {
        const { nome, tipo } = req.query;
        try {
            const cliente = await Cliente.findAll({
                where: {
                    nome: {
                        [Op.like]: '%' + nome + '%'
                    },
                    tipo

                },
                attributes: ['nome', 'tipo']
            });

            if (cliente) {

                res.status(200).json({ dados: cliente });
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async alterar(req, res) {

        const { uuid } = req.params;
        const { nome, tipo } = req.body;

        try {
            const verificaSeExisteId = await Cliente.count({ where: { id: uuid } });

            if (verificaSeExisteId == 0) {
                res.status(400).send();
            } else {
                const cliente = await Cliente.update({ nome, tipo }, { where: { id: uuid } });
                if (cliente) {
                    res.status(204).send();
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async buscar(req, res) {
        const { uuid } = req.params;

        try {
            const cliente = await Cliente.findByPk(uuid, { attributes: ['nome', 'tipo'] });
            if (cliente) {
                res.status(200).json(cliente);
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const verificaSeExisteId = await Cliente.count({ where: { id: uuid } });

            if (verificaSeExisteId == 0) {
                res.status(400).send();
            }
            const cliente = await Cliente.update({ data_remocao: new Date }, { where: { id: uuid } })
            if (cliente) {
                res.status(204).send();
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new ClientesController();