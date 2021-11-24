module.exports = (sequelize, DataTypes) => {
    const Historico = sequelize.define('Historico', {
        estado_anterior: DataTypes.ENUM('Em vigor','Desativado Temporario','Cancelado'),
        estado_posterior: DataTypes.ENUM('Em vigor','Desativado Temporario','Cancelado'),
        contrato_id: DataTypes.UUID,
    }, 
    {
        tableName: 't_contrato_evento'
    })

    return Historico;
}