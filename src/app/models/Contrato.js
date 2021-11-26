module.exports = (sequelize, DataTypes) => {
    const Contrato = sequelize.define('Contrato', {
        ponto_id: DataTypes.UUID,
        estado: DataTypes.STRING,
        data_remocao: DataTypes.DATE,
    }, { tableName: 't_contrato' });
    

    return Contrato;


}