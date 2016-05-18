var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


// set up a mongoose model
var UserSchema = new Schema({
  ll:{  //last login
    type:Date,
    default:new Date()
  },
  an:{ //account Number
    type:Number,
    required:true,
    unique:true
  },
  name: {
        type: String,
        required: true
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  pw: {
        type: String,
        required: true
    },
    addr:{
      type:String,
      default:'----'
    },
    ap:{   //access priviledge
      type:Number,
      default:8    //driver
    },
    sex:{  //0 male, 1 female
      type:Number,
      default:0
    },
    anc:{  //alert notification access
      la:{type:Boolean, default:false},   //leakage alert  泄漏报警
      sa:{type:Boolean, default:false},   //shipment alert 配送短信
      sca:{type:Boolean, default:false}, //shipment complete alert 送达短信
      sia:{type:Boolean, default:false}, //signal interruption alert 信号中断
    }
},
{timestamps:true});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('pw') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.pw, null,null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.pw = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.pw, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
