"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
const vector2d_1 = require("./vector2d");
const shape_1 = require("./shape");
class Circleline2D {
    constructor(center, radius, startAngle, endAngle, numPoints = 20) {
        this._center = center;
        this._radius = radius;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
        this._numPoints = numPoints;
    }
    calcPath() {
        let angleDistance = (this._endAngle - this._startAngle) / (this._numPoints - 1);
        let circlePath = [];
        for (let i = 0; i < this._numPoints; ++i) {
            circlePath.push(new vector2d_1.Vector2D(this._radius * Math.cos(math_1.toRadians(this._startAngle + i * angleDistance)), this._radius * Math.sin(math_1.toRadians(this._startAngle + i * angleDistance)))
                .translate(this._center));
        }
        return circlePath;
    }
    translate(vector) {
        this._center.translate(vector);
        return this;
    }
    rotate(rotation) {
        this._center.rotate(rotation);
        this._startAngle += rotation;
        this._endAngle += rotation;
        return this;
    }
    copy() {
        return new Circleline2D(this._center, this._radius, this._startAngle, this._endAngle);
    }
    shape() {
        return new shape_1.Shape([this]);
    }
    generateConstructionString() {
        return 'CIRCLELINE2D(' + JSON.stringify(this._center.vector) + ';' + this._radius + ';' +
            this._startAngle + ';' + this._endAngle + ')';
    }
}
exports.Circleline2D = Circleline2D;
