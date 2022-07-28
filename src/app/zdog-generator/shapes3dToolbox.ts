/*
  copied and adapted from [zdogXperiments repo](https://github.com/gregja/zdogXperiments/blob/master/js/shapes3dToolbox.js
*/

export interface Object3d {
  points: Node[];
  edges: Edge[];
  polygons: Polygon[];
}

interface CubeGeneratorInput {
  scale?: number;
  xRot?: number | null;
  yRot?: number | null;
  zRot?: number | null;
}

type NodeNumber = number;

export interface Node {
  x: number;
  y: number;
  z: number;
}

type Polygon = Array<number>;

interface Edge {
  a: NodeNumber;
  b: NodeNumber;
}

export function generateCube(config: CubeGeneratorInput): Object3d {
  var s = config.scale || 1;
  var xRot = config.xRot || null;
  var yRot = config.yRot || null;
  var zRot = config.zRot || null;

  var nodes: Node[] = [
    {
      x: -1 * s,
      y: 1 * s,
      z: -1 * s,
    },
    {
      x: 1 * s,
      y: 1 * s,
      z: -1 * s,
    },
    {
      x: 1 * s,
      y: -1 * s,
      z: -1 * s,
    },
    {
      x: -1 * s,
      y: -1 * s,
      z: -1 * s,
    },
    {
      x: -1 * s,
      y: 1 * s,
      z: 1 * s,
    },
    {
      x: 1 * s,
      y: 1 * s,
      z: 1 * s,
    },
    {
      x: 1 * s,
      y: -1 * s,
      z: 1 * s,
    },
    {
      x: -1 * s,
      y: -1 * s,
      z: 1 * s,
    },
  ];

  rotateZ3D(zRot, nodes, true);
  rotateY3D(yRot, nodes, true);
  rotateX3D(xRot, nodes, true);

  var edges: Edge[] = [
    {
      a: 0,
      b: 1,
    },
    {
      a: 1,
      b: 2,
    },
    {
      a: 2,
      b: 3,
    },
    {
      a: 3,
      b: 0,
    },
    {
      a: 4,
      b: 5,
    },
    {
      a: 5,
      b: 6,
    },
    {
      a: 6,
      b: 7,
    },
    {
      a: 7,
      b: 4,
    },
    {
      a: 0,
      b: 4,
    },
    {
      a: 1,
      b: 5,
    },
    {
      a: 2,
      b: 6,
    },
    {
      a: 3,
      b: 7,
    },
  ];

  var polygons: Polygon[] = [
    [0, 1, 2, 3],
    [1, 5, 6, 2],
    [5, 4, 7, 6],
    [4, 0, 3, 7],
    [4, 5, 1, 0],
    [3, 2, 6, 7],
  ];

  return {
    points: nodes,
    edges: edges,
    polygons: polygons,
  };
}

// shortcuts to Math Functions
/*
  const abs = Math.abs;
  const sin = Math.sin;
  const cos = Math.cos;
  const tan = Math.tan;
  const sqrt = Math.sqrt;
  const PI = Math.PI;
  */
const { cos, sin, PI, tan, sqrt, abs, pow } = Math;

const TAU = PI * 2;
const DEG_TO_RAD = PI / 180;

const degToRad = (angle: number) => angle * DEG_TO_RAD;
const radToDeg = (angle: number) => angle * (180 / PI);

/**
 * Rotate shape around the z-axis
 *  If parameter xyz == true
 *     Then work with explicit x, y and z properties of each node
 *     Else work with no explicit x, y, z coordinates (stored on position 0, 1, 2 of an array)
 * @param theta (angle)
 * @param nodes (array)
 * @param xyz (boolean, false by default)
 */
function rotateZ3D(
  theta: CubeGeneratorInput['zRot'],
  nodes: any[],
  xyz = false
) {
  if (theta == null || theta == undefined) return;
  theta = theta * DEG_TO_RAD;
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  if (xyz == true) {
    for (let n = 0, nmax = nodes.length; n < nmax; n++) {
      let node = nodes[n];
      let x = node.x;
      let y = node.y;
      node.x = x * cosTheta - y * sinTheta;
      node.y = y * cosTheta + x * sinTheta;
    }
  } else {
    for (let n = 0, nmax = nodes.length; n < nmax; n++) {
      let node = nodes[n];
      let x = node[0];
      let y = node[1];
      node[0] = x * cosTheta - y * sinTheta;
      node[1] = y * cosTheta + x * sinTheta;
    }
  }
}

/**
 * Rotate shape around the y-axis
 *  If parameter xyz == true
 *     Then work with explicit x, y and z properties of each node
 *     Else work with no explicit x, y, z coordinates (stored on position 0, 1, 2 of an array)
 * @param theta (angle)
 * @param nodes (array)
 * @param xyz (boolean, false by default)
 */
function rotateY3D(
  theta: CubeGeneratorInput['yRot'],
  nodes: any[],
  xyz = false
) {
  if (theta == null || theta == undefined) return;
  theta = theta * DEG_TO_RAD;
  var sinTheta = sin(-theta);
  var cosTheta = cos(-theta);

  if (xyz == true) {
    for (let n = 0, nmax = nodes.length; n < nmax; n++) {
      let node = nodes[n];
      let x = node.x;
      let z = node.z;
      node.x = x * cosTheta - z * sinTheta;
      node.z = z * cosTheta + x * sinTheta;
    }
  } else {
    for (let n = 0, nmax = nodes.length; n < nmax; n++) {
      let node = nodes[n];
      let x = node[0];
      let z = node[2];
      node[0] = x * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + x * sinTheta;
    }
  }
}

/**
 * Rotate shape around the x-axis
 *  If parameter xyz == true
 *     Then work with explicit x, y and z properties of each node
 *     Else work with no explicit x, y, z coordinates (stored on position 0, 1, 2 of an array)
 * @param theta (angle)
 * @param nodes (array)
 * @param xyz (boolean, false by default)
 */
function rotateX3D(
  theta: CubeGeneratorInput['xRot'],
  nodes: any[],
  xyz = false
) {
  if (theta == null || theta == undefined) return;
  theta = theta * DEG_TO_RAD;
  var sinTheta = sin(-theta);
  var cosTheta = cos(-theta);
  if (xyz == true) {
    for (let n = 0, nmax = nodes.length; n < nmax; n++) {
      let node = nodes[n];
      let y = node.y;
      let z = node.z;
      node.y = y * cosTheta - z * sinTheta;
      node.z = z * cosTheta + y * sinTheta;
    }
  } else {
    for (let n = 0, nmax = nodes.length; n < nmax; n++) {
      let node = nodes[n];
      let y = node[1];
      let z = node[2];
      node[1] = y * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + y * sinTheta;
    }
  }
}
