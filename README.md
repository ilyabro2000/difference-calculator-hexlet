### Hexlet tests and linter status:
[![Actions Status](https://github.com/ilyabro2000/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ilyabro2000/frontend-project-lvl2/actions)

[![Node.js CI](https://github.com/ilyabro2000/frontend-project-lvl2/actions/workflows/nodeCI.yml/badge.svg?branch=main)](https://github.com/ilyabro2000/frontend-project-lvl2/actions/workflows/nodeCI.yml)

<a href="https://codeclimate.com/github/ilyabro2000/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/f5ac601ab10135cde156/maintainability" /></a>

<a href="https://codeclimate.com/github/ilyabro2000/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f5ac601ab10135cde156/test_coverage" /></a>

Difference Calculator is a cli utility which takes 2 configuration files and outputs the report showing difference between them.  
Possible file formats: json, yaml and ini

## Install ##

To install Difference Calculator the following soft is required:
* node version 14.0 or above
* npm version 6.0 or above
* make utility

Clone this repo and run:
```
make install
make link
```

## Usage ##

The report format can be specified with `-f` or `--format` option (see below), and defaults to recursive text.  

`-f, --format plain` - the report will be generated as plain text  

`-f, --format json` - the report will be generated as JSON

## Usage examples ##

[![asciicast](https://asciinema.org/a/PTSWL9LXERxxbvBMzCcgBL8Ms.svg)](https://asciinema.org/a/PTSWL9LXERxxbvBMzCcgBL8Ms)