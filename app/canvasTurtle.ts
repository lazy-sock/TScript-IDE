export function canvasTurtle(
  canvas: HTMLCanvasElement | null,
  input: { type: string; from: number[]; to: number[]; color: string },
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  const width = canvas.width;
  const height = canvas.height;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, height);
  ctx.scale(1, -1); // flip y-axis (TScript turtle works like this for some reason)

  if (input.type === "turtle line") {
    ctx.beginPath();
    ctx.strokeStyle = input.color;
    ctx.moveTo(width / 2 + input.from[0], height / 2 + input.from[1]);
    ctx.lineTo(width / 2 + input.to[0], height / 2 + input.to[1]);
    ctx.stroke();
  }
}
