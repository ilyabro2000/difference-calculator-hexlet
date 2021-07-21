import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './src/parsers.js';
import diffObject from './src/diffObject.js';
import format from './src/formatters/index.js';

const diff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const getData = (filepath) => {
    const fullPath = path.resolve(process.cwd(), filepath);
    return fs.readFileSync(fullPath, 'utf-8');
  };
  const getExtname = (filepath) => path.extname(filepath).slice(1);
  const data1 = _.cloneDeep(parse(getData(filepath1), getExtname(filepath1)));
  const data2 = _.cloneDeep(parse(getData(filepath2), getExtname(filepath2)));
  return format(diffObject(data1, data2), outputFormat);
};

export default diff;
