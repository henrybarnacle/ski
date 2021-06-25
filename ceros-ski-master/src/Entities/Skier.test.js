import "babel-polyfill";
import { Skier } from "./Skier";

const skier = new Skier(0, 0);

it('should turn skier left upon pressing left key after crash', () => {
    skier.setDirection(0);
    skier.turnLeft();
    expect(skier.direction).toEqual(1);
});

it('should turn skier right upon pressing right key after crash', () => {
    skier.setDirection(0);
    skier.turnRight();
    expect(skier.direction).toEqual(5);
});


