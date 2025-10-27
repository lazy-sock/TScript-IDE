A modern IDE for the TScript programming language.

Original IDE: https://tglas.github.io/tscript/

TScript Documentation: https://tglas.github.io/tscript/?doc=

## not yet supported IDE Features

- canvas events and images
- multiple files
- git
- audio (low priority)

Also, generally expect other unsupported features and random bugs.

## Features

- full support for most core libraries
- IntelliSense and autocompletion
- code automatically runs
- shortcuts from vs-code
- catppuccin color theme

## Planned Features

- vim mode

## Implementation Details

This is a webapp made with React + Typescript + Tailwindcss. React-Router with SPA routing is used. The Interpreter is copied straight from the original repo and modified slightly to work smoothly with this IDE.
