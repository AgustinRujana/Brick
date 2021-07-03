import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const collectionContent = 'content';
const collectionUsers = 'user';

//////////////////////////////////
//            Schemas           //
//////////////////////////////////

const contentDetailSchema = mongoose.Schema({
    imgPreview: Array,
    description: String,
    pdfPreview: String
})

const contentSchema = mongoose.Schema({
    packName: String,
    avatar: String,
    type: String,
    categorie: String,
    tags: Array,
    details: contentDetailSchema,
    zipSrc: String
})

const emailSchema = mongoose.Schema({
    email: String,
    verified: Boolean
})

const userSchema = mongoose.Schema({
    email: emailSchema,
    firstname: String,
    lastname: String,
    avatar: String,
    password: String,
    phone: Number,
    country: String,
    plan: Number
})

//////////////////////////////////
//            Methods           //
//////////////////////////////////

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export const content = mongoose.model(collectionContent, contentSchema, 'content');
export const user = mongoose.model(collectionUsers, userSchema, 'user')

