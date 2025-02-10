const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.post('/proxy-cliengo', async (req, res) => {
    const cliengoApiUrl = 'https://api.cliengo.com/1.0/contacts?api_key=84e5000d-8828-4d0c-b22b-547f95c258c4';

    try {
        const response = await fetch(cliengoApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        res.send(data);
    } catch (error) {
        
        console.error('Error al enviar datos a Cliengo:', error.message);
        res.status(500).send({ error: 'Error al enviar datos a Cliengo' });
    }
});
