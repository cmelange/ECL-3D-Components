import{Polyline2D} from '../../src/3d_model_representation/polyline2d';
import {Shape} from '../../src/3d_model_representation/shape';
import { Vector2D } from '../../src/3d_model_representation/vector2d';
import { Circleline2D, CompositeCurve2D } from '../../src/3d_model_representation';

test('extruded polyline constructionString test', () => {
    let polygon = new Shape([new Polyline2D([new Vector2D(0,0),
                                             new Vector2D(0,1),
                                             new Vector2D(1,1),
                                             new Vector2D(1,0)]),
                             new Polyline2D([new Vector2D(0.25, 0.25),
                                             new Vector2D(0.5,0.5),
                                             new Vector2D(0.75,0.25)])]);
    let extrudedGeometry = polygon.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0]]);POLYLINE2D([[0.25,0.25],[0.5,0.5],[0.75,0.25]])}).EXTRUDE(1)");
});

test('extruded circleline constructionString test', () => {
    let circle = new Circleline2D(new Vector2D(0,0), 1, 0, 90).shape();
    let extrudedGeometry = circle.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({CIRCLELINE2D([0,0];1;0;90)}).EXTRUDE(1)");
});

test('composite curve constructionString test', () => {
    let composite = new CompositeCurve2D().appendCurve(new Polyline2D([new Vector2D(0,0),
                                                                       new Vector2D(1,0)]))
                                          .appendCurve(new Circleline2D(new Vector2D(0,0), 1, 0, 90))
                                          .shape();
    let extrudedGeometry = composite.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({COMPOSITE_CURVE2D({POLYLINE2D([[0,0],[1,0]]);CIRCLELINE2D([0,0];1;0;90)})}).EXTRUDE(1)");
});

test('revolved polyline constructionString test', () => {
    let polygon = new Polyline2D([new Vector2D(0,0),
                                  new Vector2D(0,1),
                                  new Vector2D(1,1),
                                  new Vector2D(1,0)]).shape();
    let extrudedGeometry = polygon.revolve(20,10);
    expect(extrudedGeometry.constructionString)
        .toBe("SHAPE({POLYLINE2D([[0,0],[0,1],[1,1],[1,0],[0,0]])}).REVOLVE(20)");
});