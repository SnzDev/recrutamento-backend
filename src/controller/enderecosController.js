const { Endereco } = require('../app/models');
const { Op } = require('Sequelize');
class EnderecosController {
    async cadastrar(req, res) {
        const { logradouro, bairro, numero } = req.body;

        try {
            const endereco = await Endereco.findOne({ where: { logradouro, bairro, numero } })
            if (endereco) {
                if (endereco.data_remocao == null) {
                    return res.status(400).send();
                }
                await Endereco.update({ data_remocao: null }, { where: { logradouro, bairro, numero } })
                return res.status(201).send();
            }

            await Endereco.create({ logradouro, bairro, numero });
            return res.status(201).send();
        }

        catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async listar(req, res) {
        const { logradouro, bairro, numero } = req.query;

        try {
            const endereco = await Endereco.findAll({
                where: {
                    logradouro: {
                        [Op.like]: '%' + logradouro + '%'
                    },
                    bairro: {
                        [Op.like]: '%' + bairro + '%'
                    },
                    numero
                },
                attributes: ['logradouro', 'bairro', 'numero']
            });

            return res.status(200).json({ dados: endereco });

        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async alterar(req, res) {
        const { uuid } = req.params;
        const { logradouro, bairro, numero } = req.body;


        try {
            const endereco = await Endereco.findByPk(uuid);

            if (!endereco) {
                return res.status(400).send();
            }

            await Endereco.update({ logradouro, bairro, numero }, { where: { id: uuid } });
            return res.status(204).send();

        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }

    async buscar(req, res) {
        const { uuid } = req.params;

        try {
            const endereco = await Endereco.findByPk(uuid, { attributes: ['logradouro', 'bairro', 'numero'] });

            if (!endereco) {
                return res.status(400).send();
            }

            return res.status(200).json(endereco);

        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const endereco = await Endereco.findByPk(uuid);

            if (!endereco || endereco.data_remocao != null) {
                return res.status(400).send();
            }

            await Endereco.update({ data_remocao: new Date }, { where: { id: uuid } })
            return res.status(204).send();


        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
}

module.exports = new EnderecosController();