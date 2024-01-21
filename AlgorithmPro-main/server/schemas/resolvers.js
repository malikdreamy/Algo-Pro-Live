const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: { 
        async savedFiles(parent, _, context){
               if (context){
      
            const user = await User.findById(context.user._id) 
            //console.log(user)
            return user;
 
         } else {
            throw new AuthenticationError('You need to be logged in!');

            }
         },
         async oneUser(parent,{email},context){
            const user = await User.findOne({_id:context.user._id})
            return user
        }

    },
    Mutation: {
        async updateUsername(parent, {username},context){
            return User.findOneAndUpdate({_id:context.user._id},{username},{new:true})
                    },
        async login(parent, { email, password }) {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('no user found with this email')
            };
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');

            }
            const token = signToken(user);
            return { token, user }
        },
        async addUser(parent, {email, password, username}) { 
            const user = await User.create({
                username: username,
                email: email,
                password: password
            });
            const token = signToken(user);
            return { token, user }
        },
        async saveWork(parent,{solutionData}, context) {
            if(context){       
        
            let filter = {_id: context.user._id }  
          
                const user = await User.findOneAndUpdate(filter,
                    { $push: { savedWork : solutionData}}, 
                    {new: true});
                    return user;

            } else {
                throw new AuthenticationError('You need to be logged in!');
              }

        }, 
        async removeWork(parent,{id}, context) {
             if(context){        
        let workIndexToRemove = context.body.variables.id
            let filter = {_id: context.user._id }  
           const user = await User.findOne(filter)
           const savedWork = user.savedWork
           savedWork.splice(workIndexToRemove, 1)
           user.save()

            } else {
                throw new AuthenticationError('You need to be logged in!');
              }

        } 

    }
}
module.exports = resolvers;