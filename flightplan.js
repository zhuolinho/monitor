//  rsync -va . webmaster@112.74.53.129:~/monitor

var plan = require("flightplan");

var appName = "monitor";
var username = "webmaster";

// configuration
plan.target("production", {
  host: "112.74.53.129", //ip or domain name
  username: username,
  agent: process.env.SSH_AUTH_SOCK
});

var tmpDir = appName + "-" + new Date().getTime();

// run commands on localhost
plan.local(function(local) {
  local.log("Run build");
  // local.exec('gulp build');

  local.log("Copy files to remote hosts");
  var filesToCopy = local.exec("git ls-files", {
    exec: { maxBuffer: 10000 * 1024 }
  });
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, "/tmp/" + tmpDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log("Move folder to web root");
  remote.exec("source ~/.bashrc", { user: username }); // reload evn variables

  remote.sudo("cp -R /tmp/" + tmpDir + " ~", { user: username });
  remote.rm("-rf /tmp/" + tmpDir);

  remote.log("Install dependencies");
  // remote.sudo('npm --production --prefix ~/' + tmpDir
  // + ' install ~/' + tmpDir, {user: username});

  remote.log("Reload application");
  remote.sudo("ln -snf ~/" + tmpDir + " ~/" + appName, { user: username });
  remote.sudo("pm2 reload --cron 30 * * * * *" + appName, { user: username });
  remote.sudo("pm2 logs " + appName, { user: username });
});
