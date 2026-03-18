/* ─── WAVE RIPPLE EFFECT ─── */
        (function () {
            const canvas = document.getElementById('wave-canvas');
            const ctx = canvas.getContext('2d');
            let W, H;
            const waves = [];
            const trail = [];
            let mouseX = -999, mouseY = -999;

            function resize() {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            // On mousemove — add trail dots
            document.addEventListener('mousemove', e => {
                mouseX = e.clientX; mouseY = e.clientY;
                trail.push({ x: e.clientX, y: e.clientY, life: 1, size: 3 });
                if (trail.length > 28) trail.shift();
            });

            // On click — spawn expanding rings
            document.addEventListener('click', e => {
                for (let i = 0; i < 3; i++) {
                    waves.push({
                        x: e.clientX, y: e.clientY,
                        r: 0,
                        maxR: 120 + i * 50,
                        life: 1,
                        delay: i * 120,
                        born: Date.now()
                    });
                }
            });

            // On mousemove — spawn slow ambient ripple occasionally
            let lastRipple = 0;
            document.addEventListener('mousemove', e => {
                const now = Date.now();
                if (now - lastRipple > 600) {
                    lastRipple = now;
                    waves.push({
                        x: e.clientX, y: e.clientY,
                        r: 0,
                        maxR: 60,
                        life: 1,
                        delay: 0,
                        born: now,
                        ambient: true
                    });
                }
            });

            function animate() {
                ctx.clearRect(0, 0, W, H);
                const now = Date.now();

                // Draw trail
                for (let i = trail.length - 1; i >= 0; i--) {
                    const t = trail[i];
                    const ratio = i / trail.length;
                    t.life -= 0.04;
                    if (t.life <= 0) { trail.splice(i, 1); continue; }
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.size * ratio, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${t.life * ratio * 0.5})`;
                    ctx.fill();
                }

                // Draw waves
                for (let i = waves.length - 1; i >= 0; i--) {
                    const w = waves[i];
                    const age = now - w.born - w.delay;
                    if (age < 0) continue;
                    const progress = age / 800;
                    if (progress >= 1) { waves.splice(i, 1); continue; }
                    w.r = w.maxR * progress;
                    w.life = 1 - progress;
                    const alpha = w.ambient ? w.life * 0.18 : w.life * 0.45;
                    const lineW = w.ambient ? 0.6 : 1.2 - progress * 0.8;
                    ctx.beginPath();
                    ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
                    ctx.lineWidth = lineW;
                    ctx.stroke();
                    // inner glow for click waves
                    if (!w.ambient && w.r < 30) {
                        const g = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, 30);
                        g.addColorStop(0, `rgba(201,168,76,${w.life * 0.15})`);
                        g.addColorStop(1, 'transparent');
                        ctx.fillStyle = g;
                        ctx.beginPath(); ctx.arc(w.x, w.y, 30, 0, Math.PI * 2); ctx.fill();
                    }
                }

                requestAnimationFrame(animate);
            }
            animate();

            // Hide on touch devices
            if ('ontouchstart' in window) canvas.style.display = 'none';
        })();