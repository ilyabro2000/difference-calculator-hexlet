import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const render = (nodes) => {
  const iter = (node, parentName = '') => {
    const {
      key, type, value, children, value1, value2,
    } = node;

    const currentPath = (child, parent = '') => {
      if (parent === '') return child;
      return `${parent}.${child}`;
    };

    switch (type) {
      case 'nested':
        return children.map((child) => iter(child, currentPath(key, parentName))).join('');
      case 'unchanged':
        return '';
      case 'modifed':
        return `Property '${currentPath(key, parentName)}' was updated. From ${getValue(value1)} to ${getValue(value2)}\n`;
      case 'added':
        return `Property '${currentPath(key, parentName)}' was added with value: ${getValue(value)}\n`;
      case 'removed':
        return `Property '${currentPath(key, parentName)}' was removed\n`;
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };
  return iter(nodes);
};

export default (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};
