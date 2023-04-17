const include = require('nodejs-require-enhancer').include;
const SqlDetector = include('/src/main/node/SqlDetector.js');
const DataGraphPreparer = include('/src/main/node/DataGraphPreparer.js');
const DashboardExporter = include('/src/main/node/DashboardExporter.js');


(async function() {

    if(typeof process.env.folder_absolute_location_to_scan === 'undefined'){
        console.log("folder_absolute_location_to_scan is required");
        return;
    }

    if(typeof process.env.dashboard_type === 'undefined'){
        console.log("dashboard_type is required");
        return;
    }
    
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(process.env.folder_absolute_location_to_scan, [".asp"]);
    console.log(tablesByFile);
    var dataGraphPreparer = new DataGraphPreparer();
    var dashboardExporter = new DashboardExporter();

    var dashboardType = process.env.dashboard_type;
    
    if(dashboardType=="d3js"){
        var data = await dataGraphPreparer.getDataForD3Js(tablesByFile);
        var exportLocation = await dashboardExporter.exportD3JsHtmlDashboard(data, process.env.json_mode);
        console.log("static dashboard : "+exportLocation);
    }else if(dashboardType=="viz-network"){
        var data = await dataGraphPreparer.getDataForVizNetwork(tablesByFile);
        var exportLocation = await dashboardExporter.exportVizNetworkHtmlDashboard(data, process.env.json_mode);
        console.log("static dashboard : "+exportLocation);
    }else if(dashboardType=="xlsx"){
        var data = await dataGraphPreparer.getDataForExcel(tablesByFile);
        var exportLocation = await dashboardExporter.exportExcelReport(data);
        console.log("xlsx report : "+exportLocation);
    }
})();