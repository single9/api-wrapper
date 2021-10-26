import axios, { AxiosRequestConfig } from 'axios';
import { IActionParams } from './interfaces';

export function request(config: AxiosRequestConfig) {
  return axios.request(config);
}

export function parseQueryStringParams(queryString: IActionParams['queryString']) {
  let qs: (string | number)[] = [];

  function pushToQs(key: string, value: string | number) {
    qs.push(`${key}=${encodeURIComponent(value)}`);
  }

  if (Array.isArray(queryString)) {
    for (let i = 0; i < queryString.length; i++) {
      const elem = queryString[i];
      pushToQs(elem.field, elem.value);
    }
  } else if (queryString) {
    const queryStringEntities = Object.entries(queryString);
    for (let i = 0; i < queryStringEntities.length; i++) {
      pushToQs(...queryStringEntities[i]);
    }
  }

  return qs.join('&');
}

export function parsePathParams(path: string, pathParams: IActionParams['pathParams']) {
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
  } else if (pathParams) {
    const pathParamsEntities = Object.entries(pathParams);

    for (let i = 0; i < pathParamsEntities.length; i++) {
      replacePath(...pathParamsEntities[i]);
    }
  }

  return _path;
}
