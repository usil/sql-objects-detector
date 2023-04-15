const include = require('nodejs-require-enhancer').include;
const SqlDetector = include('/src/main/node/SqlDetector.js');
const DataGraphPreparer = include('/src/main/node/DataGraphPreparer.js');
const DashboardExporter = include('/src/main/node/DashboardExporter.js');


(async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(process.env.FOLDER_ABSOLUTE_LOCATION_TO_SCAN, [".asp"]);
    console.log(tablesByFile);
    var dataGraphPreparer = new DataGraphPreparer();
    var nodesAndEdges = await dataGraphPreparer.getDataForVizNetwork(tablesByFile);
    var dashboardExporter = new DashboardExporter();
    var exportLocation = await dashboardExporter.exportVizNetworkHtmlDashboard(nodesAndEdges.nodes, nodesAndEdges.edges);
    console.log("static dashboard : "+exportLocation);
})();


