import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: String,
    lastName: String,
    country: String,
    city: String,
    address: String,
    postalCode: Number,
    profileImageUrl: String,
    credits: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    lastLoginLocation: String,
    lastLoginAt: Date,
    verified: {
      type: Boolean,
      default: false,
    },
    onBoarded: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: String,
    emailVerificationExpiry: Date,
    passwordResetCode: String,
    passwordResetExpiry: Date,
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// auto hash password
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// compare password
authSchema.methods.comparePassword = async function (authPassword) {
  return await bcrypt.compare(authPassword, this.password);
};

// generate token
authSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
