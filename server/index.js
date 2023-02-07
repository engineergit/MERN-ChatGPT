const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const bodyParser = require("body-parser");
// add body parser to express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add cors to express
app.use(cors());


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-itb3TEBnoAOkQHhEqEaqHy0u",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// chat logs 
app.post("/chatlog", async (req, res) => {
    console.log('server is running');
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.5,
        max_tokens: 200
    });
    if (response.status == 200) {
        res.status(200).json({ message: response.data.choices[0].text });
    } else {
        res.status(401).json({ message: response.data.error.message });        
    }
});

// open AI Models
app.get("/models", async (req, res) => {
    const response = await openai.listEngines();
    console.log('list of models : ', response.data);
    res.send(response.data);
})


app.listen(port, () => {
    console.log(`server is running on ${port} port.`);
})
