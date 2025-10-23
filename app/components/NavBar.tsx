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
    <div className="z-10 fixed bg-[#181926] border-4 rounded h-14 justify-center gap-2 sm:gap-6 items-center flex border-black top-4 left-4 right-4 shadow-[4px_4px_0_0_rgba(17,17,27,1)] px-4">
      <div className="text-[1.5rem] font-bold mr-auto hidden sm:block text-white">
        Tscript
      </div>
      <div className="border-3 transition-all gap-2 shadow-[3px_3px_0_0_rgba(17,17,27,1)] bg-[#eed49f] rounded-md border-[#11111b] h-[35px] flex items-center">
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
            className="w-[50px] text-[#11111b] text-center"
          />
        ) : null}
        <button
          onClick={() => {
            setFont(!font);
            inputRef.current?.focus();
          }}
          className="flex justify-center items-center group w-[35px] h-[35px] cursor-pointer"
        >
          <FontSize />
          <div className="absolute top-12 text-[#11111b] rounded-md font-medium border-3 border-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] px-1 py-0.5 bg-[#eed49f] hidden group-hover:block">
            Font Size
          </div>
        </button>
      </div>

      <button
        onClick={() => {
          onNavClick?.("git");
        }}
        className="border-3 group shadow-[3px_3px_0_0_rgba(17,17,27,1)] bg-[#ed8796] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <Git />
        <div className="absolute top-12 text-[#11111b] rounded-md font-medium border-3 border-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] px-1 py-0.5 bg-[#ed8796] hidden group-hover:block">
          Git
        </div>
      </button>

      <button
        onClick={() => onNavClick?.("save")}
        className="border-3 group shadow-[3px_3px_0_0_rgba(17,17,27,1)] bg-[#7dc4e4] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <Export />
        <div className="absolute top-12 text-[#11111b] rounded-md font-medium border-3 border-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] px-1 py-0.5 bg-[#7dc4e4] hidden group-hover:block">
          Export
        </div>
      </button>
      <button
        onClick={() => onNavClick?.("upload")}
        className="border-3 group shadow-[3px_3px_0_0_rgba(17,17,27,1)] bg-[#8aadf4] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <Import />
        <div className="absolute top-12 text-[#11111b] rounded-md font-medium border-3 border-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] px-1 py-0.5 bg-[#8aadf4] hidden group-hover:block">
          Import
        </div>
      </button>
      <button
        onClick={() => onNavClick?.("turtle")}
        className="border-3 group shadow-[3px_3px_0_0_rgba(17,17,27,1)] bg-[#a6da95] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <Turtle />
        <div className="absolute top-12 text-[#11111b] rounded-md font-medium border-3 border-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] px-1 py-0.5 bg-[#a6da95] hidden group-hover:block">
          Turtle
        </div>
      </button>
      <button
        onClick={() => onNavClick?.("canvas")}
        className="border-3 group shadow-[3px_3px_0_0_rgba(17,17,27,1)] bg-[#c6a0f6] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <Canvas />
        <div className="absolute top-12 text-[#11111b] rounded-md font-medium border-3 border-[#11111b] shadow-[3px_3px_0_0_rgba(17,17,27,1)] px-1 py-0.5 bg-[#c6a0f6] hidden group-hover:block">
          Canvas
        </div>
      </button>
    </div>
  );
};
