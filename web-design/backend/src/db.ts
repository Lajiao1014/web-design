import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
import { sessionsData } from './sessionsData';

const sequelize = new Sequelize(
    'lajiao',
    'postgres',
    '12341234',
    {
        host: 'database-1.czuciaio074t.us-east-1.rds.amazonaws.com',
        dialect: 'postgres',
        port: 5432,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
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
    sessionId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const Booking = sequelize.define<Model<BookingAttributes>>('Booking', {
    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sessions',
            key: 'id'
        }
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

Booking.belongsTo(sessions, {
    foreignKey: 'sessionId',
    as: 'session'
});

sessions.hasOne(Booking, {
    foreignKey: 'sessionId',
    as: 'booking'
});

export const initializeSessionsData = async () => {

    try {
        await sessions.sync({ force: true });
        await sessions.bulkCreate(sessionsData as any);
        console.log('Sessions 數據初始化成功');
    } catch (error) {
        console.error('Sessions 初始化失敗:', error);
    }
};


async function initialize() {

    try {
        await sequelize.sync({ alter: true });
        console.log('資料表已同步');


        // await initializeSessionsData();
    } catch (err) {
        console.error('初始化失敗:', err);
    }
}

initialize();

export { sequelize, Booking, sessions };

