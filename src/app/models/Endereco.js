module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        logradouro: DataTypes.STRING,
        bairro: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        data_remocao: DataTypes.DATE,
    }, {
        tableName: 't_endereco',
    });

    Endereco.associate = function (models) {
        Endereco.belongsTo(models.Endereco, { foreignKey: 'id', as: 'endereco'})
    };

    return Endereco;
}