import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let groceries = [
    { id: 1, name: 'Apple', quantity: 5, isBought: false },
    { id: 2, name: 'Banana', quantity: 2, isBought: false },
    { id: 3, name: 'Egg', quantity: 10, isBought: false }
];

app.get('/api/groceries', (req, res) => {
    console.log("[GET] Request groceries list.");
    res.status(200).json({ success: true, total: groceries.length, data: groceries});
});

app.get('/api/groceries/:id', (req, res) => {
    const itemID = parseInt(req.params.id);
    console.log(`[GET] Request checking item ID: ${itemID}`);

    const item = groceries.find(g => g.id === itemID);

    if (!item) {
        return res.status(404).json({ success: false, message: 'Not Found.' });
    }

    res.status(200).json({ success: true, data: item });
});

app.post('/api/groceries', (req, res) => {
    const { name, quantity } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Bad Request'});
    }
    console.log(`[POST] Request new item: "${name}"`);

    const newID = groceries.length > 0 ? Math.max(...groceries.map(g => g.id)) + 1 : 1;

    const newItem = {
        id: newID,
        name: name,
        quantity: quantity || 1,
        isBought: false
    };

    groceries.push(newItem);

    res.status(201).json({ success: true, message: 'Item created.', data: newItem});
});

app.delete('/api/groceries/:id', (req, res) => {
    const itemID = parseInt(req.params.id);
    console.log(`[DELETE] Request delete item ID: ${itemID}`);

    const index = groceries.findIndex(g => g.id === itemID);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Not found.' });
    }

    groceries.splice(index, 1);

    res.status(200).json({ success: true, message: `Item ID ${itemID} deleted.` });
});

app.listen(PORT, () => {
    console.log(`\n Server Grocery List is running at: http://localhost:${PORT}`);
});