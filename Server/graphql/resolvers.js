import User from '../mongoose/models/UserModel.js';
import Auction from '../mongoose/models/AuctionModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const resolvers = {
    getUser: async ({ id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw new Error('Failed to fetch user');
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error('Failed to fetch users');
      }
    },
    createUser: async ({ username, email, mobile, password }) => {
      try {
        var CheckAr = await User.findOne({email:email});
        
        if(CheckAr===null)
        {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const hashedPassword = await bcrypt.hash(password, salt);
        
          const user = await User.create({ username, email, mobile, password:hashedPassword });
        
        return user;
        }else{
          throw new Error('User with this email already exists');
        }
        
      } catch (err) {
        throw err;
      }
    },
    loginUser: async ({ email, password }) =>{
      try{
          //var CheckAr = await User.findOne({email:email}).select("username email mobile");

          const CheckAr = await User.findOne({email:email}).select("password");

          const result = await bcrypt.compare(password, CheckAr.password);

          if (result) {

          const user = await User.findOne({email:email}).select('username email mobile');

          const secretKey = "$2b$10$lH5OEFHyklasjfljaskljW/q2C9TquUVc3.zMlsjdflsj6RTwHGLPmhg0FzOxvVjENk7W9k9CG";

          const token = jwt.sign({ sub: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
         
          return { id:user.id,username:user.username, email:user.email,mobile:user.mobile,token:token};

          } else {
              throw new Error('Invalid Username or Password!');
          }


      }catch(err){
        throw err;
      }
      

    },
    PostAnAuction:async ({userid, title, price, comments, postimage}) => {
      try{

        const base64String = postimage;

        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

        const FileName = Math.random()+'.png';

        const filePath = 'uploads/'+FileName;

        const imageBuffer = Buffer.from(base64Data, 'base64');

        fs.writeFile(filePath, imageBuffer, (err) => {
          if (err) {
              console.error('Error writing file:', err);
          } else {
              console.log('File written successfully:', filePath);
          }
      });

      const auct = await Auction.create({userid:userid, title:title, price:price, comments:comments, postimage:FileName});
    
      return {
        userid:userid,
        title:title,
        price:price,
        comments:comments,
        postimage:FileName
      };

    }catch(err)
    {
        throw err;
    }
    },
    getUserAuctions: async () => {
      try {
        const AuctionData = await Auction.find({ userid: '66320f380ab2d0e40f050788' });
        console.log(AuctionData);
        return AuctionData;
      } catch (err) {
        throw new Error('Failed to fetch user');
      }
    },
  };

  export default resolvers;