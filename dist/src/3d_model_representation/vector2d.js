"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
class Vector2D {
    constructor(x, y) {
        this.vector = [x, y];
    }
    get x() { return this.vector[0]; }
    get y() { return this.vector[1]; }
    set x(x) { this.vector[0] = x; }
    set y(y) { this.vector[0] = y; }
    equals(vector) {
        return ((this.vector[0] === vector.vector[0]) &&
            (this.vector[1] === vector.vector[1]));
    }
    translate(vector, mult = 1) {
        for (let i = 0; i < 2; i++) {
            this.vector[i] += vector.vector[i] * mult;
        }
        return this;
    }
    multiply(mult) {
        for (let i = 0; i < 2; i++) {
            this.vector[i] *= mult;
        }
        return this;
    }
    applyMatrix_(matrix) {
        let new_vector = [0, 0];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                new_vector[i] += matrix[i][j] * this.vector[j];
            }
        }
        this.vector = new_vector;
    }
    rotate(rotation) {
        let rotation_matrix = math_1.rotationMatrix2D(rotation);
        this.applyMatrix_(rotation_matrix);
        return this;
    }
    copy() {
        return new Vector2D(this.vector[0], this.vector[1]);
    }
    length() {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2));
    }
    distanceTo(vector) {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).length();
    }
    /**
     * Calculate the angle between the vector and the x-axis
     *
     * @returns {number}    angle between the vector and the x-axis in degrees
     */
    angle() {
        return math_1.toDegrees(Math.atan2(this.vector[1], this.vector[2]));
    }
}
exports.Vector2D = Vector2D;
