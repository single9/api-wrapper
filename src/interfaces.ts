import { AxiosResponse, AxiosRequestConfig, Method, AxiosStatic } from 'axios';

export type HTTPMethod = Method;
export type ApiParamObj = {
  [key: string]: string | number;
}
export type ApiParamArray = {
  field: string;
  value: string | number;
}[];

/** This factory function should a string while called. */
export interface FactoryBaseUrl {
  (): string | Promise<string>;
}

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

export type BaseUrl = string | FactoryBaseUrl;

export interface IApiSchemaOptions {
  configureAxios?: ConfigureAxios;
  baseUrl?: BaseUrl;
  headers?: IActionParams['headers'];
  auth?: IActionParams['auth'];
}

export interface ConfigureAxios {
  (item: AxiosStatic): void;
}
export interface ICallableApiFunction {
  (param?: IActionParams): Promise<AxiosResponse>
}

export interface IActionParams extends AxiosRequestConfig {
  queryString?: ApiParamObj | ApiParamArray;
  pathParams?: ApiParamObj | ApiParamArray;
}
