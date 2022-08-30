uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float vAmount;
varying vec2 vUV;
varying vec3 vNormal;

void main() {
	vUV = uv;
	vNormal = normal;
	vec4 bumpData = texture2D(bumpTexture, uv);

	vAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.

	// move the position along the normal
	vec3 newPosition = position + normal * bumpScale * vAmount;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}