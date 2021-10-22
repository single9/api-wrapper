const ApiWrapper = require('../dist/index.js');

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
