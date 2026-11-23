import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "assets");
mkdirSync(dir, { recursive: true });

const hold = (value) => ({ a: 0, k: value });

function keys(frames) {
  return {
    a: 1,
    k: frames.map((frame, index) => {
      if (index === frames.length - 1) return { t: frame.t, s: frame.s };
      return {
        t: frame.t,
        s: frame.s,
        i: { x: frame.s.length > 1 ? [0.67, 0.67, 0.67] : [0.67], y: frame.s.length > 1 ? [1, 1, 1] : [1] },
        o: { x: frame.s.length > 1 ? [0.33, 0.33, 0.33] : [0.33], y: frame.s.length > 1 ? [0, 0, 0] : [0] },
      };
    }),
  };
}

function layer({ name, ind, opacity, position, scale, rotation, size = [64, 64], shapes }) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: opacity ?? hold([100]),
      r: rotation ?? hold([0]),
      p: position ?? hold([100, 100, 0]),
      a: hold([0, 0, 0]),
      s: scale ?? hold([100, 100, 100]),
    },
    ao: 0,
    shapes:
      shapes ?? [
        { ty: "rc", d: 1, s: hold(size), p: hold([0, 0]), r: hold([0]), nm: "rect" },
        { ty: "fl", c: hold([0.22, 0.19, 0.15, 1]), o: hold([100]), r: 1, nm: "fill" },
      ],
    ip: 0,
    op: 60,
    st: 0,
    bm: 0,
  };
}

function clip(name, layers) {
  return { v: "5.7.4", fr: 30, ip: 0, op: 60, w: 200, h: 200, nm: name, ddd: 0, assets: [], layers };
}

const fade = clip("fade", [
  layer({ name: "mark", ind: 1, opacity: keys([{ t: 0, s: [20] }, { t: 30, s: [100] }, { t: 60, s: [20] }]) }),
]);

const slide = clip("slide", [
  layer({
    name: "mark",
    ind: 1,
    position: keys([
      { t: 0, s: [40, 100, 0] },
      { t: 30, s: [140, 100, 0] },
      { t: 60, s: [40, 100, 0] },
    ]),
  }),
]);

const pop = clip("pop", [
  layer({
    name: "mark",
    ind: 1,
    scale: keys([
      { t: 0, s: [80, 80, 100] },
      { t: 30, s: [118, 118, 100] },
      { t: 60, s: [80, 80, 100] },
    ]),
    rotation: keys([
      { t: 0, s: [0] },
      { t: 30, s: [16] },
      { t: 60, s: [0] },
    ]),
  }),
]);

const stagger = clip(
  "stagger",
  [0, 1, 2, 3, 4].map((index) =>
    layer({
      name: `mark-${index}`,
      ind: index + 1,
      position: hold([36 + index * 32, 100, 0]),
      size: [22, 22],
      opacity: keys([
        { t: index * 6, s: [0] },
        { t: 18 + index * 6, s: [100] },
        { t: 48, s: [100] },
        { t: 60, s: [0] },
      ]),
    }),
  ),
);

const loaderShapes = [
  { ty: "el", d: 1, s: hold([72, 72]), p: hold([0, 0]), nm: "ellipse" },
  { ty: "st", c: hold([0.72, 0.45, 0.18, 1]), o: hold([100]), w: hold([6]), lc: 2, lj: 2, nm: "stroke" },
  {
    ty: "tm",
    s: keys([
      { t: 0, s: [0] },
      { t: 30, s: [40] },
      { t: 60, s: [100] },
    ]),
    e: keys([
      { t: 0, s: [20] },
      { t: 30, s: [80] },
      { t: 60, s: [120] },
    ]),
    o: hold([0]),
    nm: "trim",
  },
];

const loader = clip("loader", [layer({ name: "arc", ind: 1, shapes: loaderShapes })]);

const successShapes = [
  {
    ty: "sh",
    ks: {
      a: 0,
      k: {
        c: false,
        v: [
          [-22, 2],
          [-6, 16],
          [24, -16],
        ],
        i: [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        o: [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      },
    },
    nm: "check",
  },
  { ty: "st", c: hold([0.22, 0.19, 0.15, 1]), o: hold([100]), w: hold([8]), lc: 2, lj: 2, nm: "stroke" },
  {
    ty: "tm",
    s: hold([0]),
    e: keys([
      { t: 0, s: [0] },
      { t: 24, s: [100] },
      { t: 60, s: [100] },
    ]),
    o: hold([0]),
    nm: "trim",
  },
];

const success = clip("success", [layer({ name: "check", ind: 1, shapes: successShapes })]);

for (const [name, data] of Object.entries({ fade, slide, pop, stagger, loader, success })) {
  writeFileSync(join(dir, `${name}.json`), JSON.stringify(data));
}

console.log("wrote lottie clips");
