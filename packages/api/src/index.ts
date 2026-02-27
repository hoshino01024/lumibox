import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/*', cors());

app.get('/', (c) => c.json({ 
  name: 'LumiBox API',
  version: '1.0.0',
  status: 'running'
}));

export default app;
