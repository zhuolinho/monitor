
module.exports = function dispatcher(){

var fs = require('fs');
var q = require('q');
var path = require('path');

var  all_modules = {};

  console.log('\n\DISPATCHER: UP ...');

  var modules_path = path.resolve (__dirname, '..');
  var reader = fs.readdirSync;

  reader(modules_path).forEach(function(module) {

    var avoid = "dispatcher";
     if(!module.split('.')[1] && module != avoid){
      var file_path = modules_path +'/'+ module +'/' + module + '.module';
          try {
             all_modules[module] = require(file_path);
          } catch (e) {
            //  console.log("DISPATCHER:---not found---",module);
            throw(e);
          } finally {
          }
      }
  });

  function handler(m) {
  //  console.log("dispatcher: handler",m);
    if(!m['op']) {
      console.log('no operation specified');
      return q.reject({
        ns: '',
        pl: null,
        er: {ec: null, em: 'DISPATCHER: no such operations'}
      });
    }
    // turn failed promises into messages
    return all_modules[m.ns][m.op](m).fail(function(err) {
      console.log('DISPATCHER:  routing failed: ', m.op, err);
      return q.reject({
        ns: m.ns,
        pl: null,
        er: {ec: null, em: err + ' for message: ' + m}
      });
    });

  }

var modules_initialization_promises = [];

for (var module_name in all_modules) {
  if (all_modules.hasOwnProperty(module_name)) {
    var current_module = all_modules[module_name];
    // console.log("current_module--",current_module);
    if(current_module.init instanceof Function) {
      var init_message = {
        'op': 'init',
        'ns' : module_name,
        'pl': {}
        }

        // console.log('\nDISPATCHER: initiating ' + module_name);
        //p = current_module.init(init_message);
        p = handler(init_message);
        modules_initialization_promises.push(p);
      }
  }
}


return q.all(modules_initialization_promises)
          .then(function(r) {

            console.log('DISPATCHER: DONE! ');
            return q({pl:{fn:handler},er:null});

          }).fail(function(r){
            console.log('DISPATCHER:  FAIL!  ' + r);
            return q({pl:null, er:{ec:null, em:r}})
          });
}
