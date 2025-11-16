import { forwardRef, useEffect, useState } from "react";

type Props = {
  visible: boolean;
  onPendingEventsChange?: (events: any[]) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, Props>(
  ({ visible, onPendingEventsChange }, ref) => {
    const [shouldRender, setShouldRender] = useState(visible);

    useEffect(() => {
      if (visible) {
        setShouldRender(true);
      } else {
        // when visible becomes false, wait for animation duration then stop rendering
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, 200); // match CSS animation duration
        return () => clearTimeout(timer);
      }
    }, [visible]);

    const isLarge = window.innerWidth > 900;
    const width = isLarge ? 800 : 300;
    const height = isLarge ? 600 : 300;

    const commonClass =
      "fixed top-26 z-10 rounded-lg bg-white shadow-[4px_4px_0_0_#c6a0f6]";
    const positionClass = isLarge
      ? "right-12 bottom-[200px] border-4 border-[#c6a0f6]"
      : "right-4 bottom-[200px] border-4 border-[#c6a0f6]";

    const animationClass = visible
      ? "animate-slide-in-right"
      : "animate-slide-out-right";

    const className = `${commonClass} ${positionClass} ${animationClass}`;

    const [pendingEvents, setPendingEvents] = useState<any[]>([]);

    useEffect(() => {
      if (onPendingEventsChange) onPendingEventsChange(pendingEvents);
    }, [pendingEvents, onPendingEventsChange]);

    const enqueueCanvasEvent = (eventType: string, properties: any) => {
      setPendingEvents((prev) => {
        const newEvents = [
          ...prev,
          {
            type: "object",
            classname: "canvas." + eventType.split(".")[1],
            event: properties,
          },
        ];
        return newEvents;
      });
      if (onPendingEventsChange) onPendingEventsChange(pendingEvents);
    };

    function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
      const { clientX, clientY, movementX, movementY, buttons } = e;

      const canvasRect = e.currentTarget.getBoundingClientRect();
      const canvasX = e.clientX - canvasRect.left;
      const canvasY = e.clientY - canvasRect.top;

      enqueueCanvasEvent("canvas.mousedown", {
        x: canvasX,
        y: canvasY,
        button: e.button,
      });
    }

    function handleMouseOut(e: React.MouseEvent<HTMLCanvasElement>) {
      enqueueCanvasEvent("canvas.mouseout", {});
    }

    function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
      const { clientX, clientY, button } = e;
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const canvasX = e.clientX - canvasRect.left;
      const canvasY = e.clientY - canvasRect.top;

      enqueueCanvasEvent("canvas.mousedown", {
        x: canvasX,
        y: canvasY,
        button: e.button,
      });
    }

    function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
      const { clientX, clientY, button } = e;
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const canvasX = e.clientX - canvasRect.left;
      const canvasY = e.clientY - canvasRect.top;

      enqueueCanvasEvent("canvas.mouseup", {
        x: canvasX,
        y: canvasY,
        button: e.button,
      });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLCanvasElement>) {
      const { key, code, ctrlKey, shiftKey, altKey, metaKey, repeat } = e;
      enqueueCanvasEvent("canvas.keydown", {
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
      });
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLCanvasElement>) {
      const { key, code, ctrlKey, shiftKey, altKey, metaKey } = e;
      enqueueCanvasEvent("canvas.keyup", {
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
      });
    }

    // function handleResize() {
    //   useEffect(() => {
    //     const handleWindowResize = () => {
    //       /* resize canvas */
    //     };
    //     window.addEventListener("resize", handleWindowResize);
    //     return () => window.removeEventListener("resize", handleWindowResize);
    //   }, []);
    // }

    if (!shouldRender) {
      return null;
    }

    return (
      <canvas
        // onMouseMove={handleMouseMove}
        // onMouseOut={handleMouseOut}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onKeyDown={handleKeyDown}
        // onKeyUp={handleKeyUp}
        ref={ref}
        width={width}
        height={height}
        className={className}
      />
    );
  },
);

Canvas.displayName = "Canvas";

export default Canvas;
