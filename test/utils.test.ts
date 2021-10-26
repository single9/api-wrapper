import should from 'should';
import * as utils from '../src/utils'

describe('utils', () => {
  it('should do request', async () => {
    const resp = await utils.request({
      url: 'http://example.com',
      method: 'GET',
    });
    should(resp).be.an.Object();
  });

  it('should do parseQueryStringParams', () => {
    const result = utils.parseQueryStringParams({
      a: 1,
      b: 2,
    });

    should(result).be.a.String();
    should(result.search('a=1') > -1).be.True();
    should(result.search('b=2') > -1).be.True();
  });

  it('should do parsePathParams', () => {
    const result = utils.parsePathParams('/:group/:id', {
      group: 'admin',
      id: 1234,
    });

    should(result).be.a.String();
    should(result.search('admin') > -1).be.True();
    should(result.search('1234') > -1).be.True();
  });

  it('should do parseQueryStringParams (array)', () => {
    const result = utils.parseQueryStringParams([
      { field: 'a', value: 1 },
      { field: 'b', value: 2 },
    ]);

    should(result).be.a.String();
    should(result.search('a=1') > -1).be.True();
    should(result.search('b=2') > -1).be.True();
  });

  it('should do parsePathParams (array)', () => {
    const result = utils.parsePathParams('/:group/:id', [
      { field: 'group', value: 'admin' },
      { field: 'id', value: 1234 },
    ]);

    should(result).be.a.String();
    should(result.search('admin') > -1).be.True();
    should(result.search('1234') > -1).be.True();
  });
});
