const { Sequelize } = require('sequelize');

// 创建数据库连接
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './self_blog.db',
  logging: false
});

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
};

testConnection();

module.exports = sequelize;