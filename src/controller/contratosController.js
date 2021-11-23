class ContratosController {
    async cadastrar(req, res) {
        try {
            res.status(201).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async listar(req, res) {
        try {
            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async buscar(req, res) {
        try {
            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
    async deletar(req, res) {
        try {
            res.status(204).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    }
}