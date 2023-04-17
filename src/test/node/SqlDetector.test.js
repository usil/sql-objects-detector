const include = require('nodejs-require-enhancer').include;
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const TestHelper = include('/src/test/node/TestHelper.js');
const SqlDetector = include('/src/main/node/SqlDetector.js');

describe('SqlDetector: getTables', function() {

  it('without tables', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "without_tables"), [".asp"]);
    assert(tablesByFile);    
    expect(Object.keys(tablesByFile).length).to.equal(1); 
    expect(Object.keys(tablesByFile)[0]).to.equal("wtf.asp");   
    expect(tablesByFile["wtf.asp"].length).to.equal(0);
  });

  it('should fail when allowedExtensions is not passed', async function() {
    var sqlDetector = new SqlDetector();
    var erroWasThrow = false;
    try{
      await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "without_tables"));
      erroWasThrow = false;
    }catch(err){
      erroWasThrow = true;
    }
    expect(erroWasThrow).to.equal(true);
  });     

  it('one file', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "one_script"), [".asp"]);
    assert(tablesByFile);   
    expect(Object.keys(tablesByFile)[0]).to.equal("employee.asp");
    expect(tablesByFile["employee.asp"].length).to.equal(6);
    expect(tablesByFile["employee.asp"][0]).to.equal("foo.table_bar1");
    expect(tablesByFile["employee.asp"][1]).to.equal("foo.table_bar2");
    expect(tablesByFile["employee.asp"][2]).to.equal("foo.table_bar3");
    expect(tablesByFile["employee.asp"][3]).to.equal("foo.table_bar4");
    expect(tablesByFile["employee.asp"][4]).to.equal("foo.table_bar5");
    expect(tablesByFile["employee.asp"][5]).to.equal("foo.table_bar6");
  });

  it('one line sql', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "one_line"), [".asp"]);
    assert(tablesByFile);        
    expect(Object.keys(tablesByFile)[0]).to.equal("product_form.asp");
    expect(tablesByFile["product_form.asp"].length).to.equal(4);
    expect(tablesByFile["product_form.asp"][0]).to.equal("foo.table_bar1");
    expect(tablesByFile["product_form.asp"][1]).to.equal("foo.table_bar7");
    expect(tablesByFile["product_form.asp"][2]).to.equal("foo.table_bar8");
    expect(tablesByFile["product_form.asp"][3]).to.equal("foo.table_bar9");
  });


  it('insert', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "insert"), [".asp"]);
    assert(tablesByFile);
    expect(Object.keys(tablesByFile)[0]).to.equal("process.asp");
    expect(tablesByFile["process.asp"].length).to.equal(4);
    expect(tablesByFile["process.asp"][0]).to.equal("foo.table_bar10");
    expect(tablesByFile["process.asp"][1]).to.equal("foo.table_bar12");
    expect(tablesByFile["process.asp"][2]).to.equal("foo.table_bar11");
    expect(tablesByFile["process.asp"][3]).to.equal("foo.table_bar13");
  });

  it('delete', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "delete"), [".asp"]);
    assert(tablesByFile);
    expect(Object.keys(tablesByFile)[0]).to.equal("process.asp");
    expect(tablesByFile["process.asp"].length).to.equal(3);
    expect(tablesByFile["process.asp"][0]).to.equal("foo.table_bar11");
    expect(tablesByFile["process.asp"][1]).to.equal("foo.table_bar12");
    expect(tablesByFile["process.asp"][2]).to.equal("foo.table_bar10");
  });  

  it('update', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "update"), [".asp"]);
    assert(tablesByFile);
    expect(Object.keys(tablesByFile)[0]).to.equal("bulk_insert.asp");
    expect(tablesByFile["bulk_insert.asp"].length).to.equal(2);
    expect(tablesByFile["bulk_insert.asp"][0]).to.equal("foo.table_bar14");
    expect(tablesByFile["bulk_insert.asp"][1]).to.equal("foo.table_bar15");
  });    


  it('procedure', async function() {
    var sqlDetector = new SqlDetector();
    var tablesByFile = await sqlDetector.getTables(path.join(TestHelper.getResource(__filename), "procedure"), [".asp"]);
    assert(tablesByFile);
    console.log(JSON.stringify(tablesByFile));
    expect(Object.keys(tablesByFile)[0]).to.equal("search_gift.asp");
    expect(tablesByFile["search_gift.asp"].length).to.equal(2);
    expect(tablesByFile["search_gift.asp"][0]).to.equal("foo.procedure_1");
    expect(tablesByFile["search_gift.asp"][1]).to.equal("foo.procedure_2");
  });      
  
});
