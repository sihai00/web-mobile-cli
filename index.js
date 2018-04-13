var program = require('commander');
var packages = require('./package.json')
var exec = require('child_process').exec;

program
  .version(require('./package.json').version)
  .option('-n, --projectname [name]', 'Add name')
  .option('-p, --port [port]', 'Add port')
  .parse(process.argv);

// console.log('you ordered a pizza with:');
if (program.projectname) {
  const name = program.projectname
  const url = packages.repository.url

  exec(`mkdir test && cd test && git clone ${url} ${name}`, function(error, stdout, stderr){
    if(error) {
      console.error('error: ' + error);
      return;
    }
  });
}

if (program.port) console.log('  - port', program.port);