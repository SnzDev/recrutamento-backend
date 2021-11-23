const { Cliente } = require('../app/models');
const Sequelize = require('Sequelize')
const Op = Sequelize.Op;

class ClientesController {
    async cadastrar(req, res) {
        const { nome, tipo } = req.body;
        try {
            const cliente = await Cliente.create({ nome, tipo });
            if (cliente) {
                res.status(201).send();
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

                }
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
            const cliente = await Cliente.update({ nome, tipo }, { where: { id: uuid } });
            if (cliente) {
                res.status(204).send();
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async buscar(req, res) {
        const { uuid } = req.params;

        try {
            const cliente = await Cliente.findByPk(uuid);
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