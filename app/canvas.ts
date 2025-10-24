interface CanvasClearInput {
  type: "canvas clear";
}

interface CanvasFillInput {
  type: "canvas fill";
  points: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
}

interface CanvasEllipseCurveInput {
  type: "canvas ellipse curve";
  center: [number, number];
  shape: [[number, number]];
}

interface CanvasTextInput {
  type: "canvas text";
  str: string;
  position: [number, number];
}

interface CanvasEllipseFillInput {
  type: "canvas ellipse fill";
  center: [number, number];
  shape: [[number, number]];
}

interface CanvasLineInput {
  type: "canvas line";
  from: [number, number];
  to: [number, number];
}

interface CanvasFrameInput {
  type: "canvas frame";
  points: [[number, number], [number, number]];
}

interface CanvasSetLineColorInput {
  type: "canvas setLineColor";
  r: number;
  g: number;
  b: number;
}

interface CanvasSetFillColorInput {
  type: "canvas setFillColor";
  r: number;
  g: number;
  b: number;
}

interface setPixel {
  type: "canvas setPixel";
  x: number;
  y: number;
  data: number[];
}

interface setOpacity {
  type: "canvas setOpacity";
  alpha: number;
}

type CanvasInput =
  | CanvasClearInput
  | CanvasFillInput
  | CanvasEllipseCurveInput
  | CanvasTextInput
  | CanvasEllipseFillInput
  | CanvasLineInput
  | CanvasFrameInput
  | CanvasSetLineColorInput
  | CanvasSetFillColorInput
  | setPixel
  | setOpacity;

export function canvas(canvas: HTMLCanvasElement | null, input: CanvasInput) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  // Use actual canvas dimensions (not offset)
  const width = canvas.width;
  const height = canvas.height;

  if (input.type === "canvas clear") {
    ctx.clearRect(0, 0, width, height);
  } else if (input.type === "canvas fill") {
    let points = input.points;
    let x = points[0][0];
    let y = points[0][1];
    let w = points[2][0] - x;
    let h = points[2][1] - y;
    ctx.fillRect(x, y, w, h);
  } else if (input.type === "canvas ellipse curve") {
    let x = input.center[0];
    let y = input.center[1];
    let radius = input.shape[0][0];
    ctx.beginPath();
    ctx.ellipse(x, y, Math.sqrt(radius), Math.sqrt(radius), 0, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (input.type === "canvas text") {
    let string = input.str;
    let x = input.position[0];
    let y = input.position[1];
    ctx.fillText(string!, x, y);
  } else if (input.type === "canvas ellipse fill") {
    let x = input.center[0];
    let y = input.center[1];
    let radius = input.shape[0][0];
    ctx.beginPath();
    ctx.ellipse(x, y, Math.sqrt(radius), Math.sqrt(radius), 0, 0, 2 * Math.PI);
    ctx.fill();
  } else if (input.type === "canvas line") {
    let x1 = input.from[0];
    let y1 = input.from[1];
    let x2 = input.to[0];
    let y2 = input.to[1];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  } else if (input.type === "canvas frame") {
    let points = input.points;
    let x = points[0][0];
    let y = points[0][1];
    let w = points[1][0] - x;
    let h = points[1][1] - y;
    ctx.strokeRect(x, y, w, h);
  } else if (input.type === "canvas setLineColor") {
    ctx.strokeStyle = rgbaToHex(input.r, input.g, input.b);
  } else if (input.type === "canvas setFillColor") {
    ctx.fillStyle = rgbaToHex(input.r, input.g, input.b);
  } else if (input.type === "canvas setPixel") {
    let oldFillStyle: any = ctx.fillStyle;
    ctx.fillStyle =
      "rgba(" +
      input.data[0] +
      "," +
      input.data[1] +
      "," +
      input.data[2] +
      "," +
      input.data[3] / 255 +
      ")";
    ctx.fillRect(input.x, input.y, 1, 1);
    ctx.fillStyle = oldFillStyle;
  } else if (input.type === "canvas setOpacity") {
    ctx.globalAlpha = input.alpha;
  }
}

function rgbaToHex(r: number, g: number, b: number, a: number = 1): string {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  const toHex2 = (v: number) => {
    const hex = v.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const R = Math.round(clamp(r) * 255);
  const G = Math.round(clamp(g) * 255);
  const B = Math.round(clamp(b) * 255);
  const A = Math.round(clamp(a) * 255);

  const hexR = toHex2(R);
  const hexG = toHex2(G);
  const hexB = toHex2(B);
  if (A === 255) {
    return `#${hexR}${hexG}${hexB}`;
  }
  const hexA = toHex2(A);
  return `#${hexR}${hexG}${hexB}${hexA}`;
}
