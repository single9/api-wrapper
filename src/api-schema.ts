import {
  ICallableApiFunction,
  ICApiSchema,
  IApiSchemaOptions,
} from './interfaces';
import actions from './action';

export class ApiSchema {
  [key: string]: ICallableApiFunction;
  constructor(schemas: ICApiSchema[], opts?: IApiSchemaOptions) {
    const baseUrl = opts && opts.baseUrl;
    const auth = opts && opts.auth;
    const headers = opts && opts.headers;

    if (!baseUrl) throw new Error('baseUrl must be specified');

    for (let i = 0; i < schemas.length; i++) {
      const schema = schemas[i];

      if (schema.name.search(/\W+/) >= 0)
        throw new Error('name only allow certain words and digits');
      if (this[schema.name] !== undefined)
        throw new Error(`Duplicated API: ${schema.name}`);

      const _schema = Object.assign(schema, { auth, headers });
      this[schema.name] = actions(baseUrl, _schema);
    }
  }
}
