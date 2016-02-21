var program = require('commander');
var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var frame = elegantSpinner();
require('shelljs/global');

program
.description('Create a MERN app in current directory!')
.option('-f, --fork [user:branch]', 'The boilerplate github fork [Hashnode:master]', 'Hashnode:master')
.parse(process.argv);

var repoUser = program.fork.split(':')[0];
var repoBranch = program.fork.substring(repoUser.length + 1) || 'master';

if (!which('git')) {
  console.log(chalk.red('Sorry, this script requires git'));
  exit(1);
}

if(program.args.length > 1) {
  console.log(chalk.red('Please give only one argument as a directory name!!!')); 
  exit(1);
}

if(program.args.length === 1) {
 if(test('-d', program.args[0])) {
   console.log(chalk.red(program.args[0]+ ' directory already exits! Please choose some another name!!!'));
   exit(1);
 }
 
   mkdir('-p', program.args[0]);
   cd(program.args[0]);
 }
 exec('git init');
 
 var interval = setInterval(function() {
   logUpdate("Fetching the boilerplate..." + chalk.cyan.bold.dim(frame()));
 }, 50)
 
 var e = exec('git pull https://github.com/' + repoUser + '/mern-starter.git ' + repoBranch, function(code, stdout, stderr) {
   clearInterval(interval);
   if(code !== 0) {
     console.log(chalk.red.bold('Error! Try again'));
     exit(1);
   }
   console.log(chalk.green.bold('Completed.....You are good to go!'));
 });