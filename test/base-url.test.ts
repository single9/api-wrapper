import should from 'should';
import ApiWrapper from '../src/index';

describe('ApiWrapper - Factory Base URL', () => {
  let api: ApiWrapper;

  it('should create an instance of ApiWrapper', () => {
    api = new ApiWrapper([
      {
        name: 'newPost',
        path: '/posts',
        method: 'post',
      },
      {
        name: 'getPosts',
        path: '/posts',
        method: 'get',
      },
      {
        name: 'getPostById',
        path: '/posts/:postId',
        method: 'get',
      },
      {
        name: 'updatePost',
        path: '/posts/:postId',
        method: 'patch',
      },
      {
        name: 'deletePost',
        path: '/posts/:postId',
        method: 'delete',
      },
    ], {
      baseUrl: () => 'https://jsonplaceholder.typicode.com',
    });
  });

  it('should do newPost', async () => {
    const resp = await api.newPost({
      data: {
        title: 'foo!!!!!!',
        body: 'bar!!',
        userId: 1
      },
    });
    should(resp).be.an.Object();
  });

  it('should do newPost with auth', async () => {
    const resp = await api.newPost({
      data: {
        title: 'foo!!!!!!',
        body: 'bar!!',
        userId: 1
      },
      auth: {
        username: 'user',
        password: 'pass'
      }
    });
    should(resp).be.an.Object();
    should(resp.config.auth).be.containEql({
      username: 'user',
      password: 'pass'
    });
  });

  it('should do updatePost', async () => {
    const resp = await api.updatePost({
      pathParams: {
        postId: '1',
      }
    });
    should(resp).be.an.Object();
    should(resp.config.url).be.equal('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should do deletePost', async () => {
    const resp = await api.deletePost({
      pathParams: {
        postId: '1',
      }
    });
    should(resp).be.an.Object();
    should(resp.config.url).be.equal('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should do getPosts', async () => {
    const resp = await api.getPosts();
    should(resp).be.an.Object();
  });

  it('should do getPosts but got error', async () => {
    await should(api.getPostById({
      pathParams: [{} as any]
    })).be.rejectedWith('pathParams is invalid');
  });

  it('should do getPosts (with queryString)', async () => {
    const resp = await api.getPosts({
      queryString: {
        userId: '1'
      }
    });
    should(resp.data).be.an.Array();
    should(resp.config.url).be.equal('https://jsonplaceholder.typicode.com/posts?userId=1');
  });

  it('should do getPostById', async () => {
    const resp = await api.getPostById({
      pathParams: {
        postId: '1',
      },
    });
    should(resp).be.an.Object();
    should(resp.config.url).be.equal('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should do getPostById (array path params)', async () => {
    const resp = await api.getPostById({
      pathParams: [
        {field: 'postId', value: '1'},
      ],
    });
    should(resp).be.an.Object();
    should(resp.config.url).be.equal('https://jsonplaceholder.typicode.com/posts/1');
  });
});
