const { Ponto } = require('../app/models');
const { Cliente } = require('../app/models');
const { Endereco } = require('../app/models');

class PontosController {
    async cadastrar(req, res) {
        const { cliente_id, endereco_id } = req.body;

        try {
            const ponto = await Ponto.findOne({ where: { cliente_id, endereco_id } });
            if (!ponto) {

                const cliente = await Cliente.findByPk(cliente_id);
                const endereco = await Endereco.findByPk(endereco_id);

                if (!cliente?.data_remocao && !endereco?.data_remocao) {
                    await Ponto.create({ cliente_id, endereco_id });
                    return res.status(201).send();
                }
                return res.status(400).send();
            }

            await Ponto.update({ data_remocao: null }, { where: { cliente_id, endereco_id } });
            return res.status(201).send();


        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const ponto = await Ponto.findByPk(uuid);

            if (!ponto || ponto.data_remocao != null) {
                return res.status(400).send();
            }

            await Ponto.update({ data_remocao: new Date }, { where: { id: uuid } })
            return res.status(204).send();


        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async listar(req, res) {
        const { cliente_id, endereco_id } = req.query;
        try {
            const ponto = await Ponto.findOne({
                where: { cliente_id, endereco_id },
                include: [Cliente, Endereco],
                raw: true,
            })

            res.json(ponto);
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new PontosController();