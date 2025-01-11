varying vec2 vUv;

void main()
{
    // Pattern 3
    float r_left = vUv.x;
    // Pattern 4
    float t_down = vUv.y;
    gl_FragColor = vec4(vec3(t_down), 1.0);
}