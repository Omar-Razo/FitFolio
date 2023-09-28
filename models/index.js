const User = require('./User');
const Activity = require('./Activity');
const DailyLog = require('./DailyLog');

User.hasMany(Activity, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasOne(DailyLog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Activity.belongsTo(User, {
    foreignKey: 'user_id'
});

DailyLog.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Activity , DailyLog };
