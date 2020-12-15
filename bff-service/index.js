require('dotenv').config();

const express = require('express');
const axios = require('axios').default;

const app = express();
const port = process.env.PORT || 3000;

const cache = {};

const CACHE_EXPIRES_MS = 1000 * 120;

app.use(express.json());

app.all('*', async (req, res) => {
  const recipient = req.originalUrl.split('/')[1];
  const recipientUrl = process.env[recipient];

  if (recipientUrl) {
    if (cache[recipient] && cache[recipient].expiresIn < Date.now()) {
      delete cache[recipient];
    }

    if (cache[recipient] && req.originalUrl.endsWith('products') && req.method === 'GET') {
      return res.json(cache[recipient].data);
    }

    const redirectConfig = {
      method: req.method,
      url: `${recipientUrl}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 1 && { data: req.body }),
    };

    try {
      const result = await axios(redirectConfig);

      if (recipient === 'products' && req.originalUrl.endsWith('products') && req.method === 'GET') {
        cache[recipient] = {
          expiresIn: Date.now() + CACHE_EXPIRES_MS,
          data: result.data,
        };
      }

      return res.json(result.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        return res.status(status).json(data);
      }

      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(502).json({ error: 'Cannot process request' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
