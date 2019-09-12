"use strict";
exports.__esModule = true;
var math_1 = require("./math");
var vector2d_1 = require("./vector2d");
var curve2d_1 = require("./curve2d");
function TangentPointToCircle(point, center, radius, direction) {
    if (direction === void 0) { direction = true; }
    var dir = (direction) ? 1 : -1;
    var tangent_angle = dir * Math.asin(radius / point.DistanceTo(center));
    return point.Copy().Add(center.Copy().Add(point, -1).Rotate(tangent_angle).Multiply(Math.cos(tangent_angle)));
}
exports.TangentPointToCircle = TangentPointToCircle;
function CircleLine(radius, center, angle, numPoints) {
    if (numPoints === void 0) { numPoints = 10; }
    var angleDistance = (angle[1] - angle[0]) / (numPoints - 1);
    var circlePath = [];
    for (var i = 0; i < numPoints; ++i) {
        circlePath.push(new vector2d_1.Vector2D(radius * Math.cos(math_1.toRadians(angle[0] + i * angleDistance)), radius * Math.sin(math_1.toRadians(angle[0] + i * angleDistance)))
            .Translate(center));
    }
    ;
    return new curve2d_1.Curve2D(circlePath);
}
exports.CircleLine = CircleLine;
;
function Circle(radius, center, numPoints) {
    if (center === void 0) { center = new vector2d_1.Vector2D(0, 0); }
    if (numPoints === void 0) { numPoints = 10; }
    return CircleLine(radius, center, [0, 360], numPoints).Shape();
}
exports.Circle = Circle;
function Rectangle(width, height, center) {
    if (center === void 0) { center = new vector2d_1.Vector2D(0, 0); }
    return new curve2d_1.Curve2D([new vector2d_1.Vector2D(-width / 2, -height / 2),
        new vector2d_1.Vector2D(-width / 2, height / 2),
        new vector2d_1.Vector2D(width / 2, height / 2),
        new vector2d_1.Vector2D(width / 2, -height / 2)]).Shape();
}
exports.Rectangle = Rectangle;
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
    var translation = new vector2d_1.Vector2D(points[0].vector[0] - x1, extremum);
    for (var i = 0; i < numPoints; ++i) {
        parabolaPath.push(new vector2d_1.Vector2D(currentX, A * Math.pow(currentX, 2)).Translate(translation));
        currentX = currentX + calcStep;
    }
    return new curve2d_1.Curve2D(parabolaPath);
}
exports.Parabola = Parabola;
