import _ from 'lodash';

const stringify = (value, space) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indent = ' '.repeat(space + 6);
  const indentBraces = ' '.repeat(space + 2);

  const keys = Object.keys(value);
  const res = keys.map((name) => {
    const valueKey = value[name];

    if (_.isObject(valueKey)) {
      return `${indent}${name}: ${stringify(valueKey, space + 4)}\n`;
    }
    return `${indent}${name}: ${valueKey}\n`;
  });
  return `{\n${res.join('')}${indentBraces}}`;
};

const render = (nodes) => {
  const iter = (node, space = 2) => {
    const indent = ' '.repeat(space);
    const indentBraces = ' '.repeat(space + 2);
    const {
      key, type, value, children, value1, value2,
    } = node;

    switch (type) {
      case 'nested':
        return `\n${indentBraces}${key}: {${children.map((child) => iter(child, space + 4)).join('')}\n${indentBraces}}`;
      case 'unchanged':
        return `\n${indentBraces}${key}: ${stringify(value, space)}`;
      case 'modifed':
        return `\n${indent}- ${key}: ${stringify(value1, space)}\n${indent}+ ${key}: ${stringify(value2, space)}`;
      case 'added':
        return `\n${indent}+ ${key}: ${stringify(value, space)}`;
      case 'removed':
        return `\n${indent}- ${key}: ${stringify(value, space)}`;
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };
  return iter(nodes);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
