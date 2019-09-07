"use strict";
exports.__esModule = true;
function toRadians_(angle) {
    return angle / 180 * Math.PI;
}
function toDegrees_(radian) {
    return radian / Math.PI * 180;
}
function RotationMatrix_(rotation) {
    var theta = [toDegrees_(rotation[0]), toDegrees_(rotation[0]), toDegrees_(rotation[0])];
    var cosa = Math.cos(theta[0]);
    var sina = Math.sin(theta[0]);
    var cosb = Math.cos(theta[1]);
    var sinb = Math.sin(theta[1]);
    var cosc = Math.cos(theta[2]);
    var sinc = Math.sin(theta[2]);
    return [[cosb * cosc, -cosb * sinc, sinb],
        [sina * sinb * cosc + cosa * sinc, -sina * sinb * sinc + cosa * cosc, -sina * cosb],
        [-cosa * sinb * cosc + sina * sinc, cosa * sinb * sinc + sina * cosc, cosa * cosb]];
}
//---- Vector2D -----------------------------------------------------------------
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.vector = [x, y];
    }
    Vector2D.prototype.Translate = function (vector, mult) {
        if (mult === void 0) { mult = 1; }
        for (var i = 0; i < 2; i++) {
            this.vector[i] += vector[i] * mult;
        }
        return this;
    };
    Vector2D.prototype.Multiply = function (mult) {
        for (var i = 0; i < 2; i++) {
            this.vector[i] *= mult;
        }
        return this;
    };
    Vector2D.prototype.Rotate = function (rotation) {
        var radians = toRadians_(rotation);
        var rotatedVector = [this.vector[0] * Math.cos(radians) - this.vector[1] * Math.sin(radians),
            this.vector[0] * Math.sin(radians) + this.vector[1] * Math.cos(radians)];
        this.vector = rotatedVector;
        return this;
    };
    Vector2D.prototype.Copy = function () {
        return new Vector2D(this.vector[0], this.vector[1]);
    };
    Vector2D.prototype.Length = function () {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2));
    };
    Vector2D.prototype.DistanceTo = function (vector) {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).Length();
    };
    Vector2D.prototype.Angle = function () {
        return toDegrees_(Math.atan2(this.vector[1], this.vector[2]));
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;
function TangentPointToCircle(point, center, radius, direction) {
    if (direction === void 0) { direction = true; }
    var dir = (direction) ? 1 : -1;
    var tangent_angle = dir * Math.asin(radius / point.DistanceTo(center));
    return point.Copy().Add(center.Copy().Add(point, -1).Rotate(tangent_angle).Multiply(Math.cos(tangent_angle)));
}
//---- Curve2D ------------------------------------------------------------------
var Curve2D = /** @class */ (function () {
    function Curve2D(vectors) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        }
        ;
    }
    Curve2D.prototype.Translate = function (vector) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].Translate(vector);
        }
        ;
        return this;
    };
    Curve2D.prototype.Rotate = function (rotation) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].Rotate(rotation);
        }
        ;
        return this;
    };
    Curve2D.prototype.Copy = function () {
        var copyArray = [];
        for (var i = 0; i < this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        }
        ;
        return new Curve2D(copyArray);
    };
    Curve2D.prototype.Length = function () {
        var length = 0;
        for (var i = 0; i < this.path.length - 1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i + 1]);
        }
        ;
        return length;
    };
    Curve2D.prototype.AppendArray = function (vectorArray) {
        for (var i = 0; i < vectorArray.length; ++i) {
            if ((i === 0) && (this.path.length > 0)) {
                if (this.path[this.path.length - 1].Copy().Translate(vectorArray[0], -1).Length() < 1) {
                    continue;
                }
                ;
            }
            ;
            this.path.push(vectorArray[i].Copy());
        }
    };
    Curve2D.prototype.Append = function (curve) {
        this.AppendArray(curve.path);
        return this;
    };
    Curve2D.prototype.Repeat = function (num) {
        var singleCurve = this.Copy();
        var translationVector = singleCurve.path[singleCurve.path.length - 1].Copy();
        for (var i = 1; i < num; ++i) {
            this.Append(singleCurve.Translate(translationVector));
        }
        ;
        return this;
    };
    Curve2D.prototype.Curve3D = function (rotation) {
        if (rotation === void 0) { rotation = [0, 0, 0]; }
        return new Curve3D(this.path.map(function (vector) {
            return new Vector3D(vector.vector[0], vector.vector[1], 0)
                .Rotate(rotation);
        }));
    };
    Curve2D.prototype.Shape = function () {
        return new Shape([this]);
    };
    Curve2D.prototype.Thicken = function (distance) {
        var vectorArray = [];
        for (var i = this.path.length - 1; i >= 0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].Copy().Translate(this.path[tangentIndex - 1], -1).Rotate(90);
            translationVector.Multiply(distance / translationVector.Length());
            vectorArray.push(this.path[i].Copy().Translate(translationVector));
        }
        ;
        return this.Copy().Append(new Curve2D(vectorArray)).Shape();
    };
    return Curve2D;
}());
exports.Curve2D = Curve2D;
function CircleLine(center, radius, angle, numPoints) {
    if (numPoints === void 0) { numPoints = 10; }
    var angleDistance = (angle[1] - angle[0]) / (numPoints - 1);
    var circlePath = [];
    for (var i = 0; i < numPoints; ++i) {
        circlePath.push(new Vector2D(radius * Math.cos(toRadians_(angle[0] + i * angleDistance)), radius * Math.sin(toRadians_(angle[0] + i * angleDistance)))
            .Translate(center));
    }
    ;
    return new Curve2D(circlePath);
}
;
function Parabola(points, extremum, numPoints, iterations) {
    if (numPoints === void 0) { numPoints = 10; }
    if (iterations === void 0) { iterations = 15; }
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
    for (var i = 0; i < iterations; ++i) {
        xt = xtn;
        x1 = x1 - xt;
        x2 = x2 - xt;
        A = y1 / Math.pow(x1, 2);
        step = step / 2;
        xtn = step * direction * concave * ((A * Math.pow(x2, 2) < y2) ? 1 : -1);
    }
    var parabolaPath = [];
    var currentX = x1;
    var calcStep = (x2 - x1) / (numPoints - 1);
    var translation = new Vector2D(points[0].vector[0] - x1, extremum);
    for (var i = 0; i < numPoints; ++i) {
        parabolaPath.push(new Vector2D(currentX, A * Math.pow(currentX, 2)).Translate(translation));
        currentX = currentX + calcStep;
    }
    return new Curve2D(parabolaPath);
}
//---- Vector3D -----------------------------------------------------------------
var Vector3D = /** @class */ (function () {
    function Vector3D(x, y, z) {
        this.vector = [x, y, z];
    }
    Vector3D.prototype.Translate = function (vector, mult) {
        if (mult === void 0) { mult = 1; }
        for (var i = 0; i < 3; i++) {
            this.vector[i] += vector[i] * mult;
        }
        return this;
    };
    Vector3D.prototype.Multiply = function (mult) {
        for (var i = 0; i < 3; i++) {
            this.vector[i] *= mult;
        }
        return this;
    };
    Vector3D.prototype.ApplyMatrix_ = function (matrix) {
        var new_vector = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                new_vector[i] = matrix[i][j] * this.vector[j];
            }
        }
        this.vector = new_vector;
    };
    Vector3D.prototype.Rotate = function (rotation) {
        var rotation_matrix = RotationMatrix_(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    };
    Vector3D.prototype.Copy = function () {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    };
    Vector3D.prototype.Length = function () {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) +
            Math.pow(this.vector[3], 2));
    };
    Vector3D.prototype.DistanceTo = function (vector) {
        return new Vector3D(vector[0] - this.vector[0], vector[1] - this.vector[1], vector[2] - this.vector[2]).Length();
    };
    return Vector3D;
}());
exports.Vector3D = Vector3D;
//---- Curve3D ------------------------------------------------------------------
var Curve3D = /** @class */ (function () {
    function Curve3D(vectors) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        }
        ;
    }
    Curve3D.prototype.Translate = function (vector) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].Translate(vector);
        }
        ;
        return this;
    };
    Curve3D.prototype.Rotate = function (rotation) {
        var rotation_matrix = RotationMatrix_(rotation);
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].ApplyMatrix_(rotation_matrix);
        }
        ;
        return this;
    };
    Curve3D.prototype.Copy = function () {
        var copyArray = [];
        for (var i = 0; i < this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        }
        ;
        return new Curve3D(copyArray);
    };
    Curve3D.prototype.Length = function () {
        var length = 0;
        for (var i = 0; i < this.path.length - 1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i + 1]);
        }
        ;
        return length;
    };
    Curve3D.prototype.AppendArray = function (vectorArray) {
        for (var i = 0; i < vectorArray.length; ++i) {
            this.path.push(vectorArray[i].Copy());
        }
    };
    Curve3D.prototype.TangentAtStart = function () {
        return this.path[1].Copy().Translate(this.path[0], -1);
    };
    Curve3D.prototype.TangentAtEnd = function () {
        return this.path[this.path.length - 1].Copy().Translate(this.path[this.path.length - 2], -1);
    };
    return Curve3D;
}());
exports.Curve3D = Curve3D;
//---- Shape --------------------------------------------------------------------
var Shape = /** @class */ (function () {
    function Shape(paths) {
        for (var i = 0; i < paths.length; ++i) {
            this.paths.push(paths[i].Copy());
        }
    }
    Shape.prototype.Translate = function (vector) {
        for (var i = 0; i < this.paths.length; ++i) {
            this.paths[i].Translate(vector);
        }
        ;
    };
    Shape.prototype.Rotate = function (rotation) {
        for (var i = 0; i < this.paths.length; ++i) {
            this.paths[i].Rotate(rotation);
        }
        ;
    };
    Shape.prototype.Copy = function () {
        return new Shape(this.paths);
    };
    return Shape;
}());
exports.Shape = Shape;
