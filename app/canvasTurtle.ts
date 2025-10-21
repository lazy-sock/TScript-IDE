export function canvasTurtle(
  canvas: HTMLCanvasElement | null,
  input: { type: string; from: number[]; to: number[]; color: string },
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  // Use actual canvas dimensions (not offset)
  const width = canvas.width;
  const height = canvas.height;

  if (input.type === "turtle line") {
    ctx.beginPath();
    ctx.strokeStyle = input.color;
    ctx.moveTo(width / 2 + input.from[0], height / 2 + input.from[1]);
    ctx.lineTo(width / 2 + input.to[0], height / 2 + input.to[1]);
    ctx.stroke();
  }
}
