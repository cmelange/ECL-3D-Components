import{Curve2D} from '../../src/3d_model_representation/curve2d'
import {PolygonShape} from '../../src/3d_model_representation/polygon_shape'
import { Vector2D } from '../../src/3d_model_representation/vector2d';

test('extruded shape constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)]),
                                    new Curve2D([new Vector2D(0.25, 0.25),
                                                 new Vector2D(0.5,0.5),
                                                 new Vector2D(0.75,0.25)])]);
    let extrudedGeometry = polygon.extrude(1);
    expect(extrudedGeometry.constructionString)
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]],[[0.25,0.25],[0.5,0.5],[0.75,0.25]]]).EXTRUDE(1)");
});

test('revolved shape constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)]),
                                    new Curve2D([new Vector2D(0.25, 0.25),
                                                 new Vector2D(0.5,0.5),
                                                 new Vector2D(0.75,0.25)])]);
    let extrudedGeometry = polygon.revolve(20,10);
    expect(extrudedGeometry.constructionString)
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]],[[0.25,0.25],[0.5,0.5],[0.75,0.25]]]).REVOLVE(20)");
});