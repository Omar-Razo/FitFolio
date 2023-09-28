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
    calories: {
        type: DataTypes.INTEGER,
        defaultValue: '0',
        allowNull: true,
    },
    steps: {
        type: DataTypes.INTEGER,
        defaultValue: '0',
        allowNull: true,
    },
    activity_minutes: {
        type: DataTypes.INTEGER,
        defaultValue: '0',
        allowNull: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        defaultValue: '0',
        allowNull: true,
    },
    date_created: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
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