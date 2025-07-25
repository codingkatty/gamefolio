let canvas;
let texture;
let tilemap;

let player_idle = [];
let player_left = [];
let player_right = [];
let player_front = [];
let player_back = [];
let player_dance = [];
let player_shadow;

let e;
let pixellari;
let modal;
let myself;
let sounds = [];
let crntsi = 0;
let rainingtacos;
let taco;

let map = [
    [3, 2, 1, 17, 18, 41, 42, 43, 44, 45, 46, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 19, 27, 28, 8, 5, 5, 5, 9, 51, 3, 1, 2, 1, 1, 1, 3, 1, 2],
    [1, 7, 5, 5, 5, 6, 11, 12, 13, 10, 52, 1, 2, 61, 67, 67, 67, 62, 1, 1],
    [1, 2, 1, 1, 2, 1, 21, 22, 23, 10, 51, 1, 3, 66, 65, 65, 65, 68, 2, 1],
    [3, 1, 3, 1, 1, 54, 31, 32, 33, 10, 53, 3, 1, 63, 69, 69, 69, 64, 1, 2],
    [1, 7, 5, 5, 5, 5, 5, 5, 5, 6, 51, 1, 1, 2, 1, 1, 1, 3, 1, 1],
    [2, 1, 2, 1, 1, 1, 1, 3, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1]
];

