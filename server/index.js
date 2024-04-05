import express from 'express';

const app = express();

const { PORT = 8080 } = process.env;
app.listen(PORT, () => {
  console.log(`Now listening on PORT: ${PORT}`);
})