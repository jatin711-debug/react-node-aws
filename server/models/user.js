const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {type: String,trim:true,require:true,max:12,unique:true,index:true,lowercase:true},
    name: {type: String,trim:true,require:true,max:32},
    email: {type: String,trim:true,require:true,unique:true,lowercase:true},
    hashedPassword: {type: String,trim:true,require:true},
    salt:String,
    role:{type: String,default:'Subscriber'},
    reserPassworkLink:{
        data:String,default:' '
    }
},{timestamps:true})

userSchema.virtual('password')
    .set(function(password) {
        this._password = password

        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { 
        return this.password;
     })

userSchema.methods = {

    authenticate: function (plaintext){ 
        return this.encryptPassword(plaintext) === this.hashedPassword;
     },
    encryptPassword: function(password) {
        if(!password) return  '';

        try {
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
        } catch (error) {
            return ' ';
        }
    }, 
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};


module.exports = mongoose.model('User',userSchema);