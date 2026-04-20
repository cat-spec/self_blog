const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 定义用户模型
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'users',
  timestamps: false
});

// 同步模型到数据库
const syncUserModel = async () => {
  try {
    await User.sync();
    console.log('用户表创建成功');
  } catch (error) {
    console.error('用户表创建失败:', error);
  }
};

syncUserModel();

module.exports = User;