attribute vec3 color;
varying vec2 vUV;
varying float vAmount;

void main() {
	vUV = vec2(position.y, position.x);
	vAmount = position.z / 2.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
