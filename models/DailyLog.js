const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyLog extends Model {}

DailyLog.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    calories_consumed: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    step_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    activity_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date_created: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'user',
        key: 'id',
        },
    },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'dailylog',
    }
)

module.exports = DailyLog;