var bcrypt = require('bcrypt-nodejs');

var text;
var targetVal = '';
process.argv.forEach(function(val, index, array){

  console.log("val----", val);
  targetVals = val.split('=');
  if (targetVals[0] === 'pw') {
    console.log("targetVals----", targetVals);
    text = targetVals[1];
  }
})


bcrypt.genSalt(10, function (err, salt) {
    if (err) {
         throw(err);
    }

    bcrypt.hash(text, null,null, function (err, hash) {
        if (err) {
             throw(err);
        }

        console.log('hash---', hash)
    });
});
