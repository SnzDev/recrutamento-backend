module.exports = (sequelize, DataTypes) => {
    const Ponto = sequelize.define('Ponto', {
        cliente_id: DataTypes.UUID,
        endereco_id: DataTypes.UUID,
        data_remocao: DataTypes.DATE,
    }, {
        tableName: 't_ponto'
    });



    Ponto.associate = function (models) {
        Ponto.hasMany(models.Contrato, { foreignKey: 'id', as: 'contrato' })
    };
    Ponto.associate = function (models) {
        Ponto.belongsTo(models.Endereco, { foreignKey: 'endereco_id', as: 'endereco' })
    };

    Ponto.associate = function (models) {
        Ponto.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' })
    };
    return Ponto;
}