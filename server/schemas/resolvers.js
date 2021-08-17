const { AuthenticationError } = require('apollo-server-express');
const { POI, User} = require('../models')
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      // get logged in user info
      me: async (parent, args, context) => {
        // user is logged in
        if (context.user) {
          try {
            // find a user matching logged in user id and return user
            const user = await User.findOne({ _id: context.user._id });
            return user;
          } catch (err) {
            console.log('Unable to find user data', err);
          }
        }
  
        // user is not logged in
        throw new AuthenticationError('Please log in');
      },
    },
  
    Mutation: {
      // login using provided info
      login: async (parent, { email, password }) => {
        try {
          // find a user matching provided email
          const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('No user associated with this email address');
          }
          // check if password is correct
          const correctPw = await user.isCorrectPassword(password);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password');
          }
          // create token from user and return both
          const token = signToken(user);
          return { token, user };
        } catch (err) {
          console.log('Login error', err)
        }
      },
  
      // create user using provided info
      addUser: async (parent, { username, email, password }) => {
        try {
          // create user using provided username, email, and password
          const user = await User.create({ username, email, password });
          // create token from user and return both
          const token = signToken(user);
          return { token, user };
        } catch (err) {
          console.log('Sign up error', err);
        }
      }, 
    },
  };
  
  module.exports = resolvers;