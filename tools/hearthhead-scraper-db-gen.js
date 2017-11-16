const request = require('request');
const fs = require('fs');

function scrape(card) {
  return new Promise((resolve, reject) => {
    let cardName;

    switch (card.name) {
      case 'Tomb Lurker':
        cardName = 'tomb-lurker-1';
        break;
      case 'Acolyte of Agony':
        cardName = 'acolyte-of-agony-1';
        break;
      case 'Bearshark':
        cardName = 'bearshark-1';
        break;
      default:
        cardName = card.name;
    }

    request(`http://www.hearthhead.com/cards/${cardName.replace(/ /g, '-').replace(/[,':]/g, '').toLowerCase()}`, (err, res, body) => {
      if (err) { console.log(err); reject(); return; }

      body.split('\n').forEach(
        line => {
          if (line.includes('window.HearthHeadData')) {
            let apiData = null;
            let stringy = null;

            try {
              stringy = line.slice(line.indexOf('=') + 1);
              stringy = stringy.replace(/;/g, '');

              apiData = JSON.parse(stringy);

              apiData = apiData.card;

              card.hh = apiData;
            } catch (e) {
              console.log('error in parsing', e);
              console.log(line);
              console.log(stringy);
            }
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

  for (let i = 0; i < body.length; i++) {
    promises.push(scrape(body[i]));
  }

  Promise.all(promises).then(results => {
    body.forEach(
      card => {
        if (Object.keys(card).length < 5) {
          console.log('ISSUE: ', card.name);
        }
      }
    );

    fs.writeFileSync('cards.hh.db.json', JSON.stringify(body), 'utf8');
  });
});
