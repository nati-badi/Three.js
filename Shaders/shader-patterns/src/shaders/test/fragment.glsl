#define PI 3.14159265359

varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) - sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) + sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

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
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Pattern 9
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0);

    // Pattern 11
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // Pattern 12
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // Pattern 13
    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength -= step(0.8, mod(vUv.x * 10.0, 1.0));
    
    // Pattern 14
    // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strengthX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float strengthY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strengthY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    
    // Pattern 15
    // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strengthX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float strengthY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // strengthY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = strengthX + strengthY;
    
    // Pattern 16
    // float strength = abs(vUv.x - 0.5);
    
    // Pattern 17
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    
    // Pattern 18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
 
    // Pattern 19
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    
    // Pattern 20
    // float strength = step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // Pattern 21
    // float strength = floor(vUv.x * 10.0) / 10.0;
    
    // Pattern 22
    // float strength = floor(vUv.x * 10.0) / 20.0;
    // strength += floor(vUv.y * 10.0) / 20.0;
    
    // Pattern 23
    // float strength = random(vUv);

    // Pattern 24
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0, 
    //     floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0
    // );
    
    // float strength = random(gridUv);

    // Pattern 25
    // float strength = length(vUv);
    
    // Pattern 26
    // float strength = distance(vUv, vec2(0.5, 0.5));
    
    // Pattern 27
    // float strength = 1.0 - distance(vUv, vec2(0.5, 0.5));
    
    // Pattern 28
    // float strength = 0.15 / distance(vUv, vec2(0.5, 0.5));
    
    // Pattern 29
    // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    
    // Pattern 30
    // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 7.0 + 0.5), vec2(0.5, 0.5));
    // strength *= 0.15 / distance(vec2((vUv.x - 0.5) * 7.0 + 0.5, vUv.y), vec2(0.5, 0.5));
    
    // Pattern 31
    // float pi = 3.14159265359;
    
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5, 0.5));
    // float strength = 0.15 / distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 7.0 + 0.5), vec2(0.5, 0.5));
    // strength *= 0.15 / distance(vec2((rotatedUv.x - 0.5) * 7.0 + 0.5, rotatedUv.y), vec2(0.5, 0.5));
    
    // Pattern 32
    // float strength = step(0.25 ,distance(vUv, vec2(0.5, 0.5)));
    
    // Pattern 33
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    
    // Pattern 34
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    
    // Pattern 35
    // float strength = 1.0 - (step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)));
    
    // Pattern 36
    // vec2  wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = sin(1.0 - (step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25))));
    
    // Pattern 37
    // vec2  wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = sin(1.0 - (step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25))));
    
    // Pattern 38
    // vec2  wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = sin(1.0 - (step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25))));
    
    // Pattern 39
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;
    
    // Pattern 40
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;
    
    // Pattern 41
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    float strength = angle;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}