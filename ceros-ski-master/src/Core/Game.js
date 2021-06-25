import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";

import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino;
        this.rhinoArrive = 4;
        this.time = 0;
        this.obstacleManager = new ObstacleManager();
        this.currentGame;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
        let rhinoTime = setInterval(() => {
            this.time += 1;
            if (this.time >= this.rhinoArrive) {
                let skierPosition = this.skier.getPosition();
                this.rhino = new Rhino(skierPosition.x -400,skierPosition.y -400);
                this.rhino.huntSkier(this.skier, this.assetManager);
                clearInterval(rhinoTime);
            }
        }, 1000);
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();
        this.updateGameWindow();
        this.drawGameWindow();
        this.currentGame = requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();
        if (this.rhino) {
            this.rhino.move();
        }
        let previousGameWindow;
        if (this.gameWindow !== null) {
            previousGameWindow = this.gameWindow;
            this.calculateGameWindow();
        } else {
            this.calculateGameWindow();
            previousGameWindow = this.gameWindow;
        }
        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        if (this.rhino && this.rhino.hasEatenSkier) {
            setTimeout(() => {
                cancelAnimationFrame(this.currentGame);
                this.endGame();
            }, 1000);
        }
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        if (this.skier.alive) {
            this.skier.draw(this.canvas, this.assetManager);
        }
        if (this.rhino) {
            this.rhino.draw(this.canvas, this.assetManager);
        }
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 1.5);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 1.5);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    endGame() {
        const highScore = localStorage.getItem('skiHighScore');
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT/2)
        this.canvas.ctx.font = "56px Arial";
        if (highScore && parseInt(highScore, 10) > this.skier.score) {
            this.canvas.ctx.fillStyle = "red";
            this.canvas.ctx.fillText(" Game Over! Score: "+ this.skier.score, 100, 100);
        } else {
            this.canvas.ctx.fillStyle = "limegreen";
            this.canvas.ctx.fillText(" Game Over! New High Score! : "+ this.skier.score, 100, 100);
            localStorage.setItem('skiHighScore', this.skier.score);
        }
    }

    handleKeyDown(event) {
        if (this.skier.alive) {
            switch(event.which) {
                case Constants.KEYS.LEFT:
                    this.skier.turnLeft();
                    event.preventDefault();
                    break;
                case Constants.KEYS.RIGHT:
                    this.skier.turnRight();
                    event.preventDefault();
                    break;
                case Constants.KEYS.UP:
                    this.skier.turnUp();
                    event.preventDefault();
                    break;
                case Constants.KEYS.DOWN:
                    this.skier.turnDown();
                    event.preventDefault();
                    break;
                case Constants.KEYS.SPACE:
                    this.skier.jump();
                    event.preventDefault();
                    break;
            }
        }
    }
}