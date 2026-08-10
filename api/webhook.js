export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).send('Azkor bot webhook is alive');
    return;
  }

  const BOT_TOKEN = '8844750698:AAHCH1AlMKvRUEO5pWRFVC7uG1IJZXe3piY';
  const WEBAPP_URL = 'https://azamatnaz.github.io/Azkartjk-app/';

  try {
    const update = req.body;
    const message = update.message;

    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: 'Ассалому алайкум! 🌙\n\nХуш омадед ба «Азкор — ёдоварӣ».\nБарои кушодани барнома тугмаи поёнро пахш кунед.',
          reply_markup: {
            inline_keyboard: [[
              { text: '📖 Кушодани Азкор', web_app: { url: WEBAPP_URL } }
            ]]
          }
        })
      });
    }

    res.status(200).send('ok');
  } catch (e) {
    res.status(200).send('error handled');
  }
}
