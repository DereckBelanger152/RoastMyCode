import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;

    // Vérifie si le code a été envoyé
    if (!code) {
      return res.status(400).json({ error: "Le code n'a pas été fourni." });
    }

    const apiKey = process.env.VITE_OPENAI_API_KEY;

    try {
      // Envoie une requête à OpenAI GPT
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-3.5-turbo', 
          messages: [
            { role: 'system', content: 'Tu es un développeur sarcastique.' },
            { role: 'user', content: `Voici mon code : \n${code}` }
          ],
          max_tokens: 150,
          temperature: 0.7,  // Ajuste ce paramètre pour plus de créativité
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      // Renvoie le résultat au frontend
      res.status(200).json({ roast: response.data.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur avec l\'API OpenAI.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
