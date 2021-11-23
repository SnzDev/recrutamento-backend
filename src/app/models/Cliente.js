module.exports = (sequelize, DataTypes) => {

    const Cliente = sequelize.define('Cliente', {
        nome: DataTypes.STRING,
        tipo: DataTypes.ENUM('juridico','fisico','especial'),
        data_remocao: DataTypes.DATE,
        
    },{tableName:'t_cliente'});

    return Cliente;
}