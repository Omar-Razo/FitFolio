const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        len: [8],
        },
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isGender(val) {
                if(!['male', 'Male', 'female', 'Female'].includes(val)) {
                    throw new Error('Gender must be Male or Female');
                }
            } 
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false
    }
    },
    { 
    hooks: {
        beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    }
);

// Calculate BMI
User.prototype.calculateBMI = function() {
    const bmi = this.weight / (this.height ** 2) * 703;
    return bmi;
  }
  
  // Calculate BMR 
  User.prototype.calculateBMR = function() {
    const bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
    return bmr;
  };

module.exports = User;