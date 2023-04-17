//placeholder
var graph = [];

if(typeof graph.nodes === 'undefined' || typeof graph.edges === 'undefined'){

    Promise.all([
    fetch('nodes.json')
        .then(function (res) {
            return res.json();
        }),
    fetch('edges.json')
        .then(function (res) {
            return res.json();
        })
    ])
    .then(function (dataArray) {
        // create an array with nodes
        var nodes = new vis.DataSet(dataArray[0]);

        // create an array with edges
        var edges = new vis.DataSet(dataArray[1]);

        // create a network
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: nodes,
            edges: edges,
        };
        var options = {};
        var network = new vis.Network(container, data, options);
    });

}else{

    // create an array with nodes
    var nodes = new vis.DataSet(graph.nodes);

    // create an array with edges
    var edges = new vis.DataSet(graph.edges);

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {};
    var network = new vis.Network(container, data, options);

}