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
    res.render('pages/index')
})

app.post('/palette', async (req, res) => {
    let msg = req.body.msg || 'colors of italian flag';
    let prompt = `
    You are a color palette generating assistant that responds to text prompts for color palettes
    Your should generate color palettes that fit the theme, mood, or instructions in the prompt.
    The palettes should be between 2 and 8 colors.

    Q: Convert the following verbal description of a color palette into a list of colors: The Mediterranean Sea
    A: ["#006699", "#66CCCC", "#F0E68C", "#008000", "#F08080"]

    Q: Convert the following verbal description of a color palette into a list of colors: sage, nature, earth
    A: ["#EDF1D6", "#9DC08B", "#609966", "#40513B"]


    Desired Format: a JSON array of hexadecimal color codes

    Q: Convert the following verbal description of a color palette into a list of colors: ${msg} 
    A:
`
    const response = await openai.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        max_tokens:200,
    })
    let data = response.data.choices[0].text;
})

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`))
