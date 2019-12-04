# ECL-3D-Components
This repository contains all basic components related to 3D visualisation and configuration

## 3D model representation

### construction string
Every [**Geometry**](https://github.com/cmelange/ECL-3D-Components/blob/master/src/3d_model_representation/geometry.ts) object has a `ConstructionString()` function that returns a descriptive chain of 'functions' that represent all operations that are needed to build the geometry. This string can be used to rebuild the 3D model representation in various formats (e.g. IFC)

* 2D constructs
    * **POLYLINE2D**([[x,y]])
    * **CIRCLELINE2D**([x<sub>center</sub>, y<sub>center</sub>] ; r ; &theta;<sub>start</sub> ; &theta;<sub>end</sub>)
    * **COMPOSITE_CURVE2D**({*curve_1* ; ... ; *curve_n*})
    * **SHAPE**({*curve_1* ; ... ; *curve_n*})
* 2D to 3D transforms
    * **EXTRUDE**(height)
    * **REVOLVE**(&theta;)
* 3D constructs
    * **PLANE**(normal, w)
    * **TRANSLATION**([x,y,z])
    * **ROTATION**([&theta;<sub>x</sub>, &theta;<sub>y</sub>, &theta;<sub>z</sub>])
    * **UNION**(geometry)
    * **DIFFERENCE**(geometry)
    * **INTERSECTION**(geometry)
    * **CLIP_BY_PLANE**(plane)

## render three.js scene

```javascript
    var stream = fs.createWriteStream('./test1.png');
    renderThreeSceneToPng(scene, camera, renderWidth, renderHeight).pipe(stream);
    stream.on('close', () =>  console.log('The PNG file was created.'));
```
