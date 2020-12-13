# aframe-gltf-bricks

How to extract single parts froms a model that was:

- created with [LEGO studio](http://stud.io)
- exported to collada (`.dae`)
- converted to GLTF using `collada2gltf`

## Parts occuring only once

part names are constructed from LEGO part name like this:

`PARTNAME` → `Part-PARTNAME_dot_dat`

## Parts occuring multiple times

part names are constructed like this:

`PARTNAME` → 
- `Part-PARTNAME_dot_dat_instance_0`
- `Part-PARTNAME_dot_dat_instance_1` 
- ...
