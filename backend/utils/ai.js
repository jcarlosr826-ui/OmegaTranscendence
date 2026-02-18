const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


async function generateDisputeLetter(issue, userInfo) {
  const prompt = `
  Generate a credit dispute letter for the following issue:
  ${issue}


  User Info:
  ${JSON.stringify(userInfo)}
  `;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });
  return response.choices[0].message.content;
}


module.exports = { generateDisputeLetter };
