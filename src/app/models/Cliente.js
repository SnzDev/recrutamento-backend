module.exports = (sequelize, DataTypes) => {

    const Cliente = sequelize.define('Cliente', {
        nome: DataTypes.STRING,
        tipo: DataTypes.ENUM('juridico', 'fisico', 'especial'),
        data_remocao: DataTypes.DATE,

    }, { tableName: 't_cliente' });

    Cliente.associate = function (models) {
        Cliente.belongsToMany(models.Endereco, { through: models.Ponto });
        Cliente.hasMany(models.Ponto);
    };

    return Cliente;
}