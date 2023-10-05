const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());
const cors = require('cors');
app.use(cors());


app.post('/price', async (req, res) => {
    const currencyName = req.body.currency;
    console.log("got query for" + currencyName + "from client");
    if (!currencyName) {
        return res.status(400).send('Currency name is required');
    }

    try {
        const response = await axios.get('https://interview.switcheo.com/prices.json');
        const currencyData = response.data.find(item => item.currency === currencyName);

        if (!currencyData) {
            return res.status(404).send('Currency not found');
        }

        res.json({ currency: currencyData.currency, price: currencyData.price });
    } catch (error) {
        res.status(500).send('Failed to fetch prices');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
