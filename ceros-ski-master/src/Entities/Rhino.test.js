import "babel-polyfill";
import { Rhino } from "./Rhino";
import { Skier } from "./Skier";

const skier = new Skier(0, 0);
const rhino = new Rhino(0, 0);

it('should kill skier', () => {
    rhino.skierCaught(skier) 
    expect(skier.alive).toEqual(false);
});

it('should eat skier', () => {
    jest.useFakeTimers();
    rhino.eatSkier();
    jest.advanceTimersByTime(4000);
    expect(rhino.hasEatenSkier).toEqual(true);
});

