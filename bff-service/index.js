require('dotenv').config();

const express = require('express');
const axios = require('axios').default;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.all('*', async (req, res) => {
  const recipient = req.originalUrl.split('/')[1];
  const recipientUrl = process.env[recipient];

  if (recipientUrl) {
    const redirectConfig = {
      method: req.method,
      url: `${recipientUrl}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 1 && { data: req.body }),
    };

    try {
      const result = await axios(redirectConfig);

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
