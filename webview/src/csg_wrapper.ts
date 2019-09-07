import * as csg from '@jscad/csg'

function toRadians_(angle: number)
{
    return angle/180*Math.PI;
}

function toDegrees_(radian: number)
{
    return radian/Math.PI*180;
}

function RotationMatrix_(rotation: number[])
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

    Translate(vector: Vector2D, mult: number=1) {
        for (let i=0; i<2; i++)
        {
            this.vector[i] += vector[i]*mult;
        }
        return this;
    }

    Multiply(mult: number) {
        for (let i=0; i<2; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    Rotate(rotation: number) {
        let radians = toRadians_(rotation);
        let rotatedVector =
            [this.vector[0]*Math.cos(radians) - this.vector[1]*Math.sin(radians),
            this.vector[0]*Math.sin(radians) + this.vector[1]*Math.cos(radians)]
        this.vector = rotatedVector;
        return this;
    }

    Copy() {
        return new Vector2D(this.vector[0], this.vector[1]);
    }

    Length() {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) );
    }

    DistanceTo(vector: Vector2D) {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).Length();
    }

    Angle() {
        return toDegrees_(Math.atan2(this.vector[1], this.vector[2]));
    }

}

function TangentPointToCircle(point, center, radius, direction=true) {
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

    Translate(vector: Vector2D) {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number) {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Rotate(rotation);
        };
        return this;
    }

    Copy() {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        };
        return new Curve2D(copyArray);
    }

    Length() {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i+1]);
        };
        return length;
    }

    AppendArray(vectorArray: Vector2D[]) {
        for (var i=0; i<vectorArray.length; ++i) {
            if ((i===0) && (this.path.length > 0)) {
                if (this.path[this.path.length-1].Copy().Translate(vectorArray[0], -1).Length() < 1) {
                    continue;
                };
            };
            this.path.push(vectorArray[i].Copy());
        }
    }

    Append(curve: Curve2D) {
        this.AppendArray(curve.path);
        return this;
    }

    Repeat(num: number) {
        var singleCurve = this.Copy();
        var translationVector = singleCurve.path[singleCurve.path.length-1].Copy();
        for (var i=1; i<num; ++i) {
            this.Append(singleCurve.Translate(translationVector));
        };
        return this;
    }

    Curve3D(rotation: number[] =[0,0,0]) {
        return new Curve3D(this.path.map(function(vector) { 
                                            return new Vector3D(vector.vector[0], vector.vector[1], 0)
                                                               .Rotate(rotation);
                                            }));
    }

    Shape() {
        return new Shape([this]);
    }

    Thicken(distance: number) {
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
    
function CircleLine(center: Vector2D, radius: number, angle: number[], numPoints: number=10) {
    var angleDistance = (angle[1]-angle[0])/(numPoints-1);
    var circlePath = [];
    for (var i=0; i<numPoints; ++i) {
        circlePath.push(new Vector2D(radius * Math.cos(toRadians_(angle[0] + i*angleDistance)),
                                     radius * Math.sin(toRadians_(angle[0] + i*angleDistance)))
                            .Translate(center));
    };
    return new Curve2D(circlePath);
};

function Parabola(points: Vector2D[], extremum: number, numPoints: number=10, iterations:number=15) {
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

    Multiply(mult: number) {
        for (let i=0; i<3; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    ApplyMatrix_(matrix: number[][]) {
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

    Rotate(rotation: number[]) {
        let rotation_matrix = RotationMatrix_(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    }

    Copy() {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    }

    Length() {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) + 
                          Math.pow(this.vector[3], 2));
    }

    DistanceTo(vector: Vector3D) {
            return new Vector3D(vector[0] - this.vector[0],
                                vector[1] - this.vector[1],
                                vector[2] - this.vector[2]).Length();
    }

    //OrthogonalPlane(offset) {
    //    return new Plane().SetFromNormalAndCoplanarPoint(this, offset);
    //}

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

    Translate(vector: Vector3D) {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number[]) {
        let rotation_matrix = RotationMatrix_(rotation);
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].ApplyMatrix_(rotation_matrix);
        };
        return this;
    }

    Copy() {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        };
        return new Curve3D(copyArray);
    }

    Length() {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i+1]);
        };
        return length;
    }

    AppendArray(vectorArray: Vector3D[]) {
        for (var i=0; i<vectorArray.length; ++i) {
            this.path.push(vectorArray[i].Copy());
        }
    }

    TangentAtStart() {
        return this.path[1].Copy().Translate(this.path[0], -1);
    }

    TangentAtEnd() {
        return this.path[this.path.length-1].Copy().Translate(this.path[this.path.length-2], -1);
    }

}

//---- Shape --------------------------------------------------------------------
export class Shape {

    paths: Curve2D[];

    constructor(paths: Curve2D[]) {
        for (let i=0; i < paths.length; ++i)
        {
            this.paths.push(paths[i].Copy())
        }
    }
    
    Translate(vector: Vector2D) {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Translate(vector);
        };
    }

    Rotate(rotation: number) {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Rotate(rotation);
        };
    }

    Copy() {
        return new Shape(this.paths);
    }

    // Extrude(curve: Curve3D, steps=10, tension=0.75) {
    //     var extrudeCurve = new THREE.CatmullRomCurve3(curve.path.map(function(vector) { return vector.vector;}));
    //     extrudeCurve.tension = tension;
    //     var extrudeSettings = { steps: steps,
    //                             bevelEnabled: false,
    //                             extrudePath: extrudeCurve};
    //     return new Geometry(new THREE.ExtrudeGeometry(this.ThreeShape(), extrudeSettings));
    // }

}

