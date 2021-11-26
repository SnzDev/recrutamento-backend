const { Ponto } = require('../app/models');
const { Cliente } = require('../app/models');
const { Endereco } = require('../app/models');
const { Contrato } = require('../app/models');


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

            if (!ponto.data_remocao) {
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
            const ponto = await Ponto.findOne({ where: { id: uuid } });

            if (!ponto || ponto.data_remocao) {
                return res.status(400).send();
            }

            const contrato = await Contrato.findOne({ where: { ponto_id: uuid } });

            if (contrato && !contrato.data_remocao) {
                await Contrato.update({ data_remocao: new Date }, { where: { ponto_id: uuid } })
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
                attributes: ['id'],
                include: [{
                    model: Cliente,
                    attributes: { exclude: 'data_remocao' }
                }, {
                    model: Endereco,
                    attributes: { exclude: 'data_remocao' }
                },],
            })
            const jsonPreparado = {
                "id": ponto.id,
                "cliente_id": ponto.Cliente.id,
                "cliente_nome": ponto.Cliente.nome,
                "cliente_tipo": ponto.Cliente.tipo,
                "endereco_id": ponto.Endereco.id,
                "endereco_logradouro": ponto.Endereco.logradouro,
                "endereco_bairro": ponto.Endereco.bairro,
                "endereco_numero": ponto.Endereco.numero,
            }

            res.json({ dados: jsonPreparado });
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new PontosController();