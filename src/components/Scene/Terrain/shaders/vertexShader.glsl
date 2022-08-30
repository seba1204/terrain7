attribute vec3 color;
varying vec2 vUV;
varying vec3 vColor;

void main() {
	vUV = vec2(position.y, position.x);
	vColor = color;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
