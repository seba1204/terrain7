uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;

varying vec2 vUV;
varying vec3 vColor;

// compare floats with epsilon margin
bool compareEps(float a, float b, float eps) {
    return abs(a - b) < eps;
}

// compare RGB colors
bool compareColors(vec3 color1, vec3 color2) {
    float eps = 0.1;
    return compareEps(color1.r, color2.r, eps) && compareEps(color1.g, color2.g, eps) && compareEps(color1.b, color2.b, eps);
}

void main() {
    vec4 water = texture2D(oceanTexture, vUV * 1.0);
    vec4 sandy = texture2D(sandyTexture, vUV * 1.0);
    vec4 grass = texture2D(grassTexture, vUV * 1.0);
    vec4 rocky = texture2D(rockyTexture, vUV * 1.0);
    vec4 snowy = texture2D(snowyTexture, vUV * 1.0);

    vec3 snowyColor = vec3(0.84, 0.87, 0.88);
    vec3 waterColor = vec3(0.03, 0.31, 0.71);
    vec3 grassColor = vec3(0.02, 0.60, 0.16);
    vec3 rockyColor = vec3(0.80, 0.07, 0.04);
    vec3 sandyColor = vec3(0.88, 0.55, 0.00);

    if(compareColors(vColor, snowyColor)) {
        gl_FragColor = vec4(snowy.rgb, 1.0);
    } else if(compareColors(vColor, waterColor)) {
        gl_FragColor = vec4(water.rgb, 1.0);
    } else if(compareColors(vColor, grassColor)) {
        gl_FragColor = vec4(grass.rgb, 1.0);
    } else if(compareColors(vColor, rockyColor)) {
        gl_FragColor = vec4(rocky.rgb, 1.0);
    } else if(compareColors(vColor, sandyColor)) {
        gl_FragColor = vec4(sandy.rgb, 1.0);
    } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
    }
}
