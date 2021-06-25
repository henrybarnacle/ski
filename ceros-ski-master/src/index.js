import '../css/game.css';
import { Game } from './Core/Game.js';

document.querySelector('button').addEventListener('click', startGame);
function startGame() {
    const skiGame = new Game();
    skiGame.load().then(() => {
        skiGame.init();
        skiGame.run();
    });
}