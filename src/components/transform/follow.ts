import { Vec2, vec2 } from "@/math";
import type { FollowComp, GameObj, PosComp } from "@/types";

export function follow(obj: GameObj, offset?: Vec2): FollowComp {
    return {
        id: "follow",
        require: ["pos"],
        follow: {
            obj: obj,
            offset: offset ?? vec2(0),
        },
        add(this: GameObj<FollowComp | PosComp>) {
            if (obj.exists()) {
                this.pos = this.follow.obj.pos.add(this.follow.offset);
            }
        },
        update(this: GameObj<FollowComp | PosComp>) {
            if (obj.exists()) {
                this.pos = this.follow.obj.pos.add(this.follow.offset);
            }
        },
    };
}
