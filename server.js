const http = require('http');

const BOT_TOKEN = '8844750698:AAHCH1AlMKvRUEO5pWRFVC7uG1IJZXe3piY';
const WEBAPP_URL = 'https://azamatnaz.github.io/Azkartjk-app/';
const PORT = process.env.PORT || 3000;

function sendMessage(chatId) {
  const payload = JSON.stringify({
    chat_id: chatId,
    text: 'Ассалому алайкум! 🌙\n\nХуш омадед ба «Азкор — ёдоварӣ».\nБарои кушодани барнома тугмаи поёнро пахш кунед.',
    reply_markup: {
      inline_keyboard: [[
        { text: '📖 Кушодани Азкор', web_app: { url: WEBAPP_URL } }
      ]]
    }
  });

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const https = require('https');
  const req = https.request(options, () => {});
  req.write(payload);
  req.end();
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200);
    res.end('Azkor bot is alive');
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const update = JSON.parse(body);
        const message = update.message;
        if (message && message.text === '/start') {
          sendMessage(message.chat.id);
        }
      } catch (e) {}
      res.writeHead(200);
      res.end('ok');
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log('Azkor bot server started on port ' + PORT);
});
