const { Contrato } = require('../app/models');
const { Historico } = require('../app/models');

class HistoricoController {

    async mudarParaEmVigor(req, res) {
        const { uuid } = req.params;
        const estado_posterior = 'Em vigor';
        try {
            const verificaEstadoAtual = await Contrato.findByPk(uuid);
            if (verificaEstadoAtual.estado == 'Desativado Temporario') {
                const estado_anterior = verificaEstadoAtual.estado;
                const mudaEstadoContrato = await Contrato.update({ estado: estado_posterior }, {
                    where: { id: uuid }
                })
                const gravarHistorico = await Historico.create({ estado_anterior, contrato_id: uuid, estado_posterior })
                if (gravarHistorico) {
                    res.status(200).send()
                }
            } else {
                res.status(400).send()

            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async mudarParaDesativadoTemporario(req, res) {

        const { uuid } = req.params;
        const estado_posterior = 'Desativado Temporario';

        try {
            const verificaEstadoAtual = await Contrato.findByPk(uuid);
            if (verificaEstadoAtual.estado == 'Em vigor' || verificaEstadoAtual.estado == 'Cancelado') {
                const estado_anterior = verificaEstadoAtual.estado;
                const mudaEstadoContrato = await Contrato.update({ estado: estado_posterior }, {
                    where: { id: uuid }
                })
                const gravarHistorico = await Historico.create({ estado_anterior, contrato_id: uuid, estado_posterior })
                if (gravarHistorico) {
                    res.status(200).send()
                }
            } else {
                res.status(400).send()

            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async mudarParaCancelado(req, res) {

        const { uuid } = req.params;
        const estado_posterior = 'Cancelado';
        try {
            const verificaEstadoAtual = await Contrato.findByPk(uuid);
            if (verificaEstadoAtual.estado == 'Desativado Temporario') {
                const estado_anterior = verificaEstadoAtual.estado;
                const mudaEstadoContrato = await Contrato.update({ estado: estado_posterior }, {
                    where: { id: uuid }
                })
                const gravarHistorico = await Historico.create({ estado_anterior, contrato_id: uuid, estado_posterior })
                if (gravarHistorico) {
                    res.status(200).send()
                }
            } else {
                res.status(400).send()

            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send();
        }

    }

    async buscarHistorico(req, res) {
        const { uuid } = req.params;

        try {
            const historico = await Historico.findAll({
                where: { contrato_id: uuid },
                attributes: ['id', ['data_criacao', 'data_evento'], ['estado_anterior', 'estado_antigo'], ['estado_posterior', 'estado_novo']]
            })

            res.status(200).json({
                dados: historico
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}

module.exports = new HistoricoController();