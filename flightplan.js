var plan = require('flightplan');

var appName = 'monitor';
var username = 'webmaster';

// configuration
plan.target('production', [
  {
    host: '139.196.18.222',
    username: username,
    agent: process.env.SSH_AUTH_SOCK
  }
]);
// run commands on localhost
plan.local(function(local) {



  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {exec: {maxBuffer: 10000*1024}});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '~/monitor');
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {


  remote.log('Install dependencies');
  // remote.sudo('cd ~/monitor && npm install --production', {user: username});
  remote.log('Reload application');
  remote.exec('pm2 reload '+appName , {user: username});
  remote.exec('pm2 logs '+appName , {user: username});
});
