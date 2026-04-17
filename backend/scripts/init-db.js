const sequelize = require('../config/database');
const User = require('../models/User');

// 初始化数据库
const initDatabase = async () => {
  try {
    // 同步所有模型
    await sequelize.sync({
      force: true // 强制重建表
    });
    console.log('数据库同步成功');

    // 插入初始用户数据
    const users = [
      {
        username: 'admin',
        password: '20031006lol', // 实际项目中应该使用加密的密码
        role: 'admin'
      },
      {
        username: 'user',
        password: '123',
        role: 'user'
      }
    ];

    for (const user of users) {
      await User.create(user);
      console.log(`用户 ${user.username} 创建成功`);
    }

    console.log('初始化数据插入成功');
  } catch (error) {
    console.error('初始化数据库失败:', error);
  } finally {
    // 关闭数据库连接
    await sequelize.close();
  }
};

initDatabase();