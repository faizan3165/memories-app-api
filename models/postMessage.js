import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: String,
    message: String,
    creator: String,
    selectedFile: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = new mongoose.model('PostMessage', postMessageSchema);

export default PostMessage;
