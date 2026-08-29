/* WAVE RIPPLE EFFECT */
        (function () {
            const canvas = document.getElementById('wave-canvas');
            if (!canvas) return;

            canvas.setAttribute('aria-hidden', 'true');

            const ctx = canvas.getContext('2d');
            const waves = [];
            let W = 0;
            let H = 0;
            let rafId = null;
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isTouchDevice = 'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches;

            if (reduceMotion || isTouchDevice) {
                canvas.style.display = 'none';
                return;
            }

            function resize() {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
            }

            resize();
            window.addEventListener('resize', resize);

            function startLoop() {
                if (rafId) return;

                const animate = () => {
                    if (!waves.length) {
                        ctx.clearRect(0, 0, W, H);
                        rafId = null;
                        return;
                    }

                    ctx.clearRect(0, 0, W, H);
                    const now = Date.now();
                    let active = false;

                    for (let i = waves.length - 1; i >= 0; i--) {
                        const wave = waves[i];
                        const age = now - wave.born - wave.delay;

                        if (age < 0) {
                            active = true;
                            continue;
                        }

                        const progress = age / 820;
                        if (progress >= 1) {
                            waves.splice(i, 1);
                            continue;
                        }

                        active = true;
                        wave.r = wave.maxR * progress;
                        wave.life = 1 - progress;

                        ctx.beginPath();
                        ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(201,168,76,${wave.life * 0.5})`;
                        ctx.lineWidth = 1.2 - progress * 0.8;
                        ctx.stroke();

                        if (wave.r < 30) {
                            const glow = ctx.createRadialGradient(wave.x, wave.y, 0, wave.x, wave.y, 30);
                            glow.addColorStop(0, `rgba(201,168,76,${wave.life * 0.18})`);
                            glow.addColorStop(1, 'transparent');
                            ctx.fillStyle = glow;
                            ctx.beginPath();
                            ctx.arc(wave.x, wave.y, 30, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    if (active) {
                        rafId = requestAnimationFrame(animate);
                    } else {
                        ctx.clearRect(0, 0, W, H);
                        rafId = null;
                    }
                };

                rafId = requestAnimationFrame(animate);
            }

            document.addEventListener('click', e => {
                for (let i = 0; i < 2; i++) {
                    waves.push({
                        x: e.clientX,
                        y: e.clientY,
                        r: 0,
                        maxR: 180,
                        life: 1,
                        delay: i * 120,
                        born: Date.now()
                    });
                }

                startLoop();
            });
        })();