module.exports = (sequelize, DataTypes) => {

    const Cliente = sequelize.define('Cliente', {
        nome: DataTypes.STRING,
        tipo: DataTypes.ENUM('juridico','fisico','especial'),
        data_atualizacao: DataTypes.DATE,
        data_remocao: DataTypes.DATE,
        
    },{tableName:'t_cliente'});

    return Cliente;
}