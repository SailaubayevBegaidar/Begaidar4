import mongoose from 'mongoose';

const taskModelSchema = new mongoose.Schema({
    taskName: {type:String,required:true},
    taskContent: {type:String,required:true,unique:true},
    taskState: {type:String,enum:['завершено','не завершено'],default:'не завершено'},
    taskCreateDate:{type:Date},
    authorId:{type:mongoose.Schema.Types.ObjectId,ref:'UserModel',required:true}
},{timestamps:true})

const TaskModel = mongoose.model('TaskModel',taskModelSchema);
export default TaskModel;