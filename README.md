# Angular 3d basic samples code

## with p5js - Threejs - Babylonjs - Zdogjs - Popmotionsjs

Some random code samples just to try some 3d libraries with angular for a use case of an app that needs some basic 3d shapes and interactivity. Each library are on different lazy loaded modules and components to try to isolate a little their memory usage from each other.

- [P5.js](https://p5js.org/): "p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source..."

  - at route /p5js

- [Three.js](https://threejs.org/): "an easy to use, lightweight, cross-browser, general purpose 3D library."

  - at route /threejs

- [Babylon.js](https://www.babylonjs.com/): "Babylon.js is a powerful, beautiful, simple, and open game and rendering engine packed into a friendly JavaScript framework."

  - at route /babylonjs

- [Zdog](https://zzz.dog/): "Zdog is a 3D JavaScript engine for `canvas` and SVG. With Zdog, you can design and render simple 3D models on the Web. Zdog is a pseudo-3D engine. Its geometries exist in 3D space, but are rendered as flat shapes."

  - at route /zdog. Cube buil using the zdog box method

  - at route /zdog-generator. Cube built from basic nodes and edges

  - at route /zdog-popmotion. animation using popmotion instead of requestAnimationFrame or zdog inbuilt animation loop

I also tried on the ZdogPopmotionComponent an animation library (Popmotion) with Zdog to see their compatibility.

- [Popmotion](https://github.com/popmotion/popmotion): "Simple animation libraries for delightful user interfaces"

  - at route /zdog-popmotion

## Notes

- Based on the code at [zdogXperiments repo](https://github.com/gregja/zdogXperiments/blob/master/sources/zdog_cube.js)

- `shapes3dToolbox.js`, used to geneate the cube on the ZdogGeneratorComponent, is an util function for Zdog (not only) copied from [zdogXperiments repo](https://github.com/gregja/zdogXperiments/blob/master/js/shapes3dToolbox.js)

## Scripts

To check the app in developmment mode use the terminal/cli command

`npm start`

## performance

Here are some eyeballed numbers measured on a old laptop. These numbers are just to give a relative idea. They will be completely different on other machines and are not to be trusted in any way. And the examples are not the same.

The peformance numbers of each page should be compared to the Home page numbers. The memory number are from a single tab of chrome executing the app.

- Home (the CPU and GPU numbers are artificially set to zero for simpler comparision):

  - CPU: added 0%

  - GPU: added 0%

  - memory: 201

- P5Js:

  - CPU: added 15%

  - GPU: added 5%

  - memory: 209

- ThreeJs:

  - CPU: added +30% // with requestAnimationFrame

  - CPU: added ~18% // with setAnimationLoop

  - GPU: added 25%

  - memory: quickly drops to 215

- BabylonJs:

  - CPU: added 14%

  - GPU: added 4%

  - memory: drop to 220 after a while at 250

- Zdog:

  - CPU: added 7%

  - GPU: added 6%

  - memory: 204

- zdog-generator (zdog-popmotion is similar although it begins with a little more CPU use before stabilising):

  - CPU: added 6%

  - GPU: added 6%

  - memory: 203

Curiously the example with BabylonJs is more complex and has a similar weight to P5 in terms of CPU and GPU?
Note that BabylonJs also uses a little more memory.
It also has a smaller canvas...
To note as well the situation of zdog in built box method and vanilla js built box.

Todo: try to give the same conditions to all the 3d libraries so as to have a little better info about their relative performance. For the considered use case, the examples should not be too complex.

## Usefull Angular cli commands for dev

Add `--dry-run` flag to only test the command without creating any files

### modules

- generate a lazy loaded module with a default fooMod component and with routing for that component inside the fooMod module.

  - `--route` is to add the module fooMod with a lazy route named 'fooModRoute' to the routes array of the -m module

  `ng g m fooMod --route fooModRoute -m app`

### components

- generate a component at the root project and imported by the root module

  `ng g c fooComp`

- generate a component inside the threejs folder and imported by

  - the root module if no foo module exist
  - the foo module if it exist

  `ng g c foo/barComp`

- generate a component at the root project and imported by the -m module

  `ng g c fooComp -m fooMod`

- generate a component inside the -m module and imported by the same module

  `ng g c foo/fooComp -m fooMod`
