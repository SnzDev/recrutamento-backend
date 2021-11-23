module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        logradouro: DataTypes.STRING,
        bairro: DataTypes.STRING,
        numero: DataTypes.SMALLINT,
        data_remocao: DataTypes.DATE,
    }, {
        tableName: 't_endereco',
    });

    return Endereco;
}