const { Endereco } = require('../app/models');
const { Op } = require('Sequelize');
class EnderecosController {
    async cadastrar(req, res) {
        const { logradouro, bairro, numero } = req.body;

        try {
            const verificaDuplicidade = await Endereco.count({ where: { logradouro, bairro, numero } })
            if (verificaDuplicidade > 0) {
                const { data_remocao } = await Endereco.findOne({ where: { logradouro, bairro, numero } });
                if (data_remocao == null) {
                    res.status(400).send();
                }

                if (data_remocao != null) {
                    const updateEndereco = await Endereco.update({ data_remocao: null }, { where: { logradouro, bairro, numero } })
                    res.status(201).send();
                }

            } else {
                const endereco = await Endereco.create({ logradouro, bairro, numero });

                if (endereco) {
                    res.status(201).send();
                }
            }
        } catch (e) {
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
                    numero: 100
                },
                attributes: ['logradouro', 'bairro', 'numero']
            });
            res.status(200).json({ dados: endereco });
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async alterar(req, res) {//FINDED BUG FOR INEXISTENT UUID
        const { uuid } = req.params;
        const { logradouro, bairro, numero } = req.body;


        try {
            const verificaSeExisteId = await Endereco.count({ where: { id: uuid } });

            if (verificaSeExisteId == 0) {
                res.status(400).send();
            } else {
                const endereco = await Endereco.update({ logradouro, bairro, numero }, { where: { id: uuid } });
                if (endereco) {
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
            const endereco = await Endereco.findByPk(uuid, {
                attributes: ['logradouro', 'bairro', 'numero']
            });
            if (endereco) {
                res.status(200).json(endereco);
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const endereco = await Endereco.update({ data_remocao: new Date }, { where: { id: uuid } })
            if (endereco) {
                res.status(204).send();
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new EnderecosController();