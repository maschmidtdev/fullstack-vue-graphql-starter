const bcrypt = require('bcrypt')

module.exports = {
  Query: {
    getUser: async (_, { username }, { User }) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error('User doesnt exist!');
      }
      return user;
    },
    getUsers: async (_, __, { User }) => {
      const users = await User.find();
      if (!users) {
        throw new Error('Users dont exist!');
      }
      return users;
    },
    getPosts: async (_, __, { Post }) => {
      const posts = await Post.find({}).sort({ createdDate: 'desc' }).populate({
        path: 'createdBy',
        model: 'User',
      });
      return posts;
    },
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId,
      }).save();
      return newPost;
    },
    signinUser: async(_, {username, password}, {User}) => {
      const user = await User.findOne({username})
      if(!user){
        throw new Error('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if(!isValidPassword){
        throw new Error("Invalid password")
      }
      return user
    },
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username: username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return newUser;
    },
  },
};
