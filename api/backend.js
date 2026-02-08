import Groq from 'groq-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const response = await groq.chat({
      model: 'gpt-4',      // or whichever model you want
      messages: [
        { role: 'user', content: message }
      ]
    });

    res.status(200).json({ reply: response.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Groq API' });
  }
}
