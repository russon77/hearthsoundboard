const request = require('request');
const fs = require('fs');

function findAudio(card) {
  return new Promise((resolve, reject) => {
    request(`http://www.hearthhead.com/cards/${card.name.replace(' ', '-').toLowerCase()}`, (err, res, body) => {
      if (err) { console.log(err); reject(); }

      body.split('\n').forEach(
        line => {
          if (line.includes('window.HearthHeadData')) {
            const apiData = JSON.parse(line.split('=')[1].split(';')[0]).card;

            card.audio = {
              death: 'https://media.services.zam.com/v1/media/byName' + apiData.media.filter(media => media.type === 'DEATH_SOUND')[0].url,
              attack: 'https://media.services.zam.com/v1/media/byName' + apiData.media.filter(media => media.type === 'ATTACK_SOUND')[0].url,
              summon: 'https://media.services.zam.com/v1/media/byName' + apiData.media.filter(media => media.type === 'PLAY_SOUND')[0].url
            };
          }
        }
      );

      resolve();
    });
  });
}

request('https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }

  // filter to minions only and remove all unnecessary properties
  body = body.filter(card => card.type === 'MINION').map(card => ({name: card.name, cardClass: card.cardClass, id: card.id, rarity: card.rarity}));

  const promises = [];

  for (let i = 0; i < 1; i++) {
    promises.push(findAudio(body[i]));
  }

  Promise.all(promises).then(results => fs.writeFileSync('cards.db.json', JSON.stringify(body), 'utf8'));

  // Promise.all(body.map(card => findAudio(card))).then(results => fs.writeFileSync('cards.db.json', JSON.stringify(body), 'utf8'));
});
