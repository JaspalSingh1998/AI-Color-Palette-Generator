const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello There From Nodejs Server')
})

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`))