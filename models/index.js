const User = require('./User');
const Activity = require('./Activity');
const Profile = require('./Profile')

User.hasMany(Activity, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Activity.belongsTo(User, {
    foreignKey: 'user_id'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Activity , Profile };
