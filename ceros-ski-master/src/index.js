import '../css/game.css';
import { Game } from './Core/Game.js';

document.querySelector('button').addEventListener('click', startGame);
function startGame() {
    console.log('start');
    const skiGame = new Game();
    console.log('started');
    skiGame.load().then(() => {
        skiGame.init();
        skiGame.run();
    });
}