attribute vec3 color;
attribute vec3 neighbor;
varying vec2 vUV;
varying vec3 vColor;

void main() {
	vUV = vec2(position.y, position.x);
	vColor = color;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
