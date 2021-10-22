import axios, { AxiosRequestConfig } from 'axios';
import {
  ICApiSchema,
  IActionParams
} from './interfaces';

function request(config: AxiosRequestConfig) {
  return axios.request(config);
}

function parseQueryStringParams(queryString: IActionParams['queryString']) {
  let qs = [];

  function pushToQs(key: string, value: string | number) {
    qs.push(`${key}=${encodeURIComponent(value)}`);
  }

  if (Array.isArray(queryString)) {
    for (let i = 0; i < queryString.length; i++) {
      const elem = queryString[i];
      pushToQs(elem.field, elem.value);
    }
  } else {
    const queryStringEntities = Object.entries(queryString);
    for (let i = 0; i < queryStringEntities.length; i++) {
      pushToQs(...queryStringEntities[i]);
    }
  }

  return qs.join('&');
}

function parsePathParams(path: string, pathParams: IActionParams['pathParams']) {
  let _path = path;

  function replacePath(key: string, value: string | number) {
    _path = _path.replace(`:${key}`, value.toString());
  }

  if (Array.isArray(pathParams)) {
    for (let i = 0; i < pathParams.length; i++) {
      const elem = pathParams[i];

      if (elem.value) {
        replacePath(elem.field, elem.value);
      } else {
        throw new Error('pathParams is invalid');
      }
    }
  } else {
    const pathParamsEntities = Object.entries(pathParams);

    for (let i = 0; i < pathParamsEntities.length; i++) {
      replacePath(...pathParamsEntities[i]);
    }
  }

  return _path;
}

export default function actions(baseUrl: string, data: ICApiSchema) {
  return async (params: IActionParams) => {
    let _data = Object.assign({}, data);
    let qs = '';
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
        ...params.headers,
        ..._data.headers
      };
    }

    if (_data.auth) {
      actionParams.auth = {
        ...params.auth,
        ..._data.auth
      };
    }

    delete actionParams.queryString;
    delete actionParams.pathParams;

    return request(actionParams);
  };
}
