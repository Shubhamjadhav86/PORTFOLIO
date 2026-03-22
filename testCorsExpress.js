const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.post('/api/test', (req, res) => res.json({ok: true}));

app.listen(5001, async () => {
    const fetch = require('node:fetch');
    const res = await fetch('http://localhost:5001/api/test', {
        method: 'OPTIONS',
        headers: {
            'Origin': 'http://localhost:3000',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Authorization, Content-Type'
        }
    });
    console.log("Status:", res.status);
    res.headers.forEach((val, key) => console.log(key, ':', val));
    process.exit(0);
});
