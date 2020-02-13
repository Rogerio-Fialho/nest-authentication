import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: [true]
  },

  userRole: {
    type: String,
    required: [true, 'userRole is required.']
  },

  password: {
    type: String,
    required: [true, 'password is required.']
  }

})