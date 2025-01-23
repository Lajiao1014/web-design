import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
    'PANERAl',
    'root',
    '12345678',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    });
//customer
const customer = sequelize.define('customer', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Details Customer
    detailTitle: {
        type: DataTypes.STRING,
    },
    detailFirstName: {
        type: DataTypes.STRING,
    },
    detailLastName: {
        type: DataTypes.STRING,
    }
});



sequelize.sync({ alter: true })
    .then(() => console.log('資料表已同步'))
    .catch(err => console.error('同步失敗:', err));

export { sequelize, customer };

