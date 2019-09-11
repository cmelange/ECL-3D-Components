import * as csg from '@jscad/csg'

function toRadians_(angle: number): number
{
    return angle/180*Math.PI;
}

function toDegrees_(radian: number): number
{
    return radian/Math.PI*180;
}

function RotationMatrix_(rotation: number[]): number[][]
{
    let theta = [toDegrees_(rotation[0]), toDegrees_(rotation[0]), toDegrees_(rotation[0])];

    let cosa = Math.cos(theta[0]);
    let sina = Math.sin(theta[0]);
    let cosb = Math.cos(theta[1]);
    let sinb = Math.sin(theta[1]);
    let cosc = Math.cos(theta[2]);
    let sinc = Math.sin(theta[2]);

    return [[cosb*cosc, -cosb*sinc, sinb],
            [sina*sinb*cosc + cosa*sinc, -sina*sinb*sinc + cosa*cosc, -sina*cosb],
            [-cosa*sinb*cosc + sina*sinc, cosa*sinb*sinc + sina*cosc, cosa*cosb]];
}

//---- Vector2D -----------------------------------------------------------------
export class Vector2D {

    vector: number[];
    
    constructor(x: number, y: number) {
        this.vector = [x,y];
    }

    Translate(vector: Vector2D, mult: number=1): Vector2D {
        for (let i=0; i<2; i++)
        {
            this.vector[i] += vector[i]*mult;
        }
        return this;
    }

    Multiply(mult: number): Vector2D {
        for (let i=0; i<2; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    Rotate(rotation: number): Vector2D {
        let radians = toRadians_(rotation);
        let rotatedVector =
            [this.vector[0]*Math.cos(radians) - this.vector[1]*Math.sin(radians),
            this.vector[0]*Math.sin(radians) + this.vector[1]*Math.cos(radians)]
        this.vector = rotatedVector;
        return this;
    }

    Copy(): Vector2D {
        return new Vector2D(this.vector[0], this.vector[1]);
    }

    Length(): number {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) );
    }

    DistanceTo(vector: Vector2D): number {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).Length();
    }

    /**
     * Calculate the angle between the vector and the x-axis
     * 
     * @returns {number}    angle between the vector and the x-axis in degrees
     */
    Angle(): number {
        return toDegrees_(Math.atan2(this.vector[1], this.vector[2]));
    }

}

export function TangentPointToCircle(point, center, radius, direction=true): Vector2D {
    var dir = (direction) ? 1 : -1;
    var tangent_angle = dir * Math.asin(radius/point.DistanceTo(center));
    return point.Copy().Add(center.Copy().Add(point,-1).Rotate(tangent_angle).Multiply(Math.cos(tangent_angle)));
}

//---- Curve2D ------------------------------------------------------------------
export class Curve2D {

    path: Vector2D[];

    constructor(vectors: Vector2D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        };
    }

    Translate(vector: Vector2D): Curve2D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number): Curve2D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Rotate(rotation);
        };
        return this;
    }

    Copy():Curve2D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        };
        return new Curve2D(copyArray);
    }

    Length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i+1]);
        };
        return length;
    }

    AppendArray(vectorArray: Vector2D[]): Curve2D {
        for (var i=0; i<vectorArray.length; ++i) {
            if ((i===0) && (this.path.length > 0)) {
                if (this.path[this.path.length-1].Copy().Translate(vectorArray[0], -1).Length() < 1) {
                    continue;
                };
            };
            this.path.push(vectorArray[i].Copy());
        }
        return this;
    }

    Append(curve: Curve2D): Curve2D {
        this.AppendArray(curve.path);
        return this;
    }

    Repeat(num: number): Curve2D {
        var singleCurve = this.Copy();
        var translationVector = singleCurve.path[singleCurve.path.length-1].Copy();
        for (var i=1; i<num; ++i) {
            this.Append(singleCurve.Translate(translationVector));
        };
        return this;
    }

    Shape(): Shape {
        return new Shape([this]);
    }

    Thicken(distance: number): Shape {
        var vectorArray = [];
        for(var i=this.path.length-1; i>=0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].Copy().Translate(this.path[tangentIndex-1], -1).Rotate(90);
            translationVector.Multiply(distance/translationVector.Length());
            vectorArray.push(this.path[i].Copy().Translate(translationVector));
        };
        return this.Copy().Append(new Curve2D(vectorArray)).Shape();
    }
}
    
