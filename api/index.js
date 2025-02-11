module.exports = async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'https://globalultrasonido.cl/');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({ message: 'Endpoint funcionando correctamente' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

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
        res.status(200).json(data);
    } catch (error) {
        console.error('Error al enviar datos a Cliengo:', error.message);
        res.status(500).json({ error: 'Error al enviar datos a Cliengo' });
    }
};
