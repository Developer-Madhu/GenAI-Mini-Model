const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "do you know about the book the art of thinking clearly";

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