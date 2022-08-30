uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;

varying vec2 vUV;
varying vec3 vNormal;

varying float vAmount;

void main() {
    vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D(oceanTexture, vUV * 10.0);
    vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D(sandyTexture, vUV * 10.0);
    vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D(grassTexture, vUV * 20.0);
    vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D(rockyTexture, vUV * 20.0);
    vec4 snowy = (smoothstep(0.50, 0.65, vAmount)) * texture2D(snowyTexture, vUV * 10.0);
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}