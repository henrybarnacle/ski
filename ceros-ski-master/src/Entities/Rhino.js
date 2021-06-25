import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RUN_LEFT;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    hasEatenSkier = false;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    huntSkier(skier, assetManager) {
        let runLeft = false;
        let skierPosition = skier.getPosition();
        let animate = setInterval(() => {
            if (runLeft) {
                this.assetName = Constants.RUN_RIGHT;
                runLeft = false;
            } else {
                this.assetName = Constants.RUN_LEFT;
                runLeft = true;
            }
        }, 500);
         let hunt = setInterval(() => {
            skierPosition = skier.getPosition();
            if (this.x < skierPosition.x) {
                this.speed = Constants.SKIER_STARTING_SPEED;
                this.x += (skier.direction === 2) ? this.speed*2 : this.speed * 4;
            } else if (this.x > skierPosition.x) {
                this.speed = Constants.SKIER_STARTING_SPEED;
                this.x -= (skier.direction === 4) ? this.speed*2 : this.speed * 4;
            } 
            if (this.y < skierPosition.y) {
                this.y += this.speed*2;
                this.speed = Constants.SKIER_STARTING_SPEED;
            } else if (this.y >= skierPosition.y) {
                this.y = skierPosition.y;
                this.speed = 0;
            }
            if (this.checkIfSkierCaught(skier, skierPosition, assetManager)) {
                skier.direction = null;
                this.skierCaught(skier);
                clearInterval(hunt);
                clearInterval(animate);
            }
        }, 100);
    }  

    skierCaught(skier) {
        skier.alive = false;
        this.speed = 0;
        skier.assetName = Constants.SKIER_CRASH;
        skier.speed = 0;
        this.x = skier.x;
        this.y = skier.y;
        this.eatSkier();
    }

    checkIfSkierCaught(skier, skierPosition, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierAsset = assetManager.getAsset(skier.assetName);
        const rhinoBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );
        const skierBounds = new Rect(
            skierPosition.x - skierAsset.width / 2,
            skierPosition.y - skierAsset.height / 2,
            skierPosition.x + skierAsset.width / 2,
            skierPosition.y
        );
        return intersectTwoRects(rhinoBounds, skierBounds);
    }

    eatSkier() {
        let eatFrame = 8;
        let eat = setInterval(() => {
            this.assetName = Constants.RHINO_DIRECTION_ASSET[eatFrame];
            eatFrame ++;
            if (eatFrame > 15) {
                this.hasEatenSkier = true;
                clearInterval(eat);
            }
        }, 500);
    }

    updateAsset() {
        this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
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
}