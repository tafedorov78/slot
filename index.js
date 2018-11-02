import * as PIXI from 'pixi.js';
import Game from './src/Game.js';

const app = new PIXI.Application(window.innerWidth,
    window.innerHeight,
    { backgroundColor: 0x383b3d });

document.body.style.margin = 0;
document.body.appendChild(app.view);

const game = new Game(app);
app.stage.addChild(game);

window.onResize = () => {
    app.resize(window.innerWidth, window.innerHeight);
};
