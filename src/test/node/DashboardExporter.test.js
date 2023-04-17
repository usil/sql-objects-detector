const include = require('nodejs-require-enhancer').include;
const path = require('path');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const TestHelper = include('/src/test/node/TestHelper.js');
const DashboardExporter = include('/src/main/node/DashboardExporter.js');

async function checkFileExists(file) {
  try {
    await fs.promises.access(file, fs.constants.F_OK);
    return true
  } catch (err) {
    return false;
  }
}

describe('DashboardExporter: exportVizNetworkHtmlDashboard', function () {

  it('should copy the template and nodes.json & edges.json', async function () {

    var dashboardExporter = new DashboardExporter();
    var exportLocation = await dashboardExporter.exportVizNetworkHtmlDashboard({
      nodes: { a: "b" },
      edges: { c: "d" }
    });
    expect(await checkFileExists(path.join(exportLocation, "index.html"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "edges.json"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "nodes.json"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "main.js"))).to.equal(true);
  });

});


describe('DashboardExporter: exportD3JsHtmlDashboard', function () {

  it('should copy the template and graph.json in detached mode', async function () {

    var dashboardExporter = new DashboardExporter();
    var exportLocation = await dashboardExporter.exportD3JsHtmlDashboard({ a: "b" }, "detached");
    expect(await checkFileExists(path.join(exportLocation, "index.html"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "main.css"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "graph.json"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "vue.js"))).to.equal(true);
  });

  it('should copy the template and graph.json in detached mode as default', async function () {

    var dashboardExporter = new DashboardExporter();
    var exportLocation = await dashboardExporter.exportD3JsHtmlDashboard({ a: "b" });
    expect(await checkFileExists(path.join(exportLocation, "index.html"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "main.css"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "graph.json"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "vue.js"))).to.equal(true);
  });

  it('should copy the template and graph.json in attached mode', async function () {

    var dashboardExporter = new DashboardExporter();
    var exportLocation = await dashboardExporter.exportD3JsHtmlDashboard({ a: "b" }, "attached");
    expect(await checkFileExists(path.join(exportLocation, "index.html"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "main.css"))).to.equal(true);
    expect(await checkFileExists(path.join(exportLocation, "vue.js"))).to.equal(true);

    //validate attached json
    var vueJsFileContent = await fs.promises.readFile(path.join(exportLocation, "vue.js"), "utf8");
    expect(vueJsFileContent.includes('var graph = {"a":"b"};')).to.equal(true);
  });

});


describe('DashboardExporter: exportExcelReport', function () {

  it('should create the excel', async function () {

    var dashboardExporter = new DashboardExporter();

    var array = [];
    array.push({
      username: 'Carakc',
      fullName: 'Crack',
      followingCount: 2655,
      followerCount: 466,
      biography: 'I am new man'
    },
      {
        username: 'mahi',
        fullName: 'Fit',
        followingCount: 3011,
        followerCount: 385,
        biography: 'hello everyone!'
      })

    var reportLocation = await dashboardExporter.exportExcelReport(array);
    expect(await checkFileExists(reportLocation)).to.equal(true);
  });

});