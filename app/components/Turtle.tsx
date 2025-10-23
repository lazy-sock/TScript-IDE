import { forwardRef, useEffect, useState } from "react";

type Props = {
  visible: boolean;
};

const Turtle = forwardRef<HTMLCanvasElement, Props>(({ visible }, ref) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      // when visible becomes false, wait for animation duration then stop rendering
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200); // match your CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  const isLarge = window.innerWidth > 900;
  const width = isLarge ? 800 : 300;
  const height = isLarge ? 600 : 300;

  const commonClass =
    "fixed top-26 z-10 rounded-lg bg-white shadow-[4px_4px_0_0_#a6da95]";
  const positionClass = isLarge
    ? "right-12 bottom-[200px] border-4 border-[#a6da95]"
    : "right-4 bottom-[200px] border-4 border-[#a6da95]";

  const animationClass = visible
    ? "animate-slide-in-right"
    : "animate-slide-out-right";

  const className = `${commonClass} ${positionClass} ${animationClass}`;

  return (
    <canvas ref={ref} width={width} height={height} className={className} />
  );
});

Turtle.displayName = "Turtle";

export default Turtle;
