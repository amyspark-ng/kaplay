import { _k } from "../kaplay";
import type { Color } from "../math";
import { Asset, fetchText, fetchURL } from "./asset";
import { fixURL } from "./utils";

export type Palette = Record<string | number, Color>;

export function loadPalette(
    name: string,
    path: string,
    colorNames?: string[],
): Asset<Palette> {
    path = fixURL(path);

    return _k.assets.palettes.add(
        name,
        new Promise(async (resolve) => {
            const data = await fetchText(path);
            const lines = data.split("\n").slice(
                4,
                data.split("\n").length - 1,
            );
            const items = lines.map((line) => line.split("\t"));
            const arrayOfHex = items.map((item) => item[3].replace("\r", ""));
            const colors = arrayOfHex.map((hex) =>
                _k.k.Color.fromHex(`#${hex}`)
            );
            const keys = colorNames || [];
            const obj = {} as Palette;
            colors.forEach((color, index) => {
                keys[index] = keys[index] ?? index;
            });

            keys.forEach((key, index) => obj[key] = colors[index]);
            resolve(obj);
        }),
    );
}

export function getPalette(name: string): Asset<Palette> | null {
    return _k.assets.palettes.get(name) ?? null;
}
