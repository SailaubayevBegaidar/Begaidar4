import mongoose from 'mongoose';

const userModelSchema = new mongoose.Schema({
    userName: {type:String,required:true},
    userEmail: {type:String,required:true,unique:true},
    userPassword: {type:String,required:true,},
    userRole:{type:String,enum:['администратор','пользователь'],default:'пользователь'},
},{timestamps:true})

const UserModel = mongoose.model('UserModel',userModelSchema);
export default UserModel; 