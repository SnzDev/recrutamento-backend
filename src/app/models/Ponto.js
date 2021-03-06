module.exports = (sequelize, DataTypes) => {
    const Ponto = sequelize.define('Ponto', {
        cliente_id: DataTypes.UUID,
        endereco_id: DataTypes.UUID,
        data_remocao: DataTypes.DATE,
    }, {
        tableName: 't_ponto'
    });

    Ponto.associate = function (models) {
        Ponto.belongsTo(models.Cliente);
        Ponto.belongsTo(models.Endereco);

}


return Ponto;
}