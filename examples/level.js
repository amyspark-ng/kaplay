/**
 * @file Level
 * @description How to build levels from ASCII using the addLevel() function
 * @difficulty 0
 * @tags basics, game
 * @minver 3001.0
 * @category basics
 * @test
 */

// Build levels with addLevel()

// Start game
kaplay({
    background: "#8db7ff",
    scale: 1.5,
});

// Load assets
loadSprite("bean", "/sprites/bean.png");
loadSprite("coin", "/sprites/coin.png");
loadSprite("spike", "/sprites/spike.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("ghosty", "/sprites/ghosty.png");
loadSound("score", "/sounds/score.mp3");

const SPEED = 480;

setGravity(2400);

add([
    text("Create level with addLevel() function"),
    color(BLACK),
    color("1f102a"),
]);

const level = addLevel(
    [
        // Design the level layout with symbols
        "       ",
        "@  ^ $$",
        "=======",
    ],
    {
        // The size of each grid
        tileWidth: 64,
        tileHeight: 64,
        // The position of the top left block
        pos: vec2(100, 200),
        // Define what each symbol means (in components)
        tiles: {
            "@": () => [
                sprite("bean"),
                area({ isSensor: true }),
                body(),
                anchor("bot"),
                "player",
            ],
            "=": () => [
                sprite("grass"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
            ],
            $: () => [
                sprite("coin"),
                area({ isSensor: true }),
                anchor("bot"),
                "coin",
            ],
            "^": () => [
                sprite("spike"),
                area({ isSensor: true }),
                anchor("bot"),
                "danger",
            ],
        },
    },
);

// Get the player object from tag
const player = level.get("player")[0];

// Movements
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump();
    }
});

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

// Back to the original position if hit a "danger" item, in this case the topleft corner
player.onCollide("danger", () => {
    player.pos = level.tile2Pos(0, 0);
});

// Eat the coin!
player.onCollide("coin", (coin) => {
    destroy(coin);
    play("score");
});
