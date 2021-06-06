# eulerutil
Euler Angle (and Tait-Bryan Angle) Conversion Utility

This Utility support the conversion between the 24 different Euler Angle (and Tait-Bryan) conventions.

Euler Angles in Babylon.js are only based on the YXZ local space rotation convention (see [here](https://doc.babylonjs.com/divingDeeper/mesh/transforms/center_origin/rotation_conventions#euler-angles)). 

Even though the Quaternion API lists an `order` parameter for conversion, this parameter is currently ignored (see [here](https://doc.babylonjs.com/typedoc/classes/babylon.quaternion#toeulerangles)). 

## Supported Conversions

Quaternions to Euler Angles
Euler Angles to Quaternions
Rotation Matrix to Euler Angles
Euler Angles to Euler Angles (Reordering)
