"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polyline2d_1 = require("../../src/3d_model_representation/polyline2d");
const shape_1 = require("../../src/3d_model_representation/shape");
const vector2d_1 = require("../../src/3d_model_representation/vector2d");
const vector3d_1 = require("../../src/3d_model_representation/vector3d");
const plane_1 = require("../../src/3d_model_representation/plane");
test('translated geometry constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let translatedGeometry = polygon.extrude(1).translate(new vector3d_1.Vector3D(1, 2, 1));
    expect(translatedGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1).TRANSLATION([1,2,1])");
});
test('rotated geometry constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let rotatedGeometry = polygon.extrude(1).rotate([45, 90, 45]);
    expect(rotatedGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1).ROTATION([45,90,45])");
});
test('geometry cut by plane constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let cutGeometry = polygon.extrude(1).clipByPlane(new plane_1.Plane(new vector3d_1.Vector3D(0, 1, 0), new vector3d_1.Vector3D(0, 0, 0)));
    expect(cutGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1).CLIP_BY_PLANE([0,1,0],0)");
});
test('geometry union constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let extrudedGeometry = polygon.extrude(1);
    let unionGeometry = extrudedGeometry.union(extrudedGeometry);
    expect(unionGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1).UNION(SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1))");
});
test('geometry difference constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let extrudedGeometry = polygon.extrude(1);
    let unionGeometry = extrudedGeometry.difference(extrudedGeometry);
    expect(unionGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1).DIFFERENCE(SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1))");
});
test('geometry intersection constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let extrudedGeometry = polygon.extrude(1);
    let unionGeometry = extrudedGeometry.intersection(extrudedGeometry);
    expect(unionGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1).INTERSECTION(SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]])}).EXTRUDE(1))");
});
test('copy geometry test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)])]);
    let extrudedGeometry = polygon.extrude(1);
    let copiedGeometry = extrudedGeometry.copy();
    expect(copiedGeometry.name).toEqual(extrudedGeometry.name);
    expect(copiedGeometry.constructionString).toEqual(extrudedGeometry.constructionString);
    expect(copiedGeometry.geometry).toEqual(extrudedGeometry.geometry);
});
