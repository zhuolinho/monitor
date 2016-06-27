// flightplan.js
var plan = require('flightplan');

var user = 'webmaster';
var host = '139.196.18.222';



// configuration
plan.target('production', [
  {
    host: host,
    username: user,
    agent: process.env.SSH_AUTH_SOCK
  }
]);


// run commands on localhost
plan.local(function(local) {
  // local.log('Run build');
  // local.exec('gulp');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, '~/monitor');
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.sudo('pm2 reload monitor', {user: user});
});
