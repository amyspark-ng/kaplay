import { Vec2 } from "@/math";
import type { EmptyComp, GameObj, PosComp } from "@/types";

export function move(dir: number | Vec2, speed: number): EmptyComp {
    const d = typeof dir === "number" ? Vec2.fromAngle(dir) : dir.unit();
    return {
        id: "move",
        require: ["pos"],
        update(this: GameObj<PosComp>) {
            this.move(d.scale(speed));
        },
    };
}
