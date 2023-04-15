const fs = require("fs")
const path = require("path")


function DataGraphPreparer() {

    this.getDataForVizNetwork = async (tablesByFlie) => {

        if(typeof tablesByFlie === "undefined"){
            throw new Error("tablesByFlie is required")
        }

        var nodes = [];
        var edges = [];
        var positionsById = {};
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
}

module.exports = DataGraphPreparer;