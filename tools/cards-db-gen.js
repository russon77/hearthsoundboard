const request = require('request');
const fs = require('fs');

request('https://api.hearthstonejson.com/v1/latest/enUS/cards.json', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }

  body = body.filter(card => card.type === 'MINION').map(card => ({name: card.name, cardClass: card.cardClass, id: card.id, rarity: card.rarity}));

  fs.writeFileSync('cards.db.json', JSON.stringify(body), 'utf8');
});
