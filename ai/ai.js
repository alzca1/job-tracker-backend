require("dotenv").config();

const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
  });

  console.log(completion.choices[0].message.content);
}

main();
