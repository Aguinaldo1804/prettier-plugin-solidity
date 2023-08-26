import * as binaryOperatorPrinters from '../../../src/binary-operator-printers/index.ts';

test('binary operators printers to match snapshot', () => {
  expect(Object.keys(binaryOperatorPrinters)).toMatchSnapshot();
});
