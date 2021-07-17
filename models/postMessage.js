import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    selectedFile: String,
    tags: [String],
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = new mongoose.model('PostMessage', postMessageSchema);

export default PostMessage;
