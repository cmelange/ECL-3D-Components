"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polyline2d_1 = require("../../src/3d_model_representation/polyline2d");
const shape_1 = require("../../src/3d_model_representation/shape");
const vector2d_1 = require("../../src/3d_model_representation/vector2d");
const _3d_model_representation_1 = require("../../src/3d_model_representation");
test('extruded polyline constructionString test', () => {
    let polygon = new shape_1.Shape([new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
            new vector2d_1.Vector2D(0, 1),
            new vector2d_1.Vector2D(1, 1),
            new vector2d_1.Vector2D(1, 0)]),
        new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0.25, 0.25),
            new vector2d_1.Vector2D(0.5, 0.5),
            new vector2d_1.Vector2D(0.75, 0.25)])]);
    let extrudedGeometry = polygon.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]]);POLYLINE2D([[0.25,0.25],[0.5,0.5],[0.75,0.25]])}).EXTRUDE(1)");
});
test('extruded circleline constructionString test', () => {
    let circle = new _3d_model_representation_1.Circleline2D(new vector2d_1.Vector2D(0, 0), 1, 0, 90).shape();
    let extrudedGeometry = circle.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({CIRCLELINE2D([0,0];1;0;90)}).EXTRUDE(1)");
});
test('composite curve constructionString test', () => {
    let composite = new _3d_model_representation_1.CompositeCurve2D().appendCurve(new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
        new vector2d_1.Vector2D(1, 0)]))
        .appendCurve(new _3d_model_representation_1.Circleline2D(new vector2d_1.Vector2D(0, 0), 1, 0, 90))
        .shape();
    let extrudedGeometry = composite.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({COMPOSITE_CURVE2D({POLYLINE2D([[0,0],[1,0]]);CIRCLELINE2D([0,0];1;0;90)})}).EXTRUDE(1)");
});
test('revolved polyline constructionString test', () => {
    let polygon = new polyline2d_1.Polyline2D([new vector2d_1.Vector2D(0, 0),
        new vector2d_1.Vector2D(0, 1),
        new vector2d_1.Vector2D(1, 1),
        new vector2d_1.Vector2D(1, 0)]).shape();
    let extrudedGeometry = polygon.revolve(20, 10);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0],[0,0]])}).REVOLVE(20)");
});
