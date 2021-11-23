module.exports = (sequelize, DataTypes) => {
    const Contrato = sequelize.define('Contrato', {
        ponto_id: DataTypes.UUID,
        estado: DataTypes.STRING,
        data_remocao: DataTypes.DATE,
    }, { tableName: 't_contrato' });

    Contrato.associate = function (models) {
        Contrato.belongsTo(models.Ponto, { foreignKey: 'ponto_id', as:'ponto'})
    };
    return Contrato;
}