import should from 'should';
import ApiWrapper from '../src/index';

describe('ApiWrapper with `configureAxios`', () => {
  let api: ApiWrapper;
  let reqInterceptorReqData;
  let resInterceptorResData;

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
      baseUrl: 'https://jsonplaceholder.typicode.com',
      configureAxios: (axios) => {
        axios.interceptors.request.use((request) => {
          reqInterceptorReqData = request.data;
          return request;
        });

        axios.interceptors.response.use((response) => {
          resInterceptorResData = response.data;
          return response;
        });
      }
    });
  });

  it('should do newPost', async () => {
    const reqData = {
      title: 'foo!!!!!!',
      body: 'bar!!',
      userId: 1
    };
    const resp = await api.newPost({
      data: reqData,
    });
    should(resp).be.an.Object();
    should(reqInterceptorReqData).be.have.containEql(reqData);
    should(resInterceptorResData).be.have.containEql(resp.data);
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
