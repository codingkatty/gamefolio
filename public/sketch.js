let canvas;
let texture;
let tilemap;

let player_idle = [];
let player_left = [];
let player_right = [];

let map = [
    [3, 2, 1, 17, 18, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 19, 27, 28, 8, 5, 5, 5, 9, 1, 3, 1, 2, 1, 1, 1, 3, 1, 2],
    [1, 7, 5, 5, 5, 6, 11, 12, 13, 10, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1],
    [1, 2, 1, 1, 2, 1, 21, 22, 23, 10, 3, 1, 3, 1, 1, 2, 1, 3, 2, 1],
    [3, 1, 3, 1, 1, 1, 31, 32, 33, 10, 1, 3, 1, 1, 3, 1, 3, 1, 1, 2],
    [1, 7, 5, 5, 5, 5, 5, 5, 5, 6, 2, 1, 1, 2, 1, 1, 1, 3, 1, 1],
    [2, 1, 2, 1, 1, 1, 1, 3, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1]
];

let map_stuff = [
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 29, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 14, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
]

let col_list = [22, 23, 24, 25, 31, 32, 33, 34, 35, 36, 12, 13, 15, 16, 4, 17, 18];
let inte_list = [27, 28, 29, 19, 11];

let cameraX = -300;
let cameraY = 0;

let lastCameraX = -300;
let lastCameraY = 0;

let playerX, playerY;

let camXSpeed = 3;
let camYSpeed = 3;

let frame = 0;
let pool_state = true;

let player_state = 'idle';
let player_cos = 0;
let prollylast = 'left';

function preload() {
    texture = loadImage('assets/tilemap.png')

    player_idle[0] = loadImage('assets/player-idle1.png');
    player_idle[1] = loadImage('assets/player-idle2.png');
    player_idle[2] = loadImage('assets/player-idle3.png');
    player_idle[3] = loadImage('assets/player-idle4.png');

    player_left[0] = loadImage('assets/player-left1.png');
    player_left[1] = loadImage('assets/player-left2.png');
    player_left[2] = loadImage('assets/player-left3.png');
    player_left[3] = loadImage('assets/player-left4.png');

    player_right[0] = loadImage('assets/player-right1.png');
    player_right[1] = loadImage('assets/player-right2.png');
    player_right[2] = loadImage('assets/player-right3.png');
    player_right[3] = loadImage('assets/player-right4.png');
}

function setup() {
    canvas = createAdaptiveCanvas(900, 600);
    canvas.parent('game');

    noSmooth();

    tilemap = new Tilemap([0, 0], [5000, 5000], [32, 32], texture, []);
    items = new Tilemap([0, 0], [5000, 5000], [32, 32], texture, []);

    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++)
            tilemap.tiles.push([j * 33, i * 33, 32, 32])

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            tilemap.tilemap[x][y] = map[y][x];
        }
    }

    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++)
            items.tiles.push([j * 33, i * 33, 32, 32])

    for (let y = 0; y < map_stuff.length; y++) {
        for (let x = 0; x < map_stuff[y].length; x++) {
            items.tilemap[x][y] = map_stuff[y][x];
        }
    }

    playerX = scaler.width() / 2;
    playerY = scaler.height() / 2;
}

function getTileAt(worldX, worldY) {
    const tileWidth = tilemap.size[0] / tilemap.res[0];
    const tileHeight = tilemap.size[1] / tilemap.res[1];
    const col = Math.floor(worldX / tileWidth);
    const row = Math.floor(worldY / tileHeight);
    if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {
        return null;
    }
    return map[row][col];
}

function getPlayerTile(offsetX = 0, offsetY = 0) {
    const playerSize = 64;
    const centerX = playerX + playerSize / 2;
    const centerY = playerY + playerSize / 2;
    const worldX = cameraX + centerX + offsetX;
    const worldY = cameraY + centerY + offsetY;
    return getTileAt(worldX, worldY);
}

function isCollidingTile(offsetX = 0, offsetY = 0) {
    const tile = getPlayerTile(offsetX, offsetY);
    return tile !== null && col_list.includes(tile);
}

function isCollidingInteractable(offsetX = 0, offsetY = 0) {
    const tile = getPlayerTile(offsetX, offsetY);
    return tile !== null && inte_list.includes(tile);
}

function moveCharacter() {
    lastCameraX = cameraX;
    lastCameraY = cameraY;


    if (keyIsDown("W".charCodeAt(0))) {
        if (!isCollidingTile(0, -34) && !isCollidingInteractable(0, -20)) {
            cameraY -= camYSpeed;
        }

        player_state = prollylast;
    }

    if (keyIsDown("S".charCodeAt(0))) {
        if (!isCollidingTile(0, 34) && !isCollidingInteractable(0, 20)) {
            cameraY += camYSpeed;
        }

        player_state = prollylast;
    }

    if (keyIsDown("A".charCodeAt(0))) {
        if (!isCollidingTile(-34, 0) && !isCollidingInteractable(-34, 0)) {
            cameraX -= camXSpeed;
        }

        if (isCollidingInteractable(0, 0)) {
            cameraX -= camXSpeed;
        }

        prollylast = 'left';
        player_state = prollylast;
    }

    if (keyIsDown("D".charCodeAt(0))) {
        if (!isCollidingTile(34, 0) && !isCollidingInteractable(34, 0)) {
            cameraX += camXSpeed;
        }

        if (isCollidingInteractable(0, 0)) {
            cameraX += camXSpeed;
        }

        prollylast = 'right';
        player_state = prollylast;
    }

    if (!keyIsDown("W".charCodeAt(0)) && !keyIsDown("S".charCodeAt(0)) &&
        !keyIsDown("A".charCodeAt(0)) && !keyIsDown("D".charCodeAt(0))) {
        player_state = 'idle';
    }

    tilemap.pos = [-cameraX, -cameraY];
    items.pos = [-cameraX, -cameraY];
}

function drawPlayer(x, y, costume) {
    image(costume, x, y, 100, 200);
}

function draw() {
    background(185, 237, 120);

    moveCharacter();

    tilemap.display();

    if (frame % 30 == 0) {
        pool_state = !pool_state;
    }
    if (frame % 15 == 0) {
        player_cos += 1;
        if (player_cos > 3) {
            player_cos = 0;
        }
    }
    frame++;

    if (player_state === 'idle') {
        drawPlayer(playerX, playerY, player_idle[player_cos]);
    } else if (player_state === 'left') {
        drawPlayer(playerX, playerY, player_left[player_cos]);
    } else if (player_state === 'right') {
        drawPlayer(playerX, playerY, player_right[player_cos]);
    }

    items.display();


    if (pool_state) {
        map[2] = [1, 7, 5, 5, 5, 6, 11, 15, 16, 10, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1]
        map[3] = [1, 2, 1, 1, 2, 1, 24, 25, 26, 10, 3, 1, 3, 1, 1, 2, 1, 3, 2, 1]
        map[4] = [3, 1, 3, 1, 1, 1, 34, 35, 36, 10, 1, 3, 1, 1, 3, 1, 3, 1, 1, 2]
    } else {
        map[2] = [1, 7, 5, 5, 5, 6, 11, 12, 13, 10, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1]
        map[3] = [1, 2, 1, 1, 2, 1, 21, 22, 23, 10, 3, 1, 3, 1, 1, 2, 1, 3, 2, 1]
        map[4] = [3, 1, 3, 1, 1, 1, 31, 32, 33, 10, 1, 3, 1, 1, 3, 1, 3, 1, 1, 2]
    }
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            tilemap.tilemap[x][y] = map[y][x];
        }
    }
}
