const express = require('express');
const ngrok = require('ngrok');
const app = express();
const path = require('path');
const gameFactory = require('./gameFactory')


app.use(express.static(path.join(__dirname, 'public')));

app.post('/newGame', (req, res) => {
    const newGame = gameFactory.new();
    return newGame.id;
});

app.post('/turn', (req, res) => {
    const { player, hash } = req.body;
    const game = gameFactory.get(hash);
    if (game.curent)
    return newGame.id;
});

const server = app.listen(3001, async () => {
    const url = await ngrok.connect({
        addr: 3001, 
        authtoken: "246INBy2WXSMMefLDpNWMl01Y2L_5frsF7LG19NEjaLmwGYjM"  
    });
    console.log(`Listening on ${url}`);
});
