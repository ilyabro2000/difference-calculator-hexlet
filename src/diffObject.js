import _ from 'lodash';

const diffObject = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.uniq([...keys1, ...keys2]);
  const result = _.sortBy(keys).map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'removed',
      };
    }
    if (data1[key] !== data2[key] && (!_.isObject(data1[key]) || !_.isObject(data2[key]))) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'modifed',
      };
    }
    return _.isObject(data1[key]) && _.isObject(data2[key])
      ? { key, children: diffObject(data1[key], data2[key]), type: 'nested' }
      : { key, value: data2[key], type: 'unchanged' };
  });
  return result;
};
export default diffObject;
