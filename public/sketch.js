let canvas;
let texture;
let tilemap;

let map = [
    [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let cameraX = 0;
let cameraY = 0;

let lastCameraX = 0;
let lastCameraY = 0;

let playerX, playerY;

let camXSpeed = 3;
let camYSpeed = 3;
let plXSpeed = 3;
let plYSpeed = 3;

function preload() {
    texture = loadImage('assets/tilemap.png')
}

function setup() {
    canvas = createAdaptiveCanvas(900, 600);
    canvas.parent('game');

    noSmooth();

    tilemap = new Tilemap([0, 0], [5000, 5000], [32, 32], texture, []);
    
    for (let i = 0; i < 20; i++)
        for (let j = 0; j < 20; j++)
            tilemap.tiles.push([j * 33, i * 33, 32, 32])

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            tilemap.tilemap[x][y] = map[y][x];
        }
    }

    playerX = scaler.width() / 2;
    playerY = scaler.height() / 2;
}

function checkXBoundaries(camX) {
    return camX >= 0 && camX <= 81.25 * map[0].length;
}

function checkYBoundaries(camY) {
    return camY >= 0 && camY <= 56 * map.length;
}

function moveCharacter() {
    lastCameraX = cameraX;
    lastCameraY = cameraY;

    if(keyIsDown("W".charCodeAt(0))) {
        cameraY -= camYSpeed;
    }

    if(keyIsDown("S".charCodeAt(0))) {
        cameraY += camYSpeed;
    }

    if(keyIsDown("A".charCodeAt(0))) {
        cameraX -= camXSpeed;
    }

    if(keyIsDown("D".charCodeAt(0))) {
        cameraX += camXSpeed;
    }

    if (!checkXBoundaries(cameraX)) {
        cameraX = lastCameraX;
    }

    if (!checkYBoundaries(cameraY)) {
        cameraY = lastCameraY;
    }

    tilemap.pos = [-cameraX, -cameraY];
}

function movePlayerBoundX() {
    if (keyIsDown("A".charCodeAt(0))) {
        playerX -= 3;
    }

    if (keyIsDown("D".charCodeAt(0))) {
        playerX += 3;
    }

    if (playerX < 0) {
        playerX = 0;
    } else if (playerX > scaler.width() - 32) {
        playerX = scaler.width() - 32;
    }
}

function movePlayerBoundY() {
    if (keyIsDown("W".charCodeAt(0))) {
        playerY -= 3;
    }

    if (keyIsDown("S".charCodeAt(0))) {
        playerY += 3;
    }

    if (playerY < 0) {
        playerY = 0;
    } else if (playerY > scaler.height() - 32) {
        playerY = scaler.height() - 32;
    }
}

function drawPlayer(x, y) {
    if (checkXBoundaries(cameraX)) {
        movePlayerBoundX();
    }
    if (!checkYBoundaries(cameraY)) {
        movePlayerBoundY();
        camYSpeed = 0;
    } else {
        camYSpeed = 3;
    }
    
    fill(255, 0, 0);
    rect(x, y, 32, 32);
}

function draw() {
    background(220);

    moveCharacter();
    
    tilemap.display();
    drawPlayer(playerX, playerY);
}
