"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vector3d_1 = require("./vector3d");
const csg = __importStar(require("@jscad/csg"));
class Plane {
    constructor(normal, point) {
        this.plane = csg.CSG.Plane.fromNormalAndPoint(normal.vector, point.vector);
    }
    translate(vector) {
        this.plane = this.plane.transform(csg.Matrix4x4.translation(vector.vector));
        return this;
    }
    flip() {
        this.plane = this.plane.flipped();
        return this;
    }
    copy() {
        let copyPlane = new Plane(new vector3d_1.Vector3D(0, 0, 1), new vector3d_1.Vector3D(0, 0, 0));
        copyPlane.plane = new csg.CSG.Plane(this.plane.normal, this.plane.w);
        return copyPlane;
    }
}
exports.Plane = Plane;
