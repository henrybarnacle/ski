export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RAMP = 'ramp';
export const JUMP_ONE = 'jump1';
export const JUMP_TWO = 'jump2';
export const JUMP_THREE = 'jump3';
export const JUMP_FOUR = 'jump4';
export const JUMP_FIVE = 'jump5';
export const RUN_LEFT = 'rhinoRunLeft';
export const RUN_RIGHT = 'rhinoRunRight';
export const LIFT = 'rhinoLift';
export const LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const LIFT_EAT_1 = 'rhinoLiftEat';
export const LIFT_EAT_2 = 'rhinoLiftEat2';
export const LIFT_EAT_3 ='rhinoLiftEat';
export const LIFT_EAT_4 = 'rhinoLiftEat4';
export const DEFAULT ='rhinoDefault';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [RAMP]: 'img/jump_ramp.png',
    [JUMP_ONE]: 'img/skier_jump_1.png',
    [JUMP_TWO]: 'img/skier_jump_2.png',
    [JUMP_THREE]: 'img/skier_jump_3.png',
    [JUMP_FOUR]: 'img/skier_jump_4.png',
    [JUMP_FIVE]: 'img/skier_jump_5.png',
    [RUN_LEFT]: 'img/rhino_run_left.png',
    [RUN_RIGHT]: 'img/rhino_run_left_2.png',
    [LIFT]: 'img/rhino_lift.png',
    [LIFT_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
    [LIFT_EAT_1]: 'img/rhino_lift_eat_1.png',
    [LIFT_EAT_2]: 'img/rhino_lift_eat_2.png',
    [LIFT_EAT_3]: 'img/rhino_lift_eat_3.png',
    [LIFT_EAT_4]: 'img/rhino_lift_eat_4.png',
    [DEFAULT]: 'img/rhino_default.png'
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5,
    JUMP_ONE: 6,
    JUMP_TWO: 7
};

export const RHINO_DIRECTIONS = {
RUN_LEFT: 8,
RUN_RIGHT: 9,
LIFT: 10,
LIFT_MOUTH_OPEN: 11,
LIFT_EAT_1: 12,
LIFT_EAT_2: 13,
LIFT_EAT_3: 14,
LIFT_EAT_4: 15,
DEFAULT: 16
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMP_ONE]: JUMP_ONE,
    [SKIER_DIRECTIONS.JUMP_TWO] : JUMP_TWO
};

export const RHINO_DIRECTION_ASSET = {
    [RHINO_DIRECTIONS.RUN_LEFT] : RUN_LEFT,
    [RHINO_DIRECTIONS.RUN_RIGHT] : RUN_RIGHT,
    [RHINO_DIRECTIONS.LIFT] : LIFT,
    [RHINO_DIRECTIONS.LIFT_MOUTH_OPEN] : LIFT_MOUTH_OPEN,
    [RHINO_DIRECTIONS.LIFT_EAT_1] : LIFT_EAT_1,
    [RHINO_DIRECTIONS.LIFT_EAT_2] : LIFT_EAT_2,
    [RHINO_DIRECTIONS.LIFT_EAT_3]: LIFT_EAT_3,
    [RHINO_DIRECTIONS.LIFT_EAT_4] : LIFT_EAT_4,
    [RHINO_DIRECTIONS.DEFAULT] : DEFAULT
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    SPACE: 32
};