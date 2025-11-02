// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCenter();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation parameters
let a = 100; // Size parameter
let t = 0; // Parameter t
let speed = 0.02; // Animation speed
let isPaused = false;
let trail = []; // Store points for the trail
const maxTrailLength = 1000; // Maximum trail points

// Center of the canvas
let centerX, centerY;

function updateCenter() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
}

// Cardioid parametric equations
// x = a * cos(t) * (1 + cos(t))
// y = a * sin(t) * (1 + cos(t))
// To make the heart point downward (正常方向), we rotate by 90 degrees (π/2)
function getCardioidPoint(t, a) {
    const x = a * Math.cos(t) * (1 + Math.cos(t));
    const y = a * Math.sin(t) * (1 + Math.cos(t));
    
    // Rotate 90 degrees to make heart point down (正常方向)
    const rotatedX = -y;
    const rotatedY = x;
    
    return {
        x: centerX + rotatedX,
        y: centerY + rotatedY
    };
}

// Draw coordinate axes
function drawAxes() {
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    // Draw tick marks
    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.font = '12px monospace';
    
    const tickSpacing = 50;
    
    // X-axis ticks
    for (let i = -canvas.width / 2; i < canvas.width / 2; i += tickSpacing) {
        const x = centerX + i;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.stroke();
    }
    
    // Y-axis ticks
    for (let i = -canvas.height / 2; i < canvas.height / 2; i += tickSpacing) {
        const y = centerY + i;
        ctx.beginPath();
        ctx.moveTo(centerX - 5, y);
        ctx.lineTo(centerX + 5, y);
        ctx.stroke();
    }
}

// Draw the trail with glow effect
function drawTrail() {
    if (trail.length < 2) return;
    
    // Draw the main trail
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    
    for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
    }
    
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
}

// Draw the moving point with glow effect
function drawPoint(point) {
    // Outer glow
    const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 20);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.8)');
    gradient.addColorStop(0.6, 'rgba(255, 215, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Bright center
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Golden ring
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.stroke();
}

// Animation loop
function animate() {
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw axes
    drawAxes();
    
    // Draw trail
    drawTrail();
    
    // Calculate current point
    const point = getCardioidPoint(t, a);
    
    // Add point to trail
    trail.push(point);
    if (trail.length > maxTrailLength) {
        trail.shift();
    }
    
    // Draw the moving point
    drawPoint(point);
    
    // Update parameter t
    if (!isPaused) {
        t += speed;
        if (t > Math.PI * 2) {
            t = 0;
            trail = []; // Clear trail when completing one cycle
        }
    }
    
    requestAnimationFrame(animate);
}

// Controls
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const resetBtn = document.getElementById('resetBtn');
const pauseBtn = document.getElementById('pauseBtn');

sizeSlider.addEventListener('input', (e) => {
    a = parseFloat(e.target.value);
    sizeValue.textContent = a;
    trail = []; // Clear trail when size changes
});

speedSlider.addEventListener('input', (e) => {
    const speedMultiplier = parseFloat(e.target.value);
    speed = 0.02 * speedMultiplier;
    speedValue.textContent = speedMultiplier.toFixed(1);
});

resetBtn.addEventListener('click', () => {
    t = 0;
    trail = [];
    isPaused = false;
    pauseBtn.textContent = '暂停';
});

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
});

// Start animation
animate();

}); // End of DOMContentLoaded
