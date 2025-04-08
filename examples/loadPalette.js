kaplay();

loadBean();
loadPalette("mulfok32", "examples/sprites/mulfok32.gpl");

onLoad(() => {
    const mulfok = getPalette("mulfok32");
    wait(1, () => console.log(getPalette("mulfok32")));
    console.log(mulfok);
});

// // loads a .gpl with the mulfok32 palette, this will return an array of colors
// let palette = null
// loadPalette("examples/sprites/mulfok32.gpl").then((data) => {
//     palette = data
// })

// onLoad(() => {
//     // makes a grid with every color
//     palette.forEach((mulfokColor, index) => {
//         const row = index % 3 // 3 rows
//         const column = index % 10 // 10 columns

//         const square = add([
//             rect(50, 50),
//             pos(vec2(100, 100).add(100 * column, 100 * row)),
//             color(mulfokColor),
//             anchor("center"),
//             area(),
//         ])

//         // makes a small flash on click
//         square.onClick(() => {
//             tween(WHITE, mulfokColor, 0.5, (p) => square.color = p)
//         })
//     })
// })
