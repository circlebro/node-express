const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name :{ type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

UserSchema.statics.create = function(payload) {
    
    const user = this({
        _id: new mongoose.Types.ObjectId(),
        name: payload.name,
        email: payload.email,
        password: payload.password
    });
    
    return user.save();
};


UserSchema.statics.login = function(email) {
    return this.find({ email: email });
};

UserSchema.statics.findEmail = function(email) {
    return this.find({ email: email });
};

module.exports = mongoose.model("User", UserSchema);
