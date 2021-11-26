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
        Endereco.belongsToMany(models.Cliente, { through: models.Ponto })
        Endereco.hasMany(models.Ponto);

    };

    return Endereco;
}