import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const diff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const data1 = _.cloneDeep(JSON.parse(file1));
  const data2 = _.cloneDeep(JSON.parse(file2));
  const keys = _.union(_.keys(data1), _.keys(data2));
  const result = [];

  keys.map((key) => {
    if (!_.has(data1, key)) {
      result.push(`+ ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      result.push(`- ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      result.push(`+ ${key}: ${data2[key]}`);
      result.push(`- ${key}: ${data1[key]}`);
    } else {
      result.push(`  ${key}: ${data1[key]}`);
    }
    return result;
  });

  result.sort((a, b) => {
    if (a[2] > b[2]) return 1;
    return -1;
  });

  return result;
};

export default diff;