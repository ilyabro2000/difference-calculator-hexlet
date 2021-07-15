import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fullPath1 = getFixturePath('file1.json');
const fullPath2 = getFixturePath('file2.json');
const relativePath1 = './__fixtures__/file1.json';
const relativePath2 = './__fixtures__/file2.json';

const result = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};

test('test1: absolute path', () => {
  expect(diff(fullPath1, fullPath2)).toStrictEqual(result);
});

test('test2: relative path', () => {
  expect(diff(relativePath1, relativePath2)).toStrictEqual(result);
});
