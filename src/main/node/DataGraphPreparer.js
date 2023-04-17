const fs = require("fs")
const path = require("path")


function DataGraphPreparer() {

    this.getDataForVizNetwork = async (tablesByFlie) => {

        if(typeof tablesByFlie === "undefined"){
            throw new Error("tablesByFlie is required")
        }

        var nodes = [];
        var edges = [];
        var count = 1;
        for(file in tablesByFlie){
            // positionsById[file] = count;
            nodes.push({id: count, label: file});
            var currentPosition = count;
            count++;
            for(item of tablesByFlie[file]){
                // positionsById[item] = count;
                nodes.push({id: count, label: item});
                edges.push({from: currentPosition, to: count});
                count++;
            }    
        }
        return {nodes, edges}
    }

    this.getDataForD3Js = async (tablesByFile) => {

        if(typeof tablesByFile === "undefined"){
            throw new Error("tablesByFile is required")
        }

        var nodes = [];
        var links = [];
        var count = 0;
        for(file in tablesByFile){
            nodes.push({position: count, name: file, group:1, class:"source-code"});
            var currentPosition = count;
            count++;
            for(item of tablesByFile[file]){
                nodes.push({position: count, name: item, group:1, class:"sql-object"});
                links.push({source: currentPosition, target: count, "value": 1,"type": "depends"});
                count++;
            }    
        }
        return {nodes, links}
    } 
    
    this.getDataForExcel = async (tablesByFile) => {

        if(typeof tablesByFile === "undefined"){
            throw new Error("tablesByFile is required")
        }

        var rows = [];
        for(file in tablesByFile){
            var newRow = {file_name: file};
            for(item of tablesByFile[file]){
                rows.push({file_name: file, sql_object: item});
            }
        }
        return rows;
    } 
}

module.exports = DataGraphPreparer;