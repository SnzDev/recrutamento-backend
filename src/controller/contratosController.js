const { Ponto } = require('../app/models');
const { Contrato } = require('../app/models');
const { Cliente } = require('../app/models');
const { Endereco } = require('../app/models');


class ContratosController {
    async cadastrar(req, res) {
        const { ponto_id } = req.body;
        try {
            const verificaContratoDelete = await Contrato.findOne({
                where: {
                    ponto_id
                }
            });
            console.log(verificaContratoDelete)

            if (verificaContratoDelete.data_remocao != null) {
                const contrato = await Contrato.update({ data_remocao: null }, { where: { ponto_id } })
                if (contrato) {
                    res.status(201).send();
                }
            } else {
                console.log('s')
                const contrato = await Contrato.create({ ponto_id, estado: 'Em vigor' });

                if (contrato) {
                    res.status(201).send();
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
            const contrato = await Contrato.findOne({
                where: { 'ponto_id': ponto.id }
            })
            const cliente = await Cliente.findByPk(cliente_id)
            const endereco = await Endereco.findByPk(endereco_id)

            const jsonPreparado = {
                'id': contrato.id,
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
    async buscar(req, res) {
        const { uuid } = req.params;
        try {

            const contrato = await Contrato.findByPk(uuid);
            const ponto = await Ponto.findByPk(contrato.ponto_id);
            const cliente = await Cliente.findByPk(ponto.cliente_id)
            const endereco = await Endereco.findByPk(ponto.endereco_id)

            const jsonPreparado = {
                'id': contrato.id,
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
    async deletar(req, res) {
        const { uuid } = req.params;

        try {
            const { data_remocao } = await Contrato.findOne({ where: { id: uuid } });
            if (data_remocao != null) {
                res.status(400).send();
            } else {
                const contrato = await Contrato.update({ data_remocao: new Date }, { where: { id: uuid } })
                if (contrato) {
                    res.status(204).send();
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new ContratosController();