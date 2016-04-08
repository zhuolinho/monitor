// flightplan.js
var plan = require('flightplan');

// configuration
// plan.target('staging', {
//   host: 'staging.example.com',
//   username: 'pstadler',
//   agent: process.env.SSH_AUTH_SOCK
// });

plan.target('production', [
  {
    host: '139.196.18.222',
    username: 'webmaster',
    agent: process.env.SSH_AUTH_SOCK
  }
]);

var tmpDir = 'monitor-' + new Date().getTime();

// run commands on localhost
plan.local(function(local) {
  // local.log('Run build');
  // local.exec('gulp build');

  local.hostname();//print local host name;

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: 'webmaster'});
  remote.rm('-rf /tmp/' + tmpDir);
  remote.hostname();//print remote host name;
  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir
                            + ' install ~/' + tmpDir, {user: 'webmaster'});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/monitor', {user: 'webmaster'});
  remote.sudo('pm2 reload monitor', {user: 'webmaster'});
});

// run more commands on localhost afterwards
plan.local(function(local) { /* ... */ });
// ...or on remote hosts
plan.remote(function(remote) { /* ... */ })
