import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    jumpActivated = false;
    jumpInProgress = false;
    alive = true;
    score = 0;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        }
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();

        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        }
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        this.jumpActivated = true;
        setTimeout(()=> {
            this.jumpActivated = false;
        }, 500);
    }

    checkIfJumpActivated(jumpStyle) {
        if (this.jumpActivated) {
            this.jumpInProgress = true;
            this.assetName = Constants.SKIER_DIRECTION_ASSET[jumpStyle];
            setTimeout(() => {
                this.updateAsset();
                this.score += 200;
                this.jumpInProgress = false;
            }, 1000);
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        if (!this.alive) {return;}
        let ramp = false;
        let rock = false;
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstacleName = obstacle.getAssetName();
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );
            ramp = obstacleName === 'ramp';
            rock = (obstacleName === 'rock1' || obstacleName === 'rock2');
            return intersectTwoRects(skierBounds, obstacleBounds);
        });
        if (collision && rock && this.jumpInProgress) {
            this.score += 1000;
            this.checkIfJumpActivated(7);
        } else if (collision && !ramp) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        } else if (collision && ramp) {
            this.checkIfJumpActivated(6);
        }
    };
}