let map_stuff = [
    [20, 20, 20, 37, 38, 41, 42, 43, 44, 45, 46, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 29, 47, 48, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 14, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 55, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
]

let slct_detector = {
    about: [27, 28, 17, 18],
    mail: [19],
    bb_catesc: [41],
    bb_meowpad: [42],
    bb_organisr: [43],
    bb_y2k: [44],
    bb_aries: [45],
    bb_dodo: [46],
    jukebox: [54]
}

let col_list = [22, 23, 24, 25, 31, 32, 33, 34, 35, 36, 12, 13, 15, 16, 4, 17, 18];
let inte_list = [27, 28, 29, 19, 11, 41, 42, 43, 44, 45, 46, 54];

let cameraX = -300;
let cameraY = -200;

let lastCameraX = -300;
let lastCameraY = -200;
let lastState = 'idle';

let playerX, playerY;

let camXSpeed = 4;
let camYSpeed = 4;

let frame = 0;
let pool_state = true;

let player_state = 'idle';
let player_cos = 0;
let playerTile;

let crntModal = "";
let thetext = [];
let rainbow;

function preload() {
    texture = loadImage('public/assets/tilemap.png')

    player_idle[0] = loadImage('public/assets/player-idle1.png');
    player_idle[1] = loadImage('public/assets/player-idle2.png');
    player_idle[2] = loadImage('public/assets/player-idle3.png');
    player_idle[3] = loadImage('public/assets/player-idle4.png');

    player_left[0] = loadImage('public/assets/player-left1.png');
    player_left[1] = loadImage('public/assets/player-left2.png');
    player_left[2] = loadImage('public/assets/player-left3.png');
    player_left[3] = loadImage('public/assets/player-left4.png');

    player_right[0] = loadImage('public/assets/player-right1.png');
    player_right[1] = loadImage('public/assets/player-right2.png');
    player_right[2] = loadImage('public/assets/player-right3.png');
    player_right[3] = loadImage('public/assets/player-right4.png');

    player_front[0] = loadImage('public/assets/player-front1.png');
    player_front[1] = loadImage('public/assets/player-front2.png');
    player_front[2] = loadImage('public/assets/player-front3.png');
    player_front[3] = loadImage('public/assets/player-front4.png');

    player_back[0] = loadImage('public/assets/player-back1.png');
    player_back[1] = loadImage('public/assets/player-back2.png');
    player_back[2] = loadImage('public/assets/player-back3.png');
    player_back[3] = loadImage('public/assets/player-back4.png');

    player_dance[0] = loadImage('public/assets/player-dance1.png');
    player_dance[1] = loadImage('public/assets/player-dance2.png');
    player_dance[2] = loadImage('public/assets/player-dance3.png');
    player_dance[3] = loadImage('public/assets/player-dance4.png');

    player_shadow = loadImage('public/assets/player-shadow.png');

    e = loadImage('public/assets/e.png');
    pixellari = loadFont('public/assets/Pixellari.ttf');
    modal = loadImage('public/assets/modal.png');
    myself = loadImage('public/assets/myself.png');

    sounds[0] = loadSound('public/assets/caketown.mp3');
    sounds[0].setVolume(0.2);
    sounds[1] = loadSound('public/assets/petsim.mp3');
    sounds[1].setVolume(0.2);
    sounds[2] = loadSound('public/assets/settlingin.mp3');
    sounds[2].setVolume(0.2);

    rainingtacos = loadSound('public/assets/rainingtacos.mp3');
    rainingtacos.setVolume(0.6);
    taco = loadImage('public/assets/taco.png');
}

function setup() {
    canvas = createAdaptiveCanvas(900, 600);
    canvas.parent('game');

    noSmooth();
    frameRate(60);
    imageMode(CENTER);
    rainbow = color(255, 0, 0);

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
    socket.emit('move', { x: cameraX, y: cameraY, state: player_state });

    userStartAudio();
    playSong();
}

let crntSong;
let isBg = true;
function playSong() {
    crntSong = sounds[crntsi];

    crntSong.onended(() => {
        if (isBg) {
            crntsi = (crntsi + 1) % sounds.length;
            playSong();
        }
    });
    crntSong.play();
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

let partyl = [];
for (let i = 61; i <= 99; i++) {
    partyl.push(i);
}

function isCollidingParty(offsetX = 0, offsetY = 80) {
    const tile = getPlayerTile(offsetX, offsetY);
    return tile !== null && partyl.includes(tile);
}

let tacopos = [];
function drawTaco() {
    for (const pos of tacopos) {
        push();
        translate(pos[0], pos[1]);
        rotate(pos[3]);
        image(taco, 0, 0, pos[2], pos[2]);
        pop();
    }
}

function updateTaco() {
    for (let i = tacopos.length - 1; i >= 0; i--) {
        const pos = tacopos[i];
        pos[1] += pos[2] / 10;
        pos[3] += 0.05;
        if (pos[1] > height) {
            tacopos.splice(i, 1);
        }
    }
}

function isClose(tiles) {
    for (const tile of tiles) {
        if (playerTile.includes(tile)) {
            return true;
        }
    }
    return false;
}

function drawInteractE(name) {
    textSize(40);
    fill(0);
    textFont(pixellari);
    text(`interact: ${name}`, 110, 550);

    image(e, 60, scaler.height() - 65, 80, 80);
}

function teleporter() {
    if (playerTile.includes(21) || playerTile.includes(24)) {
        textSize(40);
        fill(0);
        textFont(pixellari);
        text("teleport to github", 110, 550);

        image(e, 60, scaler.height() - 65, 80, 80);

        if (keyIsDown("E".charCodeAt(0))) {
            window.open("https://github.com/codingkatty/gamefolio", "_blank");
        }
    }
}

function moveCharacter() {
    lastCameraX = cameraX;
    lastCameraY = cameraY;
    lastState = player_state;


    if (keyIsDown("W".charCodeAt(0))) {
        if (!isCollidingTile(0, 0) && !isCollidingInteractable(0, -40)) {
            cameraY -= camYSpeed;
        }

        player_state = 'back';
    }

    if (keyIsDown("S".charCodeAt(0))) {
        if (!isCollidingTile(0, 170) && !isCollidingInteractable(0, 30)) {
            cameraY += camYSpeed;
        }

        player_state = 'front';
    }

    if (keyIsDown("A".charCodeAt(0))) {
        if (!isCollidingTile(-34, 0) && !isCollidingInteractable(-34, 0)) {
            cameraX -= camXSpeed;
        }

        if ((isCollidingInteractable(0, 0) || isCollidingTile(0, 0))) {
            cameraX -= camXSpeed;
        }

        player_state = 'left';
    }

    if (keyIsDown("D".charCodeAt(0))) {
        if (!isCollidingTile(34, 0) && !isCollidingInteractable(34, 0)) {
            cameraX += camXSpeed;
        }

        if (isCollidingInteractable(0, 0) || isCollidingTile(0, 0)) {
            cameraX += camXSpeed;
        }

        player_state = 'right';
    }

    if (!keyIsDown("W".charCodeAt(0)) && !keyIsDown("S".charCodeAt(0)) &&
        !keyIsDown("A".charCodeAt(0)) && !keyIsDown("D".charCodeAt(0))) {
        player_state = 'idle';
    }

    if (isCollidingParty()) {
        player_state = 'dance';
        if (isBg) {
            isBg = false;
            crntSong.stop();
            rainingtacos.loop();
        }
    } else {
        if (!isBg) {
            isBg = true;
            rainingtacos.stop();
            playSong();
        }
    }

    tilemap.pos = [-cameraX, -cameraY];
    items.pos = [-cameraX, -cameraY];
    if (cameraX !== lastCameraX || cameraY !== lastCameraY || player_state !== lastState) {
        socket.emit('move', { x: cameraX, y: cameraY, state: player_state });
    }
}

function drawPlayer(x, y, costume) {
    image(player_shadow, x, y, 100, 200);
    image(costume, x, y, 100, 200);
}

function custom_text(textdata, x, y) {
    textAlign(LEFT);
    textSize(20);
    for (let i = 0; i < textdata.length; i++) {
        fill(textdata[i][1] || '#000000');
        if (textdata[i][1] === 'rainbow') {
            fill(rainbow);
        }
        text(textdata[i][0], x, y + i * 30);
    }

}

function drawModal(content) {
    image(modal, scaler.width() / 2, scaler.height() / 2, 194 * 3.3, 124 * 3.3);

    textSize(20);
    textAlign(LEFT);
    fill(0);
    custom_text(content, scaler.width() / 2 - 270, scaler.height() / 2 - 130);

    if (crntModal === 'about') {
        push();
        rotate(0.3);
        translate(-60, 20);
        image(myself, 700, 140, 32 * 3.5, 48 * 3.5);
        pop();
    }

    if (keyIsDown("F".charCodeAt(0))) {
        if (crntModal === 'catesc') {
            window.open("https://escape.violetzcandy.com/", "_blank");
        } else if (crntModal === 'meowpad') {
            window.open("https://github.com/codingkatty/meowpad", "_blank");
        } else if (crntModal === 'organisr') {
            window.open("https://github.com/codingkatty/organisr", "_blank");
        } else if (crntModal === 'y2k') {
            window.open("https://github.com/codingkatty/y2kos", "_blank");
        } else if (crntModal === 'aries') {
            window.open("https://github.com/codingkatty/aries", "_blank");
        } else if (crntModal === 'dodo') {
            window.open("https://github.com/codingkatty/extension", "_blank");
        }
    }
}

const deg = Math.PI / 180;

function rotateRGBHue(r, g, b, hue) {
    const cosA = Math.cos(hue * deg);
    const sinA = Math.sin(hue * deg);
    const neo = [
        cosA + (1 - cosA) / 3,
        (1 - cosA) / 3 - Math.sqrt(1 / 3) * sinA,
        (1 - cosA) / 3 + Math.sqrt(1 / 3) * sinA,
    ];
    const rr = r * neo[0] + g * neo[1] + b * neo[2];
    const gg = r * neo[2] + g * neo[0] + b * neo[1];
    const bb = r * neo[1] + g * neo[2] + b * neo[0];
    return [uint8(rr), uint8(gg), uint8(bb)];
}

function uint8(value) {
    return value < 0 ? 0 : value > 255 ? 255 : Math.round(value);
}

function vpt(end) {
    return Number((Math.floor(Math.random() * 4) + 6).toString() + end.toString());
}
let randomRow2 = [];
let randomRow3 = [];
let randomRow4 = [];

let screenX, screenY;
function draw() {
    background(185, 237, 120);

    moveCharacter();

    tilemap.display();

    if (frame % 30 == 0) {
        pool_state = !pool_state;
        randomRow2 = [vpt(1), vpt(7), vpt(7), vpt(7), vpt(2)];
        randomRow3 = [vpt(6), vpt(5), vpt(5), vpt(5), vpt(8)];
        randomRow4 = [vpt(3), vpt(9), vpt(9), vpt(9), vpt(4)];
    }
    if (frame % 15 == 0) {
        player_cos += 1;
        if (player_cos > 3) {
            player_cos = 0;
        }
    }
    frame++;

    // draw other players behind local player
    for (const id in players) {
        if (id == socket.id) continue;
        const p = players[id];
        const otherX = (p.x - cameraX) + playerX;
        const otherY = (p.y - cameraY) + playerY;
        if (otherY < playerY) {
            if (p.state === 'idle') {
                drawPlayer(otherX, otherY, player_idle[player_cos]);
            } else if (p.state === 'left') {
                drawPlayer(otherX, otherY, player_left[player_cos]);
            } else if (p.state === 'right') {
                drawPlayer(otherX, otherY, player_right[player_cos]);
            } else if (p.state === 'front') {
                drawPlayer(otherX, otherY, player_front[player_cos]);
            } else if (p.state === 'back') {
                drawPlayer(otherX, otherY, player_back[player_cos]);
            } else if (player_state === 'dance') {
                drawPlayer(playerX, playerY, player_dance[player_cos]);
            }
        }
    }

    // draw local player
    if (player_state === 'idle') {
        drawPlayer(playerX, playerY, player_idle[player_cos]);
    } else if (player_state === 'left') {
        drawPlayer(playerX, playerY, player_left[player_cos]);
    } else if (player_state === 'right') {
        drawPlayer(playerX, playerY, player_right[player_cos]);
    } else if (player_state === 'front') {
        drawPlayer(playerX, playerY, player_front[player_cos]);
    } else if (player_state === 'back') {
        drawPlayer(playerX, playerY, player_back[player_cos]);
    } else if (player_state === 'dance') {
        drawPlayer(playerX, playerY, player_dance[player_cos]);
    }

    // draw other players in front of local player
    for (const id in players) {
        if (id == socket.id) continue;
        const p = players[id];
        const otherX = (p.x - cameraX) + playerX;
        const otherY = (p.y - cameraY) + playerY;
        if (otherY >= playerY) {
            if (p.state === 'idle') {
                drawPlayer(otherX, otherY, player_idle[player_cos]);
            } else if (p.state === 'left') {
                drawPlayer(otherX, otherY, player_left[player_cos]);
            } else if (p.state === 'right') {
                drawPlayer(otherX, otherY, player_right[player_cos]);
            } else if (p.state === 'front') {
                drawPlayer(otherX, otherY, player_front[player_cos]);
            } else if (p.state === 'back') {
                drawPlayer(otherX, otherY, player_back[player_cos]);
            } else if (player_state === 'dance') {
                drawPlayer(playerX, playerY, player_dance[player_cos]);
            }
        }
    }

    items.display();

    playerTile = [getPlayerTile(0, -60), getPlayerTile(0, 60), getPlayerTile(-60, 0), getPlayerTile(60, 0)];
    teleporter();

    if (isClose(slct_detector.about)) {
        map_stuff[0] = [20, 20, 20, 39, 40, 41, 42, 43, 44, 45, 46, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        drawInteractE('about');
    } else if (isClose(slct_detector.mail)) {
        drawInteractE('mail');
    } else if (isClose(slct_detector.bb_catesc)) {
        drawInteractE('Cat Escape Room');
    } else if (isClose(slct_detector.bb_meowpad)) {
        drawInteractE('Meowpad');
    } else if (isClose(slct_detector.bb_organisr)) {
        drawInteractE('Organisr');
    } else if (isClose(slct_detector.bb_y2k)) {
        drawInteractE('Y2K WebOS');
    } else if (isClose(slct_detector.bb_aries)) {
        drawInteractE('Project Aries');
    } else if (isClose(slct_detector.bb_dodo)) {
        drawInteractE('Dodo Sketchboard');
    }

    if (!isClose(slct_detector.about)) {
        map_stuff[0] = [20, 20, 20, 37, 38, 41, 42, 43, 44, 45, 46, 20, 20, 20, 20, 20, 20, 20, 20, 20]
    }

    if (pool_state) {
        map[2] = [1, 7, 5, 5, 5, 6, 11, 15, 16, 10, 52, 1, 2, randomRow2[0], randomRow2[1], randomRow2[2], randomRow2[3], randomRow2[4], 1, 1];
        map[3] = [1, 2, 1, 1, 2, 1, 24, 25, 26, 10, 51, 1, 3, randomRow3[0], randomRow3[1], randomRow3[2], randomRow3[3], randomRow3[4], 2, 1];
        map[4] = [3, 1, 3, 1, 1, 54, 34, 35, 36, 10, 53, 3, 1, randomRow4[0], randomRow4[1], randomRow4[2], randomRow4[3], randomRow4[4], 1, 2];
    } else {
        map[2] = [1, 7, 5, 5, 5, 6, 11, 12, 13, 10, 52, 1, 2, randomRow2[0], randomRow2[1], randomRow2[2], randomRow2[3], randomRow2[4], 1, 1];
        map[3] = [1, 2, 1, 1, 2, 1, 21, 22, 23, 10, 51, 1, 3, randomRow3[0], randomRow3[1], randomRow3[2], randomRow3[3], randomRow3[4], 2, 1];
        map[4] = [3, 1, 3, 1, 1, 54, 31, 32, 33, 10, 53, 3, 1, randomRow4[0], randomRow4[1], randomRow4[2], randomRow4[3], randomRow4[4], 1, 2];
    }

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            tilemap.tilemap[x][y] = map[y][x];
        }
    }
    for (let y = 0; y < map_stuff.length; y++) {
        for (let x = 0; x < map_stuff[y].length; x++) {
            items.tilemap[x][y] = map_stuff[y][x];
        }
    }

    const [r0, g0, b0] = rotateRGBHue(255, 0, 0, frame);
    rainbow = color(r0, g0, b0);

    if (crntModal !== "") {
        drawModal(thetext);
    }

    if (isCollidingParty()) {
        if (frame % 20 === 0) {
            tacopos.push([Math.random() * scaler.width(), 0, Math.random() * 50 + 80, 0]);
        }
        updateTaco();
        drawTaco();
    }
}

function keyPressed() {
    if (key.toUpperCase() === 'E') {
        if (crntModal != '') {
            crntModal = '';
        } else if (isClose(slct_detector.about)) {
            crntModal = 'about';
            thetext = [
                ["I'm Candy (Xin Ying), a student from Kolej PERMATA@Pintar", ""],
                ["Negara. I am passionate about creating cool projects", ""],
                ["and my dream is to become a software engineer or an", ""],
                ["indie game developer.", ""],
                ["", ""],
                ["              candyisakat@gmail.com", "#1a007a"],
                ["              @codingkatty - GitHub", "#1a007a"],
            ];
        } else if (isClose(slct_detector.mail)) {
            crntModal = 'mail';
            thetext = [
                ["Welcome!", "rainbow"],
                ["This is my little world which I call my portfolio.", ""],
                ["Use WASD to move around and E to interact. Have fun!", ""],
                ["", ""],
                ["* * * * *", "#ffaa00"],
                ["", ""],
                ["v1.0.0 - the first version! game-like, cool, with all the basics.", ""],
                ["Look around and explore!", ""]
            ];
        } else if (isClose(slct_detector.bb_catesc)) {
            crntModal = 'catesc';
            thetext = [
                ["Cat Escape", ""],
                ["A team project with @violetz12 / Zhi Cheng", "#8d2800"],
                ["", ""],
                ["Escape the cat- a thrilling escape room to explore! As a bird ", ""],
                ["or a mouse, navigate the puzzle and find your way out. Did ", ""],
                ["I mention that it was a co-op game too?", ""],
                ["", ""],
                ["Press F to teleport to game!!", "#ff7b00"]
            ];
        } else if (isClose(slct_detector.bb_meowpad)) {
            crntModal = 'meowpad';
            thetext = [
                ["Meowpad: cat themed macropad", "#50007a"],
                ["A submission for #highway, too.", ""],
                ["", ""],
                ["Meowpad is a macropad that features 4 keys, a neopixel and ", ""],
                ["a 0.91\" OLED screen. The color scheme is purple-ish and it ", ""],
                ["is generally cat themed.", ""],
                ["", ""],
                ["Press F to open github repository", "#50007a"]
            ];
        } else if (isClose(slct_detector.bb_organisr)) {
            crntModal = 'organisr';
            thetext = [
                ["Organisr", "rainbow"],
                ["", ""],
                ["There were times when I lost stuff and wished I've known ", ""],
                ["where they were.", ""],
                ["So I made organisr. This app can be used to store where your ", ""],
                ["belongings are. You can take a picture and add it into a 'box',", ""],
                ["which is a virtual container for your items.", ""],
                ["", ""],
                ["Press F to open github repository", "rainbow"]
            ];
        } else if (isClose(slct_detector.bb_y2k)) {
            crntModal = 'y2k';
            thetext = [
                ["Y2K WebOS", "rainbow"],
                ["A retro-inspired WebOS.", ""],
                ["", ""],
                ["I joined a retro themed hackathon- and this was the best idea ", ""],
                ["that popped in my mind. I had this vision of a retro WebOS ", ""],
                ["that is themed around the Y2K bug that happened in 2000.", ""],
                ["", ""],
                ["PRESS F- TAKE ME TO YOUR REPOSITORY (error 2000)", "#1d7200"],
            ];
        } else if (isClose(slct_detector.bb_aries)) {
            crntModal = 'aries';
            thetext = [
                ["Project Aries", "#220072"],
                ["Cool map about exoplanets! Made with Zhi Cheng", ""],
                ["", ""],
                ["This project is a map that shows all exoplanets, using data ", ""],
                ["from NASA. It was a submission to the NASA Space Apps ", ""],
                ["Challenge.", ""],
                ["", ""],
                ["Press F to rocket to the repository!", "#220072"],
            ];
        } else if (isClose(slct_detector.bb_dodo)) {
            crntModal = 'dodo';
            thetext = [
                ["Dodo Sketchboard", "#ff0088"],
                ["Note extension for chrome!", ""],
                ["", ""],
                ["A simple sketchboard you can use to jot down things right in ", ""],
                ["your browser- very convenient and easy to use! It is ", ""],
                ["currently available in the chrome web store.", ""],
                ["", ""],
                ["Press F to open the repository.", "#ff0088"],
            ];
        }
    }
}

const socket = io("https://game.candyisacat.hackclub.app");
let players = {};

socket.on('players', (d) => {
    players = d;
});
