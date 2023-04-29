require('dotenv').config()
const express = require('express');
const app = express();
const {Configuration, OpenAIApi} = require('openai');

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 4000;

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API
})

const openai = new OpenAIApi(configuration)

app.get('/', async (req, res) => {
    const response = await openai.createCompletion({
        prompt: 'Give Me a Funny Word',
        model: 'text-davinci-003',
    })
    let data = response.data.choices[0].text;
    
    res.render('pages/index', {
        data
    })
})

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`))