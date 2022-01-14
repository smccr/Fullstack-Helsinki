const Blog = require('./blog');
const User = require('./user')

Blog.sync({ alter: true });
User.sync({ alter: true });

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = {
  Blog, User
};