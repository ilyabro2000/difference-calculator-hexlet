import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './src/parsers.js';

const diff = (filepath1, filepath2) => {
  const getData = (filepath) => {
    const fullPath = path.resolve(process.cwd(), filepath);
    return fs.readFileSync(fullPath, 'utf-8');
  };
  const getExtname = (filepath) => path.extname(filepath).slice(1);
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const data1 = _.cloneDeep(parse(file1, getExtname(filepath1)));
  const data2 = _.cloneDeep(parse(file2, getExtname(filepath2)));
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const result = {};
  const addMark = (mark, key) => `${mark} ${key}`;

  keys.map((key) => {
    if (!_.has(data1, key)) {
      result[addMark('+', key)] = data2[key];
    } else if (!_.has(data2, key)) {
      result[addMark('-', key)] = data1[key];
    } else if (data1[key] !== data2[key]) {
      result[addMark('-', key)] = data1[key];
      result[addMark('+', key)] = data2[key];
    } else {
      result[addMark(' ', key)] = data1[key];
    }
    return result;
  });

  return result;
};

export default diff;
