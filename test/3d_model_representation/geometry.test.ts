import { Curve2D } from '../../src/3d_model_representation/curve2d'
import { PolygonShape } from '../../src/3d_model_representation/polygon_shape'
import { Vector2D } from '../../src/3d_model_representation/vector2d'
import { Vector3D } from '../../src/3d_model_representation/vector3d'
import { Plane } from '../../src/3d_model_representation/plane'

test('translated geometry constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)])]);
    let translatedGeometry = polygon.Extrude(1).Translate(new Vector3D(1,2,1));
    expect(translatedGeometry.ConstructionString())
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1).TRANSLATION([1,2,1])");
});

test('rotated geometry constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)])]);
    let rotatedGeometry = polygon.Extrude(1).Rotate([45,90,45]);
    expect(rotatedGeometry.ConstructionString())
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1).ROTATION([45,90,45])");
});

test('geometry cut by plane constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)])]);
    let cutGeometry = polygon.Extrude(1).ClipByPlane(new Plane(new Vector3D(0,1,0),
                                                                   new Vector3D(0,0,0)));
    expect(cutGeometry.ConstructionString())
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1).CLIP_BY_PLANE([0,1,0],0)");
});

test('geometry union constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)])]);
    let extrudedGeometry = polygon.Extrude(1);
    let unionGeometry = extrudedGeometry.Union(extrudedGeometry);
    expect(unionGeometry.ConstructionString())
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1).UNION(POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1))");
});

test('geometry difference constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)])]);
    let extrudedGeometry = polygon.Extrude(1);
    let unionGeometry = extrudedGeometry.Difference(extrudedGeometry);
    expect(unionGeometry.ConstructionString())
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1).DIFFERENCE(POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1))");
});

test('geometry intersection constructionString test', () => {
    let polygon = new PolygonShape([new Curve2D([new Vector2D(0,0),
                                                 new Vector2D(0,1),
                                                 new Vector2D(1,1),
                                                 new Vector2D(1,0)])]);
    let extrudedGeometry = polygon.Extrude(1);
    let unionGeometry = extrudedGeometry.Intersection(extrudedGeometry);
    expect(unionGeometry.ConstructionString())
        .toBe("POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1).INTERSECT(POLYGON_SHAPE([[[0,0],[0,1],[1,1],[1,0]]]).EXTRUDE(1))");
});