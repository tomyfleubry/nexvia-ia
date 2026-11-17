const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.hidden = !open;
}

menu.addEventListener('click', () => setMenu(navigation.hidden));
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !navigation.hidden) {
    setMenu(false);
    menu.focus();
  }
});

const canvas = document.querySelector('#tennis-ball');
const ball = canvas.closest('.ball');
const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
const motion = matchMedia('(prefers-reduced-motion: reduce)');

const vertexSource = `
  attribute vec2 vertex;
  void main() { gl_Position = vec4(vertex, 0.0, 1.0); }
`;

const fragmentSource = `
  precision highp float;
  uniform vec2 rotation;

  float grain(vec3 point) {
    return fract(sin(dot(point, vec3(17.111, 97.163, 35.73))) * 19543.121);
  }

  void main() {
    vec2 xy = (gl_FragCoord.xy / 480.0 * 2.0 - 1.0) / 0.925;
    float r = length(xy);
    float fray = grain(vec3(floor(gl_FragCoord.xy), 1.0)) * .025;
    if (r > 1.0 + fray) discard;
    vec3 normal = vec3(xy / max(1.0, r), sqrt(max(0.0, 1.0 - dot(xy,xy))));
    float c = cos(rotation.x), s = sin(rotation.x);
    vec3 p = vec3(c * normal.x + s * normal.z, normal.y, -s * normal.x + c * normal.z);
    c = cos(rotation.y);
    s = sin(rotation.y);
    p = vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
    float angle = atan(p.z, p.x);
    float curve = p.y - 0.52 * sin(2.0 * angle + 0.35);
    float seam = 1.0 - smoothstep(0.017, 0.032, abs(curve));
    float fuzz = grain(floor(p * 380.0)) * .20 + grain(floor(p * 138.0)) * .11 - .14;
    float light = .37 + .63 * max(dot(normal, normalize(vec3(-.45, .68, 1.0))), 0.0);
    vec3 felt = mix(vec3(.72, .83, .29), vec3(.94, .95, .67), pow(light, 3.0) * .53);
    vec3 color = mix(felt, vec3(.98, .97, .86), seam) * light + fuzz;
    float alpha = 1.0 - smoothstep(.98, 1.0 + fray, r);
    gl_FragColor = vec4(color, alpha);
  }
`;

function shader(type, source) {
  const part = gl.createShader(type);
  gl.shaderSource(part, source);
  gl.compileShader(part);
  if (gl.getShaderParameter(part, gl.COMPILE_STATUS)) return part;
  gl.deleteShader(part);
  return null;
}

function setupBall() {
  if (!gl) return;
  const vertex = shader(gl.VERTEX_SHADER, vertexSource);
  const fragment = shader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'vertex');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const rotation = gl.getUniformLocation(program, 'rotation');

  let horizontal = 0.7;
  let vertical = 0.39;
  let frame;
  let lastFrame;
  let inView = false;
  let drag;

  function draw() {
    gl.uniform2f(rotation, horizontal, vertical);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function animate(time) {
    if (lastFrame !== undefined && !drag) horizontal += Math.min(time - lastFrame, 34) * .00034;
    lastFrame = time;
    draw();
    frame = requestAnimationFrame(animate);
  }

  function updateAnimation() {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    lastFrame = undefined;
    if (inView && !motion.matches) frame = requestAnimationFrame(animate);
    else draw();
  }

  draw();
  ball.dataset.rendered = '';
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    }, { threshold: .06 }).observe(ball);
  }
  motion.addEventListener('change', updateAnimation);
  ball.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return;
    drag = { x: event.clientX, y: event.clientY };
    ball.setPointerCapture(event.pointerId);
  });
  ball.addEventListener('pointermove', (event) => {
    if (!drag) return;
    horizontal += (event.clientX - drag.x) * .009;
    vertical += (event.clientY - drag.y) * .009;
    drag = { x: event.clientX, y: event.clientY };
    draw();
  });
  ball.addEventListener('lostpointercapture', () => { drag = undefined; });
  canvas.addEventListener('webglcontextlost', () => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    delete ball.dataset.rendered;
  });
}

setupBall();
