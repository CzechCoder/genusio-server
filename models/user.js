const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    referral: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    firma: {
      type: String,
      required: true,
    },

    firmaWeb: {
      type: String,
      required: false,
      default: null,
    },

    firmaPozice: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    telefon: {
      type: String,
      required: true,
    },

    linkedin: {
      type: String,
      required: true,
    },

    budovatel: {
      type: Number,
      required: true,
    },

    duvodyy: {
      type: Array,
      required: true,
    },

    temaHlavni: {
      type: String,
      required: true,
    },

    temaDalsi: {
      type: String,
      required: false,
      default: null,
    },

    vzkaz: {
      type: String,
      required: false,
      default: null,
    },

    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,

    resetToken: String,
    expireToken: Date,

    gdprSouhlas: {
      type: Number,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },

    isPaying: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// virtual field
userSchema.virtual("password").set(function (password) {
  // create temp var _password
  this._password = password;
  // generate timestamp

  this.salt = uuidv1();
  // encrypt
  this.hashedPassword = this.encryptPassword(password);
});

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHash("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
};

module.exports = mongoose.model("User", userSchema);
