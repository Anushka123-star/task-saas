const express = require('express');
const app = express();

app.get('/', (_, res) => res.send('Task Service Running!'));
app.listen(5002, () => console.log('Task service listening on port 5002'));
