var fs = require('fs');
function make_error(err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
}

function send_success(res, data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + "\n");
}

function send_failure(res, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(code, { "Content-Type" : "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}

function invalid_resource() {
    return make_error("invalid_resource",
        "the requested resource does not exist.");
}

exports.four_oh_four = function(req, res) {
    console.log("Exiting via four_oh_four");
    res.writeHead(404, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(invalid_resource()) + "\n");
}



exports.sendResponse = function(paramResponse, paramHeaderCode, paramResponseMessage) {
  console.log("helper")
    paramResponse.writeHead(paramHeaderCode
        ,{ "Content-Type" : "application/json"
            ,"Cache-Control": "no-cache, no-store, must-revalidate"
            ,"Expires": "0"
            ,"Pragma": "no-cache"});
    paramResponse.end(JSON.stringify(paramResponseMessage));
};
