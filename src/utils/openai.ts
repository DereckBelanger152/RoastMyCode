// src/utils/openai.ts

type RoastOptions = {
    code: string;
    language: string;
    intensity: 'Constructif' | 'Taquin' | 'Brutal';
    profile: string;
  };

export async function fetchRoast({ code, language, intensity, profile }: RoastOptions): Promise<string> {

    const prompt = `
  Tu es un expert en programmation avec le style de ${profile}.
  Rôles :
  - Langage : ${language}
  - Niveau de sévérité : ${intensity}
  - Donne un roast constructif, drôle et instructif sur ce code :
  
  \`\`\`${language}
  ${code}
  \`\`\`
  
  Garde un ton ${intensity === 'Brutal' ? 'condescendant, sauvage et embarassant' : intensity === 'Taquin' ? 'moqueur, drôle, mais utile' : 'taquin et bienveillant'}.
  `;
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data?.error?.message || "Erreur lors de l'appel à OpenAI");
    }
  
    return data.choices[0].message.content.trim();
}
