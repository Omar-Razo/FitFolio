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

// DailyLog.hasMany(Activity, {
//     foreignKey: 'date_created',
//     onDelete: 'CASCADE'
// })

Activity.belongsTo(User, {
    foreignKey: 'user_id'
});

DailyLog.belongsTo(User, {
    foreignKey: 'user_id'
})

// Activity.hasOne(DailyLog, {
//     foreignKey: 'date_created',
//     onDelete: 'CASCADE'
// })

module.exports = { User, Activity , DailyLog };
