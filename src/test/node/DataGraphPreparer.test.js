const include = require('nodejs-require-enhancer').include;
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const TestHelper = include('/src/test/node/TestHelper.js');
const DataGraphPreparer = include('/src/main/node/DataGraphPreparer.js');

describe('DataGraphPreparer: getDataForVizNetwork', function() {

  it('should generate the nodes and edges', async function() {
    var dataGraphPreparer = new DataGraphPreparer();
    var nodesAndEdges = await dataGraphPreparer.getDataForVizNetwork({
      "file1" : ["a","b","c"],
      "file2" : ["d","e","f"]
    });
    assert(nodesAndEdges);
    expect(nodesAndEdges.nodes.length).to.equal(8);
    expect(nodesAndEdges.edges.length).to.equal(6);
    
    //nodes validation    
    expect(nodesAndEdges.nodes[0].id).to.equal(1);
    expect(nodesAndEdges.nodes[0].label).to.equal("file1");
    expect(nodesAndEdges.nodes[1].id).to.equal(2);
    expect(nodesAndEdges.nodes[1].label).to.equal("a");
    expect(nodesAndEdges.nodes[2].id).to.equal(3);
    expect(nodesAndEdges.nodes[2].label).to.equal("b");    
    expect(nodesAndEdges.nodes[3].id).to.equal(4);
    expect(nodesAndEdges.nodes[3].label).to.equal("c");    
    expect(nodesAndEdges.nodes[4].id).to.equal(5);
    expect(nodesAndEdges.nodes[4].label).to.equal("file2");
    expect(nodesAndEdges.nodes[5].id).to.equal(6);
    expect(nodesAndEdges.nodes[5].label).to.equal("d");    
    expect(nodesAndEdges.nodes[6].id).to.equal(7);
    expect(nodesAndEdges.nodes[6].label).to.equal("e");        
    expect(nodesAndEdges.nodes[7].id).to.equal(8);
    expect(nodesAndEdges.nodes[7].label).to.equal("f");    
    
    //edges validation
    expect(nodesAndEdges.edges[0].from).to.equal(1);
    expect(nodesAndEdges.edges[0].to).to.equal(2);
    expect(nodesAndEdges.edges[1].from).to.equal(1);
    expect(nodesAndEdges.edges[1].to).to.equal(3);    
    expect(nodesAndEdges.edges[2].from).to.equal(1);
    expect(nodesAndEdges.edges[2].to).to.equal(4);    
    expect(nodesAndEdges.edges[3].from).to.equal(5);
    expect(nodesAndEdges.edges[3].to).to.equal(6);
    expect(nodesAndEdges.edges[4].from).to.equal(5);
    expect(nodesAndEdges.edges[4].to).to.equal(7);    
    expect(nodesAndEdges.edges[5].from).to.equal(5);
    expect(nodesAndEdges.edges[5].to).to.equal(8);            

  });      
  
});


describe('DataGraphPreparer: getDataForD3Js', function() {

  it('should generate the nodes and links', async function() {
    var dataGraphPreparer = new DataGraphPreparer();
    var nodesAndLinks = await dataGraphPreparer.getDataForD3Js({
      "file1" : ["a","b","c"],
      "file2" : ["d","e","f"]
    });
    assert(nodesAndLinks);
    
    expect(nodesAndLinks.nodes.length).to.equal(8);
    expect(nodesAndLinks.links.length).to.equal(6);

    //nodes validation    
    expect(nodesAndLinks.nodes[0].position).to.equal(0);
    expect(nodesAndLinks.nodes[0].name).to.equal("file1");
    expect(nodesAndLinks.nodes[0].class).to.equal("source-code");

    expect(nodesAndLinks.nodes[1].position).to.equal(1);
    expect(nodesAndLinks.nodes[1].name).to.equal("a");
    expect(nodesAndLinks.nodes[1].class).to.equal("sql-object");

    expect(nodesAndLinks.nodes[2].position).to.equal(2);
    expect(nodesAndLinks.nodes[2].name).to.equal("b");   
    expect(nodesAndLinks.nodes[2].class).to.equal("sql-object");

    expect(nodesAndLinks.nodes[3].position).to.equal(3);
    expect(nodesAndLinks.nodes[3].name).to.equal("c");    
    expect(nodesAndLinks.nodes[3].class).to.equal("sql-object");

    expect(nodesAndLinks.nodes[4].position).to.equal(4);
    expect(nodesAndLinks.nodes[4].name).to.equal("file2");
    expect(nodesAndLinks.nodes[4].class).to.equal("source-code");    

    expect(nodesAndLinks.nodes[5].position).to.equal(5);
    expect(nodesAndLinks.nodes[5].name).to.equal("d");  
    expect(nodesAndLinks.nodes[5].class).to.equal("sql-object");

    expect(nodesAndLinks.nodes[6].position).to.equal(6);
    expect(nodesAndLinks.nodes[6].name).to.equal("e");  
    expect(nodesAndLinks.nodes[6].class).to.equal("sql-object");

    expect(nodesAndLinks.nodes[7].position).to.equal(7);
    expect(nodesAndLinks.nodes[7].name).to.equal("f");    
    expect(nodesAndLinks.nodes[7].class).to.equal("sql-object");
    
    //links validation
    expect(nodesAndLinks.links[0].source).to.equal(0);
    expect(nodesAndLinks.links[0].target).to.equal(1);
    expect(nodesAndLinks.links[0].type).to.equal("depends");

    expect(nodesAndLinks.links[1].source).to.equal(0);
    expect(nodesAndLinks.links[1].target).to.equal(2);    
    expect(nodesAndLinks.links[1].type).to.equal("depends");
    
    expect(nodesAndLinks.links[2].source).to.equal(0);
    expect(nodesAndLinks.links[2].target).to.equal(3);    
    expect(nodesAndLinks.links[2].type).to.equal("depends");

    expect(nodesAndLinks.links[3].source).to.equal(4);
    expect(nodesAndLinks.links[3].target).to.equal(5);
    expect(nodesAndLinks.links[3].type).to.equal("depends");

    expect(nodesAndLinks.links[4].source).to.equal(4);
    expect(nodesAndLinks.links[4].target).to.equal(6);    
    expect(nodesAndLinks.links[4].type).to.equal("depends");

    expect(nodesAndLinks.links[5].source).to.equal(4);
    expect(nodesAndLinks.links[5].target).to.equal(7);
    expect(nodesAndLinks.links[5].type).to.equal("depends");            

  });      
  
});


describe('DataGraphPreparer: getDataForExcel', function() {

  it('should generate the nodes and links', async function() {
    var dataGraphPreparer = new DataGraphPreparer();
    var rows = await dataGraphPreparer.getDataForExcel({
      "file1" : ["a","b","c"],
      "file2" : ["d","e","f"]
    });
    assert(rows);
    console.log(JSON.stringify(rows))
    
    expect(rows.length).to.equal(6);
    expect(rows[0].file_name).to.equal("file1");          
    expect(rows[0].sql_object).to.equal("a");
    expect(rows[1].file_name).to.equal("file1");          
    expect(rows[1].sql_object).to.equal("b");
    expect(rows[2].file_name).to.equal("file1");          
    expect(rows[2].sql_object).to.equal("c");
    expect(rows[3].file_name).to.equal("file2");          
    expect(rows[3].sql_object).to.equal("d");
    expect(rows[4].file_name).to.equal("file2");          
    expect(rows[4].sql_object).to.equal("e");
    expect(rows[5].file_name).to.equal("file2");          
    expect(rows[5].sql_object).to.equal("f");    


  });      
  
});