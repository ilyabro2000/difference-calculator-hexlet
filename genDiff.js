#!/usr/bin/env node
import program from 'commander';
import diff from './src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    diff(filepath1, filepath2).map((item) => console.log(item));
  })
  .parse(process.argv);