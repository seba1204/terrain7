uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;

varying vec2 vUV;
varying float vAmount;

void main() {
    vec4 water = (smoothstep(-10.00, -0.3, vAmount) - smoothstep(-0.5, -0.1, vAmount)) * texture2D(oceanTexture, vUV * 1.0);
    vec4 sandy = (smoothstep(-0.6, 0.15, vAmount) - smoothstep(0.13, 0.29, vAmount)) * texture2D(sandyTexture, vUV * 1.0);
    vec4 grass = (smoothstep(0.13, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D(grassTexture, vUV * 1.0);
    vec4 rocky = (smoothstep(0.20, 0.60, vAmount) - smoothstep(0.50, 0.80, vAmount)) * texture2D(rockyTexture, vUV * 1.0);
    vec4 snowy = (smoothstep(0.60, 0.85, vAmount)) * texture2D(snowyTexture, vUV * 1.0);
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0);
}
