const fs = require("fs")
const path = require("path");
const { stringify } = require("querystring");
const uuid = require('uuid');

function DashboardExporter() {

    this.exportVizNetworkHtmlDashboard = async (nodes, edges) => {
        var execId = uuid.v4();
        var templateAboluteLocation = path.join(process.env.npm_config_local_prefix, "src","main","resources","report","vis-network");
        var exportLocation = path.join(process.env.npm_config_local_prefix, ".export", execId);
        await fs.promises.mkdir(exportLocation, { recursive: true });
        await fs.promises.cp(templateAboluteLocation, exportLocation, {recursive: true})
        await fs.promises.writeFile(path.join(exportLocation, "nodes.json"), JSON.stringify(nodes));
        await fs.promises.writeFile(path.join(exportLocation, "edges.json"), JSON.stringify(edges));

        return exportLocation;
    }
}

module.exports = DashboardExporter;