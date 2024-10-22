export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.yourapp.com'
  : 'http://localhost:3001'

export const code = `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
`;
