import mongoose from 'mongoose';

const collectionContent = 'content';
const collectionUsers = 'user';

//////////////////////////////////
//            Schemas           //
//////////////////////////////////

const contentDetailSchema = mongoose.Schema({
    imgPreview: Array,
    description: String,
    pdfPreview: String,
})

const contentSchema = mongoose.Schema({
    packName: String,
    thumbnail: String,
    type: String,
    categorie: String,
    tags: Array,
    details: contentDetailSchema,
})

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    surname: String,
    avatar: String,
    password: String,
    plan: Number,
})

//////////////////////////////////

export const content = mongoose.model(collectionContent, contentSchema);
export const user = mongoose.model(collectionUsers, userSchema)

