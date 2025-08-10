import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationLinkSent: { type: Boolean, default: false },
  avatarImage: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model('user', userSchema);

const validRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });

  return schema.validate(data);
};

export { User, validRegister, validateLogin };
