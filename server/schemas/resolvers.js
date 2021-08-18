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
        
      // adding POI 
      addPOI: async (parent, { placeId, name, img, business_status, rating, vicinity}) => {
        try {
          //creating POI using provided info 
          const place = await POI.create({placeId, name, img, business_status, rating, vicinity});
          return {place}   
        } catch (err) {
          console.log('POI error', err)
        }
      },
        
      // save POI and add to user
      savePOI: async(parent, { POIToSave }, context) => {
        // user is logged in
        if (context.user) {
          try {
            // find and update user matching logged in user id
            const user = await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet: { savedPOIs: POIToSave}},
              { new: true } 
            );
            //return updated user
            return user
          } catch (err) {
            console.log ('Saved POI error', err)
          }
        }
      },

      //delete POI from user
      removePOI: async(parent, {placeId}, context) => {
        //user is logged in
        if (context.user) {
          try {
            //find and update user matching logged in user id
            const user = await User.findOneAndUpdate(
              {_id: context.user._id},
              {$pull: {savedPOIs: {placeId: placeId}}},
              {new: true}
              );
              //return updated POI
              return user
            } catch (err) {
              console.log('Remove POI error', err)
            }
          }
        // user is not logged in
        throw new AuthenticationError('Please log in');        
        },
    },
  };
  
  module.exports = resolvers;
