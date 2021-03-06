import { test, expect } from '@jest/globals';
import * as fs from 'fs';
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

const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');

const stylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const plain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const json = fs.readFileSync(getFixturePath('json.json'), 'utf-8');

test('test1: absolute path and default formatter', () => {
  expect(diff(fullPath1, fullPath2)).toStrictEqual(stylish);
});

test('test2: relative path', () => {
  expect(diff(relativePath1, relativePath2)).toStrictEqual(stylish);
});

test('test4: get diff yml format', () => {
  expect(diff(yml1, yml2)).toStrictEqual(stylish);
});

test('test5: get diff yaml format', () => {
  expect(diff(yaml1, yaml2)).toStrictEqual(stylish);
});

test('test5: get diff different format', () => {
  expect(diff(yaml1, relativePath2)).toStrictEqual(stylish);
});

test('test6: get diff with format plain', () => {
  expect(diff(fullPath1, fullPath2, 'plain')).toStrictEqual(plain);
});

test('test7: get diff with format stylish', () => {
  expect(diff(fullPath1, fullPath2, 'stylish')).toStrictEqual(stylish);
});

test('test8: get diff with format json', () => {
  expect(diff(fullPath1, fullPath2, 'json')).toStrictEqual(json);
});
