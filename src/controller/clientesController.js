const { Cliente } = require('../app/models');
const { Op } = require('Sequelize');

class ClientesController {
    async cadastrar(req, res) {
        const { nome, tipo } = req.body;

        try {
            const cliente = await Cliente.findOne({ where: { nome } });

            if (cliente) {
                const { data_remocao } = cliente;

                if (data_remocao == null) {
                    return res.status(400).send();
                }

                await Cliente.update({ data_remocao: null }, { where: { nome } })
                return res.status(201).send();

            }

            await Cliente.create({ nome, tipo });
            return res.status(201).send();


        } catch (e) {
            console.log(e);
            return res.status(400).send();
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

            return res.status(200).json({ dados: cliente });

        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async alterar(req, res) {

        const { uuid } = req.params;
        const { nome, tipo } = req.body;

        try {
            const cliente = await Cliente.findByPk(uuid);

            if (!cliente) {
                return res.status(400).send();
            }

            await Cliente.update({ nome, tipo }, { where: { id: uuid } });

            return res.status(204).send();


        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async buscar(req, res) {
        const { uuid } = req.params;

        try {
            const cliente = await Cliente.findByPk(uuid, { attributes: ['nome', 'tipo'] });

            if (!cliente) {
                return res.status(400).send();
            }

            return res.status(200).json(cliente);

        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const cliente = await Cliente.findByPk(uuid);

            if (!cliente || cliente.data_remocao != null) {
                return res.status(400).send();
            }

            await Cliente.update({ data_remocao: new Date }, { where: { id: uuid } })

            return res.status(204).send();


        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
}

module.exports = new ClientesController();