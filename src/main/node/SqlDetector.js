const fs = require("fs")
const path = require("path")
const getFiles = require('node-recursive-directory');

function SqlDetector() {

    this.getTables = async (baseLocation, allowedExtensions) => {
        console.log("reading " + baseLocation);

        if(typeof allowedExtensions === "undefined"){
            throw new Error("allowedExtensions is required")
        }

        const files = await getFiles(baseLocation, true);
        var tablesByFlie = {};
        for (var fileInfo of files) {

            if(allowedExtensions.includes(path.extname(fileInfo.fullpath)) === false) continue;
            
            var fileName = path.basename(fileInfo.fullpath);
            var fileContent = await fs.promises.readFile(fileInfo.fullpath, { encoding: 'utf-8' })
            var tables = [];
        
            var array = fileContent.match(/FROM\s+[\.\w]+\s+/gi);
            if(array) tables = tables.concat(array.map(string => string.trim().replace(/^FROM\s+/i, "")));

            array = fileContent.match(/(INNER|LEFT|RIGHT|FULL)\s+JOIN\s+[\.\w_]+\s+/gi);
            if(array) tables = tables.concat(array.map(string => string.trim().replace(/(INNER|LEFT|RIGHT|FULL)\s+JOIN\s+/i, "")));              
        
            array = fileContent.match(/INSERT\s+INTO\s+[\.\w_]+\s*\(/gi);
            if(array) tables = tables.concat(array.map(string => string.trim().replace(/INSERT\s+INTO\s+/i, "").replace("(","").trim()));

            array = fileContent.match(/UPDATE\s+[\.\w_]+\s+SET\(/gi);
            if(array) tables = tables.concat(array.map(string => string.trim().replace(/UPDATE/i, "").replace(/SET/i,"").trim()));            

            array = fileContent.match(/EXECUTE\s+PROCEDURE\s+[\.\w_]+\s*\(/gi);
            if(array) tables = tables.concat(array.map(string => string.trim().replace(/EXECUTE/i, "").replace(/PROCEDURE/i, "").replace("(","").trim()));

            tables = tables.filter(function (value, index, array) { 
                return array.indexOf(value) === index;
            });
              

            tablesByFlie[fileName] = tables;
        }

        return tablesByFlie;
    }

}

module.exports = SqlDetector;