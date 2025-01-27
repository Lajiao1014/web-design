import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

const sequelize = new Sequelize(
    'PANERAl',
    'root',
    '12345678',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    });

interface BookingAttributes {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    mobile: string;
    email: string;
    detailTitle: string;
    detailFirstName: string;
    detailLastName: string;
    userId: number;
    sessionId: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const Booking = sequelize.define<Model<BookingAttributes>>('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sessions',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
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

const sessions = sequelize.define('sessions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quota: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    }
});

// 在模型定義之後，添加關係
Booking.belongsTo(sessions, {
    foreignKey: 'sessionId',
    as: 'session'
});

sessions.hasOne(Booking, {
    foreignKey: 'sessionId',
    as: 'booking'
});

sequelize.sync({ alter: true })
    .then(() => console.log('資料表已同步'))
    .catch(err => console.error('同步失敗:', err));

export { sequelize, Booking, sessions };

