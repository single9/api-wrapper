API Wrapper
===========

[![codecov](https://codecov.io/gh/single9/api-wrapper/branch/main/graph/badge.svg?token=SXD7LZW7MU)](https://codecov.io/gh/single9/api-wrapper)

Define and Call your restful APIs like a function.

This package is based on [`@single9/api-tester`](https://www.npmjs.com/package/@single9/api-tester) but use [Axios](https://www.npmjs.com/package/axios) instead of [Request](https://www.npmjs.com/package/request).

Installation
============

    npm i @single9/api-wrapper

Usage
=====

```js
const ApiWrapper = require('@single9/api-wrapper');
```

Create
------

```js
const api = new ApiWrapper([
  {
    name: '<Api Name>',       // only allow certain words and digits
    path: '<Api Path>',       // e.g. /api/posts
    method: '<HTTP Method>',  // e.g. post or POST
  },
], {
  baseUrl: '<Base URL of API>',   // e.g. https://jsonplaceholder.typicode.com
                                  // Default: http://localhost:3000
  headers: {
    // The headers you want to send. e.g. 'authorization': 'Bearer SAdoweasd...',
  },
  auth: { // authorization
    username: 'username',
    password: 'password',
  }
})
```

Use
---

    api.<api_name>(params)

- **api**: Your `ApiWrapper` instance.
- **api_name**: The name of the API that you set before.
- **params**: Ｃompatible with [axios request config](https://axios-http.com/docs/req_config)
  - queryString
  - pathParams

### Params
#### params.queryString

Used for query string. e.g. /users?limit=100

```js
api.test({
  queryString: {
    key: value
  }
})
```

```js
api.test({
  queryString: [
    {
      name: string,
      value: string | number,
    }
  ]
})
```

#### params.pathParams

Used for path parameters. e.g. /user/:id

```js
api.test({
  pathParams: {
    key: value
  }
})
```

```js
api.test({
  pathParams: [
    {
      name: string,
      value: string | number,
    }
  ]
})
```

Example
-------

```js
const ApiWrapper = require('@single9/api-wrapper');

// Create your API schema
const schema = [
  {
    name: 'newPost',  // this is your api function name
    path: '/posts',
    method: 'post',
  },
  {
    name: 'getTodo',
    path: '/todos/:todoId',  // path parameter
    method: 'get',
  },
];

const api = new ApiWrapper(schema, {
  baseUrl: 'https://jsonplaceholder.typicode.com',
});

async function start() {
  try {
    const post = await api.newPost({
      // Post Body
      data: {
        title: 'foo!!!!!!',
        body: 'bar!!',
        userId: 1
      },
    });

    console.log(post.data);

    const get = await api.getTodo({
      pathParams: {
        todoId: 2, // replace `:todoId` with value 2.
      },
    });

    console.log(get.data);
  } catch (err) {
    console.error(err);
  }
}

start();
```
