const app = require('./server');
const connection = require('./config/db');
const port = 3000;

connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });
});
