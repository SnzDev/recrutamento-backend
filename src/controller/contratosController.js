const { Ponto } = require('../app/models');
const { Contrato } = require('../app/models');
const { Cliente } = require('../app/models');
const { Endereco } = require('../app/models');


class ContratosController {
    async cadastrar(req, res) {
        const { ponto_id } = req.body;
        try {

            const ponto = await Ponto.findOne({ where: { id: ponto_id } });

            if (!ponto || ponto.data_remocao) {
                return res.status(400).send();
            }


            const contrato = await Contrato.findOne({ where: { ponto_id } });

            if (contrato && !contrato.data_remocao) {

                return res.status(400).send();


            }
            if (contrato.data_remocao) {
                await Contrato.update({ data_remocao: null }, { where: { ponto_id } })
                return res.status(201).send();

            }

            Contrato.create({ ponto_id, estado: 'Em vigor' });
            return res.status(201).send();



        } catch (e) {
            console.log(e);
            res.status(400).send();

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
            const contrato = await Contrato.findOne({ where: { ponto_id: ponto.id } });

            const jsonPreparado = {
                "id": contrato.id,
                "cliente_id": ponto.Cliente.id,
                "cliente_nome": ponto.Cliente.nome,
                "cliente_tipo": ponto.Cliente.tipo,
                "endereco_id": ponto.Endereco.id,
                "endereco_logradouro": ponto.Endereco.logradouro,
                "endereco_bairro": ponto.Endereco.bairro,
                "endereco_numero": ponto.Endereco.numero,
            }

            return res.status(200).json({ dados: jsonPreparado });


        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }
    async buscar(req, res) {
        const { uuid } = req.params;
        try {
            const contrato = await Contrato.findOne({ where: { id: uuid } });

            const ponto = await Ponto.findOne({
                where: { id: contrato.ponto_id },
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
                "id": contrato.id,
                "cliente_id": ponto.Cliente.id,
                "cliente_nome": ponto.Cliente.nome,
                "cliente_tipo": ponto.Cliente.tipo,
                "endereco_id": ponto.Endereco.id,
                "endereco_logradouro": ponto.Endereco.logradouro,
                "endereco_bairro": ponto.Endereco.bairro,
                "endereco_numero": ponto.Endereco.numero,
            }

            return res.status(200).json({ dados: jsonPreparado });


        } catch (e) {
            console.log(e);
            return res.status(400).send();
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