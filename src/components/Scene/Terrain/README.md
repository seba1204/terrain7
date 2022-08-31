# Textures

## UV Issue

I have to compute UV map projection for my geometry.

See :

- <http://paulyg.f2s.com/uv.htm>
- <https://jsfiddle.net/evoLzrhc/3/>
- <https://stackoverflow.com/questions/20774648/three-js-generate-uv-coordinate>

## Save file

```js
const positions = mesh.current.geometry.attributes.position.array
    .slice(terrainSize * terrainSize * 2 * 3);
```

## Basic texture

- <https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Shader-Heightmap-Textures.html>

## Better texture

See CanvasTexture

- <https://threejs.org/docs/#api/en/textures/CanvasTexture>
- <https://threejs.org/examples/webgl_materials_texture_canvas.html> -> <https://gist.github.com/studioijeoma/1186920/5f50d999aa07491e67ec60d05e892637185cd4cd>
- <https://rawcdn.githack.com/sciecode/three.js/f4e363a8e0cf6c496f4191192d7eb15110442a7c/examples/webgl_paint_texture.html>
- <https://brushhh.blogspot.com/>
- <https://www.packt.com/threejs-materials-and-texture/>
- <https://r105.threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html> (Good tuto)
