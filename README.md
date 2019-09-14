# Data Structures Visualizations

View at [Data Structures Visualizations](http://138.68.4.225)

Simple website that features the stack, binary tree, and avl tree. Only works on very very very small data sets. Used for CS 290, web development at OSU.

## Running Locally

Node@12.9.0, npm@6.11.2,
[Parcel](https://github.com/parcel-bundler/parcel)@1.12.3 and typescript have to be installed.

### Build

Run `npm run build` and `npm run serve` to serve at `http://localhost:37539`.

For windows, there is an error where parcel hangs when building. To fix, run `npm run dev` like 3 times.

### Docker

Run `dockerbuild.sh`, the website is served at `http://localhost:37539`.

### Development/Watch

Run `npm run dev`

Note: Will not listen to child `scss` files on windows.