export function CircleLine(center: Vector2D,
                    radius: number,
                    angle: number[],
                    numPoints: number=10): Curve2D {
    var angleDistance = (angle[1]-angle[0])/(numPoints-1);
    var circlePath = [];
    for (var i=0; i<numPoints; ++i) {
        circlePath.push(new Vector2D(radius * Math.cos(toRadians_(angle[0] + i*angleDistance)),
                                     radius * Math.sin(toRadians_(angle[0] + i*angleDistance)))
                            .Translate(center));
    };
    return new Curve2D(circlePath);
};

export function Parabola(points: Vector2D[],
                  extremum: number,
                  numPoints: number=10,
                  iterations:number=15): Curve2D {
    var x1 = points[0].vector[0];
    var y1 = points[0].vector[1] - extremum;
    var x2 = points[1].vector[0];
    var y2 = points[1].vector[1] - extremum;
    var xt = 0;
    var A = 0;
    var direction = ((x1 < x2) ? 1 : -1);
    var xtn = direction * (x1 + x2) / 2;
    var step = Math.abs((x1 - x2) / 2);
    var concave = ((extremum > y1) ? 1 : -1);
    for (var i=0; i<iterations; ++i) {
        xt = xtn;
        x1 = x1 - xt;
        x2 = x2 - xt;
        A = y1 / Math.pow(x1, 2);
        step = step/2;
        xtn = step * direction * concave * ((A*Math.pow(x2,2) < y2) ? 1 : -1);
    }
    var parabolaPath = [];
    var currentX = x1;
    var calcStep = (x2-x1) / (numPoints-1);
    var translation = new Vector2D(points[0].vector[0] - x1, extremum);
    for (var i=0; i<numPoints; ++i) {
        parabolaPath.push(new Vector2D(currentX , A*Math.pow(currentX,2)).Translate(translation));
        currentX = currentX + calcStep;
    }
    return new Curve2D(parabolaPath);
}

//---- Vector3D -----------------------------------------------------------------
export class Vector3D {

    vector: number[]

    constructor(x: number, y: number, z: number) {
        this.vector = [x,y,z];
    }

    Translate(vector: Vector3D, mult: number=1) {
        for (let i=0; i<3; i++)
        {
            this.vector[i] += vector[i]*mult;
        }
        return this;
    }

    Multiply(mult: number): Vector3D {
        for (let i=0; i<3; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    ApplyMatrix_(matrix: number[][]): void {
        let new_vector = [0,0,0];
        for (let i=0; i<3; i++)
        {
            for (let j=0; j<3; j++)
            {
                new_vector[i] = matrix[i][j]*this.vector[j];
            }
        }
        this.vector = new_vector;
    }

    Rotate(rotation: number[]): Vector3D {
        let rotation_matrix = RotationMatrix_(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    }

    Copy(): Vector3D {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    }

    Length(): number {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) + 
                          Math.pow(this.vector[3], 2));
    }

    DistanceTo(vector: Vector3D): number {
            return new Vector3D(vector[0] - this.vector[0],
                                vector[1] - this.vector[1],
                                vector[2] - this.vector[2]).Length();
    }

    OrthogonalPlane(offset: Vector3D): Plane {
        return new Plane(this, offset);
    }

}

//---- Curve3D ------------------------------------------------------------------
export class Curve3D {

    path: Vector3D[];

    constructor(vectors: Vector3D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        };
    }

