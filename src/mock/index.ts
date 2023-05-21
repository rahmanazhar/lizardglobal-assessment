import { createServer, Model } from 'miragejs';
import data from './data.json';

interface Post {
  id: string;
  title: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  summary: string;
  categories: {
    id: string;
    name: string;
  }[];
}

export function setupServer() {
  const server = createServer({
    models: {
      post: Model,
    },

    routes() {
      this.namespace = 'api';

      this.get('/posts', () => {
        return data;
      });

      this.get('/posts/:id', (schema, request) => {
        const { id } = request.params;
        const post = data.posts.find((post: Post) => post.id === id);
        if (post) {
          return { post };
        } else {
          return new Response(JSON.stringify({ error: 'Post not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      });

      this.passthrough();
    },
  });

  return server;
}
