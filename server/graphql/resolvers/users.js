const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {GraphQLError} = require('graphql')
const {validateRegisterInput,validateLoginInput} = require('../../utils/validators')
const User = require("../../models/User");

function generateTokn (user){
    const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return token;
}
module.exports = {
  Query:{
    async getUsers(){
      try{ 
        const users = User.find().sort({createdAt : -1})
        return users
       } catch(e){
           throw new Error(e)
       }
    }
  },
  Mutation: {
    async login(_, {username,password}){
        const {valid , errors} = validateLoginInput(username,password)
        if(!valid){
            throw new GraphQLError('Errors',{extensions : errors})
        }
        const user = await User.findOne({username})
        if(!user){
            errors.general = "User Not Found";
            throw new GraphQLError('User Fot Found',{extensions : errors})
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            errors.general = "Wrong Credentials";
            throw new GraphQLError('Wrong Credentials',{extensions : errors})
        }
        const token = generateTokn (user);
        return {
            ...user._doc,
            id: user._id,
            token,
          };
    },
    async register(
      _,
      {username, email, password},
      context,
      info
    ) {
    // validate user data
    const {valid , errors} = validateRegisterInput(username, email, password)
    if(!valid){
        throw new GraphQLError('Errors',{extensions : errors})
    }
    // Make sure user doesn't already exists
    const user = await User.findOne({username })
    if(user){
        throw new GraphQLError('Username is taken',{
          extensions :{
            errors: {
              username : `This username ${username} is taken`
          }
          } 
        })
    }
      // Creating Password Hash started
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateTokn (res);
      // creating password hash ended
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
