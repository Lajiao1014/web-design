import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
import { sessionsData } from './sessionsData';

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
            model: 'sessions',
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

export const initializeSessionsData = async () => {
    try {
        // 確保 ID 從 1 開始並匹配前端
        await sessions.sync({ force: true });
        await sessions.bulkCreate(sessionsData as any);
        console.log('Sessions 數據初始化成功');
    } catch (error) {
        console.error('Sessions 初始化失敗:', error);
    }
};

// 修改同步順序
async function initialize() {
    try {
        await sequelize.sync({ alter: true });
        console.log('資料表已同步');

        // 在資料表同步後再初始化資料
        await initializeSessionsData();
    } catch (err) {
        console.error('初始化失敗:', err);
    }
}

initialize();

export { sequelize, Booking, sessions };

