const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

User.hasMany(Blogpost, {
  foreignKey: 'userId',
  //onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  //onDelete: 'CASCADE'
});

Blogpost.belongsTo(User, {
  foreignKey: 'userId',
})

Blogpost.hasMany(Comment, {
  foreignKey: 'postId',
})

Comment.belongsTo(User, {
  foreignKey: 'userId'
})

Comment.belongsTo(Blogpost, {
  foreignKey: 'postId'
})

module.exports = { User, Blogpost, Comment };