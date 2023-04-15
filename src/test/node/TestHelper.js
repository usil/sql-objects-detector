const path = require("path");

function TestHelper(){

}

TestHelper.getResource = function(baseModuleLocation){
    var testNodeFolderLocation = path.join(process.env.npm_config_local_prefix,"src","test","node");
    var testResourcesFolderLocation = path.join(process.env.npm_config_local_prefix,"src","test","resources");
    var moduleName = baseModuleLocation.replace(testNodeFolderLocation, "").split(".test.js")[0];
    return path.join(testResourcesFolderLocation, moduleName);
}

module.exports = TestHelper;

