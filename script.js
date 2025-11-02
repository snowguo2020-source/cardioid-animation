// Initialize after page loads
(function() {
    'use strict';
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Canvas setup
        const canvas = document.getElementById('canvas');
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Fill with black initially
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Animation parameters
        let a = 100;
        let t = 0;
        let speed = 0.02;
        let isPaused = false;
        let trail = [];
        const maxTrailLength = 1000;
        
        // Center point
        function getCenterX() { return canvas.width / 2; }
        function getCenterY() { return canvas.height / 2; }
        
        // Cardioid point calculation
        function getCardioidPoint(t, a) {
            const x = a * Math.cos(t) * (1 + Math.cos(t));
            const y = a * Math.sin(t) * (1 + Math.cos(t));
            
            // Rotate 90 degrees to make heart point down
            return {
                x: getCenterX() - y,
                y: getCenterY() + x
            };
        }
        
        // Draw axes
        function drawAxes() {
            const centerX = getCenterX();
            const centerY = getCenterY();
            
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, canvas.height);
            ctx.stroke();
        }
        
        // Draw trail
        function drawTrail() {
            if (trail.length < 2) return;
            
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
            ctx.shadowBlur = 0;
        }
        
        // Draw point
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
            
            // Center
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Ring
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Animation loop
        function animate() {
            // Clear with fade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw
            drawAxes();
            drawTrail();
            
            const point = getCardioidPoint(t, a);
            trail.push(point);
            if (trail.length > maxTrailLength) {
                trail.shift();
            }
            
            drawPoint(point);
            
            // Update
            if (!isPaused) {
                t += speed;
                if (t > Math.PI * 2) {
                    t = 0;
                    trail = [];
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
            trail = [];
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
        
        // Start
        animate();
    }
})();
