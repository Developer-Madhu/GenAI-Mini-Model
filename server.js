const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html')); 
});

app.post('/submit', (req,res) => {
    const userinput = req.body.userInput;
    const prompt = userinput
    const generate = async () => {
        const result = await model.generateContent(prompt);
        return result
    }

    async function main(){
        try{
            const res = await generate()
            console.log(res.response.text())
        }catch(e){
            console.log('Please try again')
        }
    }
    main()
})

app.listen(5000, () => {
    console.log('Sever started listening...')
})