export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 代理 /api/* 到后端 Workers
    if (url.pathname.startsWith('/api/')) {
      const backendUrl = 'https://lumibox-api.hoshino01024.workers.dev' + url.pathname;
      return fetch(backendUrl, request);
    }
    
    // 默认返回静态文件
    return env.ASSETS.fetch(request);
  }
};
