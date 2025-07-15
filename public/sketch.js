let canvas;
let texture;
let tilemap;

let map = [
    [3, 2, 1, 17, 18, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 19, 27, 28, 8, 5, 5, 5, 9, 1, 3, 1, 2, 1, 1, 1, 3, 1, 2],
    [1, 7, 5, 5, 5, 6, 11, 12, 13, 10, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1],
    [1, 2, 1, 1, 2, 1, 21, 22, 23, 10, 3, 1, 3, 1, 1, 2, 1, 3, 2, 1],
    [3, 1, 3, 1, 1, 1, 31, 32, 33, 10, 1, 3, 1, 1, 3, 1, 3, 1, 1, 2],
    [1, 7, 5, 5, 5, 5, 5, 5, 5, 6, 2, 1, 1, 2, 1, 1, 1, 3, 1, 1],
    [2, 1, 2, 1, 1, 1, 1, 3, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1]
];

let col_list = [22, 23, 24, 25, 31, 32, 33, 34, 35, 36, 12, 13, 15, 16, 4, 17, 18];
let inte_list = [27, 28, 29];

let cameraX = -300;
let cameraY = 0;

let lastCameraX = -300;
let lastCameraY = 0;

let playerX, playerY;

let camXSpeed = 4;
let camYSpeed = 4;

let frame = 0;
let pool_state = true;

function preload() {
    texture = loadImage('assets/tilemap.png')
}

function setup() {
    canvas = createAdaptiveCanvas(900, 600);
    canvas.parent('game');

    noSmooth();

    tilemap = new Tilemap([0, 0], [5000, 5000], [32, 32], texture, []);

    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++)
            tilemap.tiles.push([j * 33, i * 33, 32, 32])

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            tilemap.tilemap[x][y] = map[y][x];
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
        if (!isCollidingTile(0, -34) && !isCollidingInteractable(0, 40)) {
            cameraY -= camYSpeed;
        }
    }

    if (keyIsDown("S".charCodeAt(0))) {
        if (!isCollidingTile(0, 34) && !isCollidingInteractable(0, 40)) {
            cameraY += camYSpeed;
        }

        if (isCollidingInteractable(0, 40)) {
            cameraY += camYSpeed;
        }
    }

    if (keyIsDown("A".charCodeAt(0))) {
        if (!isCollidingTile(-34, 0) && !isCollidingInteractable(-34, 0)) {
            cameraX -= camXSpeed;
        }

        if (isCollidingInteractable(0, 40)) {
            cameraX -= camXSpeed;
        }
    }

    if (keyIsDown("D".charCodeAt(0))) {
        if (!isCollidingTile(34, 0) && !isCollidingInteractable(34, 0)) {
            cameraX += camXSpeed;
        }

        if (isCollidingInteractable(0, 40)) {
            cameraX += camXSpeed;
        }
    }

    tilemap.pos = [-cameraX, -cameraY];
}

function drawPlayer(x, y) {
    fill(255, 0, 0);
    rect(x, y, 64, 64);
}

function draw() {
    background(185, 237, 120);

    moveCharacter();

    tilemap.display();
    drawPlayer(playerX, playerY);

    if (frame % 30 == 0) {
        pool_state = !pool_state;
    }

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
    frame++;
}
