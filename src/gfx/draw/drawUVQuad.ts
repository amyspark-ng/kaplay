import { DEF_ANCHOR, UV_PAD } from "../../constants";
import { Color, rgb } from "../../math/color";
import { Quad, Vec2 } from "../../math/math";
import type { DrawUVQuadOpt } from "../../types";
import { anchorPt } from "../anchor";
import {
    popTransform,
    pushRotate,
    pushScaleV,
    pushTransform,
    pushTranslateV,
} from "../stack";
import { drawRaw } from "./drawRaw";

export function drawUVQuad(opt: DrawUVQuadOpt) {
    if (opt.width === undefined || opt.height === undefined) {
        throw new Error(
            "drawUVQuad() requires property \"width\" and \"height\".",
        );
    }

    if (opt.width <= 0 || opt.height <= 0) {
        return;
    }

    const w = opt.width;
    const h = opt.height;
    const anchor = anchorPt(opt.anchor || DEF_ANCHOR);
    const offset = new Vec2(anchor.x * w * -0.5, anchor.y * h * -0.5);
    const q = opt.quad || new Quad(0, 0, 1, 1);
    const color = opt.color || Color.WHITE;
    const opacity = opt.opacity ?? 1;

    // apply uv padding to avoid artifacts
    const uvPadX = opt.tex ? UV_PAD / opt.tex.width : 0;
    const uvPadY = opt.tex ? UV_PAD / opt.tex.height : 0;
    const qx = q.x + uvPadX;
    const qy = q.y + uvPadY;
    const qw = q.w - uvPadX * 2;
    const qh = q.h - uvPadY * 2;

    pushTransform();
    pushTranslateV(opt.pos);
    pushRotate(opt.angle);
    pushScaleV(opt.scale);
    pushTranslateV(offset);

    drawRaw(
        [
            {
                pos: new Vec2(-w / 2, h / 2),
                uv: new Vec2(
                    opt.flipX ? qx + qw : qx,
                    opt.flipY ? qy : qy + qh,
                ),
                color: color,
                opacity: opacity,
            },
            {
                pos: new Vec2(-w / 2, -h / 2),
                uv: new Vec2(
                    opt.flipX ? qx + qw : qx,
                    opt.flipY ? qy + qh : qy,
                ),
                color: color,
                opacity: opacity,
            },
            {
                pos: new Vec2(w / 2, -h / 2),
                uv: new Vec2(
                    opt.flipX ? qx : qx + qw,
                    opt.flipY ? qy + qh : qy,
                ),
                color: color,
                opacity: opacity,
            },
            {
                pos: new Vec2(w / 2, h / 2),
                uv: new Vec2(
                    opt.flipX ? qx : qx + qw,
                    opt.flipY ? qy : qy + qh,
                ),
                color: color,
                opacity: opacity,
            },
        ],
        [0, 1, 3, 1, 2, 3],
        opt.fixed,
        opt.tex,
        opt.shader,
        opt.uniform ?? undefined,
    );

    popTransform();
}
