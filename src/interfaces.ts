import { AxiosResponse, AxiosRequestConfig } from 'axios';

type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head' | 'options';
type ApiParamObj = {
  [key: string]: string | number;
}
type ApiParamArray = {
  field: string;
  value: string | number;
}[];

export interface ICApiSchema {
  name: string;
  path: string;
  queryString?: IActionParams['queryString'];
  pathParams?: IActionParams['pathParams'];
  method: HTTPMethod;
  data?: IActionParams['data'];
  encoding?: string | null;
  headers?: IActionParams['headers'];
  auth?: IActionParams['auth'];
}

export interface IApiSchemaOptions {
  baseUrl?: string;
  headers?: IActionParams['headers'];
  auth?: IActionParams['auth'];
}

export interface ICallableApiFunction {
  (param: IActionParams): Promise<AxiosResponse>
}

export interface IActionParams extends AxiosRequestConfig {
  queryString?: ApiParamObj | ApiParamArray;
  pathParams?: ApiParamObj | ApiParamArray;
}
