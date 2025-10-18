import { useNavBar } from "./NavBarContext";
import { use, useEffect, useRef, useState } from "react";

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
    <div className="z-10 fixed bg-[#181926] border-4 rounded h-14 justify-center gap-6 items-center flex border-black top-4 left-4 right-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4">
      <div className="text-[1.5rem] font-bold mr-auto">Tscript</div>
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
          className="flex justify-center items-center w-[35px] h-[35px] cursor-pointer"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M3 7L3 5L17 5V7"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M10 5L10 19M10 19H12M10 19H8"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M13 14L13 12H21V14"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M17 12V19M17 19H15.5M17 19H18.5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <button
        onClick={() => {
          onNavClick?.("git");
        }}
        className="border-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] bg-[#ed8796] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={24}
          height={24}
        >
          <path d="M439.6 236.1L244 40.5C238.6 35 231.2 32 223.6 32s-15 3-20.4 8.4l-40.7 40.6 51.5 51.5c27.1-9.1 52.7 16.8 43.4 43.7l49.7 49.7c34.2-11.8 61.2 31 35.5 56.7-26.5 26.5-70.2-2.9-56-37.3l-46.3-46.3 0 121.9c25.3 12.5 22.3 41.8 9.1 55-6.4 6.4-15.2 10.1-24.3 10.1s-17.8-3.6-24.3-10.1c-17.6-17.6-11.1-46.9 11.2-56l0-123c-20.8-8.5-24.6-30.7-18.6-45L142.6 101 8.5 235.1C3 240.6 0 247.9 0 255.5s3 15 8.5 20.4L204.1 471.6c5.4 5.4 12.7 8.4 20.4 8.4s15-3 20.4-8.4L439.6 276.9c5.4-5.4 8.4-12.8 8.4-20.4s-3-15-8.4-20.4z" />
        </svg>
      </button>

      <button
        onClick={() => onNavClick?.("save")}
        className="border-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] bg-[#7dc4e4] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={24}
          height={24}
        >
          <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm32 96c0-17.7 14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-160 0c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
      </button>
      <button
        onClick={() => onNavClick?.("upload")}
        className="border-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] bg-[#8aadf4] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width={24}
          height={24}
        >
          <path d="M64 0C28.7 0 0 28.7 0 64l0 240 182.1 0-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-182.1 0 0 96c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-277.5c0-17-6.7-33.3-18.7-45.3L258.7 18.7C246.7 6.7 230.5 0 213.5 0L64 0zM325.5 176L232 176c-13.3 0-24-10.7-24-24L208 58.5 325.5 176z" />
        </svg>
      </button>
      <button
        onClick={() => onNavClick?.("turtle")}
        className="border-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] bg-[#a6da95] rounded-md border-black w-[35px] h-[35px] cursor-pointer flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width={26}
          height={26}
        >
          <path
            d="M 13.375 7.0625 C 12.56482 7.0589498 11.677786 7.151724 10.71875 7.375 C 6.9690387 8.2479401 5.110232 10.418307 4.40625 12.46875 C 4.054259 13.493971 3.9507162 14.468941 3.9375 15.25 C 3.927515 15.840097 3.982308 16.149971 4 16.40625 C 3.87611 16.511732 3.8347217 16.472845 3.71875 16.625 C 3.3954621 17.049153 3.1137385 17.694791 3.03125 18.53125 C 1.7733098 19.266944 1.125 20.5 1.125 20.5 L 2.875 21.5 C 2.875 21.5 3.8665539 20 5 20 C 14.401747 20 18.541438 17.332401 20.75 14.625 C 21.854281 13.271299 22.476318 11.953038 23.0625 11.125 C 23.648682 10.296962 23.967796 10 24.90625 10 C 25.891594 10 26.651656 10.264537 27.15625 10.71875 C 27.609622 11.126855 27.909614 11.749402 27.96875 12.6875 C 27.06147 14.115183 25.724973 14.553145 24.21875 15.3125 C 23.425587 15.71237 22.593916 16.226418 21.96875 17.09375 C 21.343584 17.961082 21 19.132507 21 20.65625 C 21 21.241209 21.268485 21.787176 21.5625 22.125 C 21.856515 22.462824 22.152251 22.662655 22.375 22.84375 C 22.45172 22.90612 22.46958 22.949421 22.53125 23 L 19.9375 23 C 19.708658 23 19.53569 22.825854 19.3125 22.46875 C 19.08931 22.111646 18.96875 21.75 18.96875 21.75 L 18.625 20.53125 L 17.53125 21.125 C 17.53125 21.125 15.817303 22 13.4375 22 L 9.4375 22 L 8.90625 22 L 8.625 22.46875 C 8.625 22.46875 8.2474121 23 7.625 23 L 5.8125 23 C 6.0167373 22.828387 6.218004 22.66628 6.4375 22.40625 C 6.7132476 22.079581 7 21.577363 7 21 L 5 21 C 5 20.9961 5.036752 20.97617 4.9375 21.09375 C 4.8382476 21.211331 4.6047024 21.402669 4.34375 21.625 C 3.8218452 22.069663 3 22.816139 3 24 L 3 25 L 4 25 L 7.625 25 C 8.8287221 25 9.4864747 24.431059 9.875 24 L 13.4375 24 C 15.325356 24 16.613519 23.579544 17.46875 23.25 C 17.5349 23.383085 17.50537 23.389845 17.59375 23.53125 C 17.99556 24.174146 18.760342 25 19.9375 25 L 24 25 L 25 25 L 25 24 C 25 22.647061 24.179501 21.732059 23.625 21.28125 C 23.347749 21.055845 23.143485 20.905551 23.0625 20.8125 C 22.981515 20.719449 23 20.750291 23 20.65625 C 23 19.423993 23.247041 18.762262 23.59375 18.28125 C 23.940459 17.800238 24.440663 17.470005 25.125 17.125 C 26.493673 16.43499 28.601241 15.748077 29.875 13.46875 L 30 13.25 L 30 12.96875 C 30 11.400774 29.455156 10.078537 28.5 9.21875 C 27.544844 8.3589628 26.255906 8 24.90625 8 C 23.310204 8 22.178662 8.9530375 21.4375 10 C 21.262818 10.246756 21.100505 10.52175 20.9375 10.78125 C 20.540945 10.490204 20.026315 10.238936 19.40625 10.125 C 18.590964 8.7626623 16.896955 7.340426 14.15625 7.09375 C 13.901882 7.0708557 13.64506 7.0636834 13.375 7.0625 z M 13.375 9.03125 C 16.214484 9.0462271 17.559629 10.628736 17.90625 11.40625 L 18.1875 12 L 18.8125 12 C 19.463969 12 19.674212 12.219168 19.84375 12.4375 C 19.854618 12.451496 19.865102 12.455286 19.875 12.46875 C 19.6709 12.769513 19.431378 13.076039 19.1875 13.375 C 17.333041 15.648317 14.087151 17.961264 5.21875 18 C 5.2442343 17.95594 5.2578616 17.874436 5.28125 17.84375 C 5.3981918 17.690322 5.375 17.71875 5.375 17.71875 L 6 17.46875 L 6 16.78125 C 6 16.35925 5.926622 15.924097 5.9375 15.28125 C 5.948378 14.638403 6.052116 13.883404 6.3125 13.125 C 6.833268 11.608193 7.9429613 10.06056 11.15625 9.3125 C 11.975465 9.121776 12.719734 9.0277937 13.375 9.03125 z M 25.4375 10.75 C 24.885216 10.75 24.4375 11.197715 24.4375 11.75 C 24.4375 12.302285 24.885216 12.75 25.4375 12.75 C 25.989785 12.75 26.4375 12.302285 26.4375 11.75 C 26.4375 11.197715 25.989785 10.75 25.4375 10.75 z"
            overflow="visible"
            font-family="Sans"
          />
        </svg>
      </button>
    </div>
  );
};
