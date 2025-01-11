varying vec2 vUv;

void main()
{
    // // Pattern 3
    // float strength = vUv.x;
    // // Pattern 4
    // float strength = vUv.y;
    // // Pattern 5
    // float strength = 1.0 - vUv.y;
    // Pattern 6
    // float strength = 10.0 * vUv.y;
    // Pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0);
    // Pattern 8
    float strength = mod(vUv.y * 10.0, 1.0);
    strength = step(0.5, strength);

    gl_FragColor = vec4(vec3(strength), 1.0);
}