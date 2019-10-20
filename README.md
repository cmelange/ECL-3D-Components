# ECL-3D-Components
This repository contains all basic components related to 3D visualisation and configuration

## 3D model representation

### construction string
Every [**Geometry**](https://github.com/cmelange/ECL-3D-Components/blob/master/src/3d_model_representation/geometry.ts) object has a `ConstructionString()` function that returns a descriptive chain of 'functions' that represent all operations that are needed to build the geometry. This string can be used to rebuild the 3D model representation in various formats (e.g. IFC)

* 2D constructs
    * **POLYGON_SHAPE**([[[x,y]]])
* 2D to 3D constructs
    * **EXTRUDE**(height)
    * **REVOLVE**(angle,resolution)
* 3D constructs
    * **TRANSLATION**([x,y,z])
    * **ROTATION**([&theta;<sub>x</sub>, &theta;<sub>y</sub>, &theta;<sub>z</sub>])
    * **UNION**(geometry)
    * **DIFFERENCE**(geometry)
    * **INTERSECTION**(geometry)

## render three.js scene

```javascript
    var stream = fs.createWriteStream('./test1.png');
    renderThreeSceneToPng(scene, camera, renderWidth, renderHeight).pipe(stream);
    stream.on('close', () =>  console.log('The PNG file was created.'));
```
