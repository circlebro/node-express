const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name :{ type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

UserSchema.statics.create = function(payload) {
    const user = new this(payload);
    // return Promise
    return user.save();
}

module.exports = mongoose.model("User", UserSchema);
