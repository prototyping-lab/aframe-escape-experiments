# aframe-svg-building

## step 1 : draw the building plan

1. draw something in illustrator
2. extrude your drawings in A-Frame

## step 2: carve out the windows

1. use the csg-meshs add-on
1. create boxes where the windows should go
2. use the CSG difference operator to carve out the windows
3. export the result as GLTF object

## step 3: color your model

1. add colors to your GLTF in [three.js editor](https://threejs.org/editor/)
2. export the colored model as GLTF 

## step 4 : create the nav-mesh

1. add your GLTF model to A-Frame
2. add a ground plane
3. use the navmesh-addon and generate the navmesh in the inspector
4. save the nav-mesh as GLTF model

## step 5 : use your building

1. load the model and nav-mesh inside A-Frame
2. walk around and enjoy the view