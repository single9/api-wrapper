import { ICApiSchema, IActionParams } from './interfaces';
import { request, parseQueryStringParams, parsePathParams } from './utils';

export default function actions(baseUrl: string, data: ICApiSchema) {
  return async (params?: IActionParams) => {
    let qs = '';
    let _data = Object.assign({}, data);
    let _path = _data.path;

    if (_data.queryString) {
      qs = parseQueryStringParams(_data.queryString);
    }

    if (_data.pathParams) {
      _path = parsePathParams(_path, _data.pathParams);
    }

    if (params) {
      if (params.queryString) {
        qs = parseQueryStringParams(params.queryString);
      }

      if (params.pathParams) {
        _path = parsePathParams(_path, params.pathParams);
      }
    }

    _data.path = baseUrl + _path + (qs && ('?' + qs));

    if (!_data.method) throw new Error(`Missing API method: ${_data.name}`);

    const actionParams = {
      ...params,
      url: _data.path,
      method: _data.method,
    };

    if (_data.headers) {
      actionParams.headers = {
        ...params?.headers,
        ..._data.headers
      };
    }

    if (_data.auth) {
      actionParams.auth = {
        ...params?.auth,
        ..._data.auth
      };
    }

    delete actionParams.queryString;
    delete actionParams.pathParams;

    return request(actionParams);
  };
}
