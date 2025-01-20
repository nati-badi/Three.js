uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uBigWavesSpeed;

varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Elevation of the big waves
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) 
                    * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) 
                    * uBigWavesElevation;
    modelPosition.y = elevation;

    
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 ProjectedPosition = projectionMatrix * viewPosition;

    gl_Position = ProjectedPosition;

    // Varyings for fragment shader
    vElevation = elevation;
}