    Translate(vector: Vector3D): Curve3D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number[]): Curve3D {
        let rotation_matrix = RotationMatrix_(rotation);
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].ApplyMatrix_(rotation_matrix);
        };
        return this;
    }

    Copy(): Curve3D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        };
        return new Curve3D(copyArray);
    }

    Length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i+1]);
        };
        return length;
    }

    AppendArray(vectorArray: Vector3D[]): Curve3D {
        for (var i=0; i<vectorArray.length; ++i) {
            this.path.push(vectorArray[i].Copy());
        }
        return this;
    }

    TangentAtStart(): Vector3D {
        return this.path[1].Copy().Translate(this.path[0], -1);
    }

    TangentAtEnd(): Vector3D {
        return this.path[this.path.length-1].Copy().Translate(this.path[this.path.length-2], -1);
    }

}

//---- Shape --------------------------------------------------------------------
export class Shape {

    paths: Curve2D[];

    constructor(paths: Curve2D[]) {
        this.paths = [];
        for (let i=0; i < paths.length; ++i)
        {
            this.paths.push(paths[i].Copy())
        }
    }
    
    Translate(vector: Vector2D): Shape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number): Shape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Rotate(rotation);
        };
        return this;
    }

    Copy(): Shape {
        return new Shape(this.paths);
    }

    ToCsgCag_() {
        let points: number[][][] = [];
        for (let i=0; i < this.paths.length; ++i)
        {
            points.push(this.paths[i].path.map(x => x.vector));
        }
        return csg.CAG.fromPoints(points);
    }

    /**
     * Linearly extrudes the shape along de z-axis
     * 
     * @param {number} height extrusion height
     * @returns {Geometry}
     */
    Extrude(height: number): Geometry {
        return new Geometry(this.ToCsgCag_().extrude({offset: [0,0,height], twiststeps: 1, twistangle: 0}));
    }

    /**
     * Revolves the shape around the y-axis
     * 
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    Revolve(angle: number, resolution: number =12): Geometry {
        return new Geometry(this.ToCsgCag_().rotateExtrude({angle: angle, resolution: resolution}));
    }

}

//---- Plane -------------------------------------------------------------
export class Plane {

    plane;

    constructor(normal: Vector3D, point: Vector3D) {
        this.plane = csg.CSG.Plane.fromNormalAndPoint(normal.vector, point.vector);
    }

    Translate(vector: Vector3D): Plane {
        this.plane = this.plane.transform(csg.Matrix4x4.translation(vector.vector));
        return this;
    }

    Flip(): Plane {
        this.plane = this.plane.flipped();
        return this;
    }

    Copy(): Plane {
        var copyPlane = new Plane(new Vector3D(0,0,1), new Vector3D(0,0,0));
        copyPlane.plane = new csg.CSG.Plane(this.plane.normal, this.plane.w);
        return copyPlane;
    }

}

//---- Geometry -----------------------------------------------------------------
export class Geometry {

    geometry;

    constructor(geometry) {
        this.geometry = geometry;
    }

    Translate(vector: Vector3D): Geometry {
        this.geometry = csg.translate(vector.vector, this.geometry);
        return this;
    }

    Rotate(rotation: number[]): Geometry {
        this.geometry = csg.rotate(rotation, this.geometry);
        return this;
    }

    Copy() {
        return new Geometry(csg.clone(this.geometry));
    }

    /**
     * Clip the geometry by a plane. Retuns the solid on the back side of the plane
     * 
     * @param {Plane} plane plane to cut the geometry
     * @returns {Geometry}
     */
    ClipByPlane(plane: Plane): Geometry {
        this.geometry = this.geometry.cutByPlane(plane.plane);
        return this;
    }

    Union(geometry: Geometry): Geometry {
        this.geometry = this.geometry.union(geometry.geometry);
        return this;
    }

    Difference(geometry: Geometry): Geometry {
        this.geometry = this.geometry.subtract(geometry.geometry);
        return this;
    }

    Intersection(geometry: Geometry): Geometry {
        this.geometry = this.geometry.intersect(geometry.geometry);
        return this;
    }

}