const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = 54837;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
