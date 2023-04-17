const fs = require("fs")
const path = require("path");
const uuid = require('uuid');
const xslx = require('xlsx');

function DashboardExporter() {

    this.exportVizNetworkHtmlDashboard = async (graph, jsonMode) => {
        var execId = uuid.v4();
        var templateAboluteLocation = path.join(process.env.npm_config_local_prefix, "src", "main", "resources", "report_templates", "vis-network");
        var exportLocation = path.join(process.env.npm_config_local_prefix, ".export", execId);
        await fs.promises.mkdir(exportLocation, { recursive: true });
        await fs.promises.cp(templateAboluteLocation, exportLocation, { recursive: true })

        if (jsonMode == "attached") {
            var mainFileContent = await fs.promises.readFile(path.join(exportLocation, "main.js"), "utf8");
            var newMainJsContent = mainFileContent.replace(/var\s+graph\s+=\s+\[\]/, "var graph = " + JSON.stringify(graph));
            //update the file
            await fs.promises.writeFile(path.join(exportLocation, "main.js"), newMainJsContent);
        } else if (jsonMode == "detached") {
            await fs.promises.writeFile(path.join(exportLocation, "nodes.json"), JSON.stringify(graph.nodes));
            await fs.promises.writeFile(path.join(exportLocation, "edges.json"), JSON.stringify(graph.edges));
        } else {
            //default is detached
            await fs.promises.writeFile(path.join(exportLocation, "nodes.json"), JSON.stringify(graph.nodes));
            await fs.promises.writeFile(path.join(exportLocation, "edges.json"), JSON.stringify(graph.edges));
        }

        //update the title
        var indexHtmlFileContent = await fs.promises.readFile(path.join(exportLocation, "index.html"), "utf8");
        var newIndexHtmlFileContent = indexHtmlFileContent.replace(/@title/g, process.env.title || "SQL Objects Graph");
        //update the file
        await fs.promises.writeFile(path.join(exportLocation, "index.html"), newIndexHtmlFileContent);

        return exportLocation;
    }

    this.exportD3JsHtmlDashboard = async (graph, jsonMode) => {
        var execId = uuid.v4();
        var templateAboluteLocation = path.join(process.env.npm_config_local_prefix, "src", "main", "resources", "report_templates", "d3js");
        var exportLocation = path.join(process.env.npm_config_local_prefix, ".export", execId);
        await fs.promises.mkdir(exportLocation, { recursive: true });
        await fs.promises.cp(templateAboluteLocation, exportLocation, { recursive: true })

        if (jsonMode == "attached") {
            var vueJsFileContent = await fs.promises.readFile(path.join(exportLocation, "vue.js"), "utf8");
            var newVueJsContent = vueJsFileContent.replace(/var\s+graph\s+=\s+\[\]/, "var graph = " + JSON.stringify(graph));
            //update the file
            await fs.promises.writeFile(path.join(exportLocation, "vue.js"), newVueJsContent);
        } else if (jsonMode == "detached") {
            await fs.promises.writeFile(path.join(exportLocation, "graph.json"), JSON.stringify(graph));
        } else {
            //default is detached
            await fs.promises.writeFile(path.join(exportLocation, "graph.json"), JSON.stringify(graph));
        }

        //update the title
        var indexHtmlFileContent = await fs.promises.readFile(path.join(exportLocation, "index.html"), "utf8");
        var newIndexHtmlFileContent = indexHtmlFileContent.replace(/@title/g, process.env.title || "SQL Objects Graph");
        //update the file
        await fs.promises.writeFile(path.join(exportLocation, "index.html"), newIndexHtmlFileContent);

        return exportLocation;
    }

    this.exportExcelReport = async (rows) => {
        var execId = uuid.v4();
        var exportLocation = path.join(process.env.npm_config_local_prefix, ".export", execId);
        await fs.promises.mkdir(exportLocation, { recursive: true });

        var ws = xslx.utils.json_to_sheet(rows);
        var wb = xslx.utils.book_new();
        var name = process.env.title || "report";
        xslx.utils.book_append_sheet(wb, ws, name);
        xslx.writeFile(wb, path.join(exportLocation, name+".xlsx"));

        return path.join(exportLocation, name+".xlsx");
    }

}

module.exports = DashboardExporter;