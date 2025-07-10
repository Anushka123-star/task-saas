const express = require('express');
const app = express();

app.get('/', (_, res) => res.send('Auth Service Running!'));
app.listen(5001, () => console.log('Auth service listening on port 5001'));