uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float vAmount;
varying vec2 vUV;
varying vec3 vNormal;
varying vec4 vPosition;

void main() {
	vPosition = vec4(position, 1.0) / 10.0;
	vUV = vec2(vPosition.y, vPosition.x);
	vNormal = normal;
	vec4 bumpData = texture2D(bumpTexture, vUV);

	vAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.

	// move the position along the normal
	vec3 newPosition = position + normal * bumpScale * vAmount;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
