import { FontSize } from "./icons/FontSize";
import { Git } from "./icons/Git";
import { Export } from "./icons/Export";
import { useNavBar } from "./NavBarContext";
import { useEffect, useRef, useState } from "react";
import { Import } from "./icons/Import";
import { Turtle } from "./icons/Turtle";
import { Canvas } from "./icons/Canvas";

export const NavBar = () => {
  const { onNavClick } = useNavBar();
  const [font, setFont] = useState(false);
  const [fontvalue, setFontvalue] = useState(14);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onNavClick?.("fontsize: " + fontvalue);
  }, [font]);
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // optional: prevents e.g. form submit or default behaviour
      setFont(false);
    }
  };
  return (
    <div className="font-archivo fixed top-4 right-4 left-4 z-10 flex h-14 items-center justify-center gap-2 rounded border-4 border-black bg-[#181926] px-4 shadow-[4px_4px_0_0_rgba(17,17,27,1)] sm:gap-6">
      <a
        href="https://tglas.github.io/tscript/?doc="
        className="mr-auto hidden text-[1.5rem] font-extrabold text-white sm:block"
      >
        Tscript
      </a>
      <div className="flex h-[35px] items-center gap-2 rounded-md border-3 border-[#11111b] bg-[#eed49f] shadow-[3px_3px_0_0_rgba(17,17,27,1)] transition-all">
        {font ? (
          <input
            type="text"
            pattern="[0-9]*"
            value={fontvalue}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setFontvalue(0); // or maybe set to `null` or some default
              } else {
                const num = parseInt(val, 10);
                if (!Number.isNaN(num)) {
                  setFontvalue(num);
                }
                // (or handle invalid case)
              }
            }}
            ref={inputRef}
            className="w-[50px] text-center font-bold text-[#11111b]"
          />
        ) : null}
        <button
          onClick={() => {
            setFont(!font);
            inputRef.current?.focus();
          }}
          className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center"
        >
          <FontSize />
          <div className="absolute top-12 hidden rounded-md border-3 border-[#11111b] bg-[#eed49f] px-1 py-0.5 font-bold text-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] group-hover:block">
            Font Size
          </div>
        </button>
      </div>

      <button
        onClick={() => {
          onNavClick?.("git");
        }}
        className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-3 border-black bg-[#ed8796] shadow-[3px_3px_0_0_rgba(17,17,27,1)]"
      >
        <Git />
        <div className="absolute top-12 hidden rounded-md border-3 border-[#11111b] bg-[#ed8796] px-1 py-0.5 font-bold text-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] group-hover:block">
          Git
        </div>
      </button>

      <button
        onClick={() => onNavClick?.("save")}
        className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-3 border-black bg-[#7dc4e4] shadow-[3px_3px_0_0_rgba(17,17,27,1)]"
      >
        <Export />
        <div className="absolute top-12 hidden rounded-md border-3 border-[#11111b] bg-[#7dc4e4] px-1 py-0.5 font-bold text-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] group-hover:block">
          Export
        </div>
      </button>
      <button
        onClick={() => onNavClick?.("upload")}
        className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-3 border-black bg-[#8aadf4] shadow-[3px_3px_0_0_rgba(17,17,27,1)]"
      >
        <Import />
        <div className="absolute top-12 hidden rounded-md border-3 border-[#11111b] bg-[#8aadf4] px-1 py-0.5 font-bold text-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] group-hover:block">
          Import
        </div>
      </button>
      <button
        onClick={() => onNavClick?.("turtle")}
        className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-3 border-black bg-[#a6da95] shadow-[3px_3px_0_0_rgba(17,17,27,1)]"
      >
        <Turtle />
        <div className="absolute top-12 hidden rounded-md border-3 border-[#11111b] bg-[#a6da95] px-1 py-0.5 font-bold text-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] group-hover:block">
          Turtle
        </div>
      </button>
      <button
        onClick={() => onNavClick?.("canvas")}
        className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-3 border-black bg-[#c6a0f6] shadow-[3px_3px_0_0_rgba(17,17,27,1)]"
      >
        <Canvas />
        <div className="absolute top-12 hidden rounded-md border-3 border-[#11111b] bg-[#c6a0f6] px-1 py-0.5 font-bold text-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] group-hover:block">
          Canvas
        </div>
      </button>
    </div>
  );
};
