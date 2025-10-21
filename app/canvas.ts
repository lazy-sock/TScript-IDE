export function canvas(
  canvas: HTMLCanvasElement | null,
  input: {
    type: string;
    points?: Array<Array<number>>;
    center?: Array<number>;
    str?: string;
    from?: Array<number>;
    to?: Array<number>;
    position?: Array<number>;
    shape?: Array<Array<number>>;
  },
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  // Use actual canvas dimensions (not offset)
  const width = canvas.width;
  const height = canvas.height;

  if (input.type === "canvas clear") {
    ctx.clearRect(0, 0, width, height);
  } else if (input.type === "canvas fill") {
    let points = input.points;
    let x = points![0][0];
    let y = points![0][1];
    let w = points![1][0] - x;
    let h = points![1][1] - y;
    ctx.fillRect(x, y, w, h);
  } else if (input.type === "canvas ellipse curve") {
    let x = input.center![0];
    let y = input.center![1];
    let shape = input.shape![0];
    let radiusX = shape[0];
    let radiusY = shape[1];
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (input.type === "canvas text") {
    let string = input.str;
    let x = input.position![0];
    let y = input.position![1];
    ctx.fillText(string!, x, y);
  } else if (input.type === "canvas fill") {
    let points = input.points;
    let x = points![0][0];
    let y = points![0][1];
    let w = points![1][0] - x;
    let h = points![1][1] - y;
    ctx.fillRect(x, y, w, h);
  } else if (input.type === "canvas ellipse fill") {
    let x = input.center![0];
    let y = input.center![1];
    let radius = input.shape![0][0];
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.fill();
  } else if (input.type === "canvas line") {
    let x1 = input.from![0];
    let y1 = input.from![1];
    let x2 = input.to![0];
    let y2 = input.to![1];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  } else if (input.type === "canvas frame") {
    let points = input.points;
    let x = points![0][0];
    let y = points![0][1];
    let w = points![1][0] - x;
    let h = points![1][1] - y;
    ctx.strokeRect(x, y, w, h);
  }
}
