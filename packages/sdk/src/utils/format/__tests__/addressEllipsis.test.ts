import { describe } from 'vitest';
import { addressEllipsis } from '../index';
import { test } from 'vitest';
import { expect } from 'vitest';

describe('addressEllipsis', function () {
  test('correct scenario', function () {
    const aptosAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';
    expect(addressEllipsis(aptosAddress)).toEqual('0x00000....0000');
  });
});
