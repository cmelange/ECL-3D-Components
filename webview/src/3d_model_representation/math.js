"use strict";
exports.__esModule = true;
function toRadians(angle) {
    return angle / 180 * Math.PI;
}
exports.toRadians = toRadians;
function toDegrees(radian) {
    return radian / Math.PI * 180;
}
exports.toDegrees = toDegrees;
function RotationMatrix2D(rotation) {
    var theta = toDegrees(rotation);
    return [[Math.cos(theta), -Math.sin(theta)],
        [Math.sin(theta), Math.cos(theta)]];
}
exports.RotationMatrix2D = RotationMatrix2D;
function RotationMatrix3D(rotation) {
    var theta = [toDegrees(rotation[0]), toDegrees(rotation[0]), toDegrees(rotation[0])];
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
exports.RotationMatrix3D = RotationMatrix3D;
