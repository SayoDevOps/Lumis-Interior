/* ─── ABOUT CANVAS — Elegant room illustration ─── */
        function drawAbout() {
            const canvas = document.getElementById('about-canvas');
            if (!canvas) return;
            const W = canvas.offsetWidth || 600;
            const H = canvas.offsetHeight || 500;
            canvas.width = W; canvas.height = H;
            const ctx = canvas.getContext('2d');

            // Background gradient
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#1a1610');
            bg.addColorStop(1, '#0c0a08');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Floor
            const floor = ctx.createLinearGradient(0, H * 0.65, 0, H);
            floor.addColorStop(0, '#2a2218');
            floor.addColorStop(1, '#1a1410');
            ctx.fillStyle = floor;
            ctx.fillRect(0, H * 0.65, W, H * 0.35);

            // Floor planks
            ctx.strokeStyle = 'rgba(201,168,76,0.06)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 8; i++) {
                const y = H * 0.65 + i * (H * 0.35 / 8);
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }

            // Back wall light
            const wallLight = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.3, W * 0.6);
            wallLight.addColorStop(0, 'rgba(201,168,76,0.08)');
            wallLight.addColorStop(1, 'transparent');
            ctx.fillStyle = wallLight;
            ctx.fillRect(0, 0, W, H);

            // Sofa
            const sx = W * 0.12, sy = H * 0.54, sw = W * 0.55, sh = H * 0.14;
            ctx.fillStyle = '#2d2420';
            ctx.strokeStyle = 'rgba(201,168,76,0.2)';
            ctx.lineWidth = 1;
            // Sofa body
            roundRect(ctx, sx, sy + sh * 0.3, sw, sh * 0.7, 4);
            ctx.fill(); ctx.stroke();
            // Sofa back
            roundRect(ctx, sx, sy, sw, sh * 0.45, 4);
            ctx.fillStyle = '#382e28';
            ctx.fill(); ctx.stroke();
            // Cushions
            const cushW = sw * 0.3;
            [sx + 10, sx + cushW + 18, sx + cushW * 2 + 26].forEach((cx, i) => {
                roundRect(ctx, cx, sy + sh * 0.35, cushW - 8, sh * 0.58, 4);
                ctx.fillStyle = i === 1 ? '#3d3228' : '#2d2420';
                ctx.fill();
                ctx.strokeStyle = 'rgba(201,168,76,0.15)';
                ctx.stroke();
            });
            // Sofa legs
            [[sx + 12, sy + sh], [sx + sw - 18, sy + sh]].forEach(([lx, ly]) => {
                ctx.fillStyle = '#c9a84c';
                ctx.fillRect(lx, ly, 8, H * 0.03);
            });

            // Coffee table
            const tx = W * 0.2, ty = H * 0.62, tw = W * 0.35, th = H * 0.03;
            ctx.fillStyle = '#1e1a14';
            ctx.strokeStyle = 'rgba(201,168,76,0.3)';
            ctx.lineWidth = 1;
            roundRect(ctx, tx, ty, tw, th, 2);
            ctx.fill(); ctx.stroke();
            // Table top shine
            const shine = ctx.createLinearGradient(tx, ty, tx, ty + th);
            shine.addColorStop(0, 'rgba(201,168,76,0.1)');
            shine.addColorStop(1, 'transparent');
            ctx.fillStyle = shine;
            roundRect(ctx, tx, ty, tw, th * 0.4, 2);
            ctx.fill();
            // Table legs
            ctx.strokeStyle = 'rgba(201,168,76,0.25)';
            [[tx + 10, ty + th, tx + 10, ty + th + H * 0.03],
            [tx + tw - 10, ty + th, tx + tw - 10, ty + th + H * 0.03]].forEach(([x1, y1, x2, y2]) => {
                ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
            });

            // Floor lamp
            const lpx = W * 0.78, lpy = H * 0.4;
            ctx.strokeStyle = 'rgba(201,168,76,0.5)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(lpx, H * 0.65); ctx.lineTo(lpx, lpy + 40); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(lpx, lpy + 40); ctx.lineTo(lpx + 30, lpy); ctx.stroke();
            // Lamp shade
            ctx.beginPath();
            ctx.moveTo(lpx + 10, lpy);
            ctx.lineTo(lpx + 50, lpy);
            ctx.lineTo(lpx + 44, lpy - 30);
            ctx.lineTo(lpx + 16, lpy - 30);
            ctx.closePath();
            ctx.fillStyle = 'rgba(201,168,76,0.15)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(201,168,76,0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();
            // Lamp glow
            const glow = ctx.createRadialGradient(lpx + 30, lpy + 10, 0, lpx + 30, lpy + 10, 120);
            glow.addColorStop(0, 'rgba(201,168,76,0.12)');
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(lpx + 30, lpy + 10, 120, 0, Math.PI * 2); ctx.fill();

            // Window with curtains
            const wx = W * 0.08, wy = H * 0.08, ww = W * 0.28, wh = H * 0.4;
            ctx.fillStyle = '#0a1420';
            ctx.strokeStyle = 'rgba(201,168,76,0.2)';
            ctx.lineWidth = 1;
            roundRect(ctx, wx, wy, ww, wh, 2);
            ctx.fill(); ctx.stroke();
            // Window light
            const wLight = ctx.createLinearGradient(wx, wy, wx + ww, wy + wh);
            wLight.addColorStop(0, 'rgba(180,200,255,0.05)');
            wLight.addColorStop(1, 'rgba(100,130,200,0.02)');
            ctx.fillStyle = wLight;
            roundRect(ctx, wx + 2, wy + 2, ww - 4, wh - 4, 2);
            ctx.fill();
            // Window panes
            ctx.strokeStyle = 'rgba(201,168,76,0.1)';
            ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2); ctx.stroke();
            // Curtains
            ctx.fillStyle = '#1a1410';
            ctx.beginPath(); ctx.moveTo(wx - 4, wy - 10); ctx.quadraticCurveTo(wx + 20, wy + wh * 0.3, wx + 10, wy + wh + 20); ctx.lineTo(wx - 4, wy + wh + 20); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(wx + ww + 4, wy - 10); ctx.quadraticCurveTo(wx + ww - 20, wy + wh * 0.3, wx + ww - 10, wy + wh + 20); ctx.lineTo(wx + ww + 4, wy + wh + 20); ctx.closePath(); ctx.fill();

            // Plant
            const px = W * 0.7, py = H * 0.46;
            ctx.strokeStyle = 'rgba(50,80,40,0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(px, H * 0.65); ctx.quadraticCurveTo(px - 10, py + 40, px - 20, py); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px, H * 0.65); ctx.quadraticCurveTo(px + 10, py + 40, px + 20, py + 10); ctx.stroke();
            [[-20, py, 20], [20, py + 10, 16], [0, py - 15, 14], [-30, py + 20, 12]].forEach(([ox, oy, r]) => {
                ctx.fillStyle = 'rgba(40,80,35,0.6)';
                ctx.beginPath(); ctx.arc(px + ox, oy, r, 0, Math.PI * 2); ctx.fill();
            });
            ctx.fillStyle = '#2a1e14';
            ctx.strokeStyle = 'rgba(201,168,76,0.2)';
            ctx.lineWidth = 1;
            roundRect(ctx, px - 18, H * 0.62, 36, H * 0.05, 2);
            ctx.fill(); ctx.stroke();

            // Wall art
            const ax = W * 0.46, ay = H * 0.1, aw = W * 0.16, ah = H * 0.22;
            ctx.fillStyle = '#1a1610';
            ctx.strokeStyle = 'rgba(201,168,76,0.25)';
            ctx.lineWidth = 1;
            roundRect(ctx, ax, ay, aw, ah, 2);
            ctx.fill(); ctx.stroke();
            // Abstract shapes in art
            const artGrad = ctx.createLinearGradient(ax, ay, ax + aw, ay + ah);
            artGrad.addColorStop(0, 'rgba(201,168,76,0.15)');
            artGrad.addColorStop(1, 'rgba(100,80,40,0.05)');
            ctx.fillStyle = artGrad;
            ctx.beginPath(); ctx.arc(ax + aw * 0.5, ay + ah * 0.45, aw * 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = 'rgba(201,168,76,0.1)';
            ctx.beginPath(); ctx.arc(ax + aw * 0.4, ay + ah * 0.55, aw * 0.2, 0, Math.PI * 2); ctx.stroke();

            // Ambient particles
            for (let i = 0; i < 18; i++) {
                ctx.fillStyle = `rgba(201,168,76,${Math.random() * 0.08 + 0.02})`;
                ctx.beginPath();
                ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Film grain
            for (let i = 0; i < 800; i++) {
                ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.02})`;
                ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
            }
        }

        function roundRect(ctx, x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        }

        /* ─── WORK CANVASES ─── */
        function drawWorkCanvas(id, palette, pattern) {
            const canvas = document.getElementById(id);
            if (!canvas) return;
            const W = canvas.offsetWidth || 500;
            const H = canvas.offsetHeight || 300;
            canvas.width = W; canvas.height = H;
            const ctx = canvas.getContext('2d');

            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, palette[0]);
            bg.addColorStop(1, palette[1]);
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            if (pattern === 'penthouse') {
                // Luxury living room
                ctx.fillStyle = palette[2];
                ctx.fillRect(0, H * 0.7, W, H * 0.3);
                // Large windows
                for (let i = 0; i < 3; i++) {
                    const wx = W * 0.08 + i * (W * 0.3);
                    ctx.fillStyle = 'rgba(100,150,255,0.06)';
                    roundRect(ctx, wx, H * 0.05, W * 0.24, H * 0.55, 2);
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(201,168,76,0.15)';
                    ctx.lineWidth = 1; ctx.stroke();
                }
                // Statement chandelier
                const cx2 = W / 2;
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const r = W * 0.12;
                    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
                    ctx.lineWidth = 0.8;
                    ctx.beginPath(); ctx.moveTo(cx2, H * 0.08); ctx.lineTo(cx2 + Math.cos(angle) * r, H * 0.08 + Math.sin(angle) * r * 0.4 + 20); ctx.stroke();
                    // bulbs
                    const glow2 = ctx.createRadialGradient(cx2 + Math.cos(angle) * r, H * 0.12 + Math.sin(angle) * r * 0.4, 0, cx2 + Math.cos(angle) * r, H * 0.12 + Math.sin(angle) * r * 0.4, 12);
                    glow2.addColorStop(0, 'rgba(255,220,100,0.6)');
                    glow2.addColorStop(1, 'transparent');
                    ctx.fillStyle = glow2;
                    ctx.beginPath(); ctx.arc(cx2 + Math.cos(angle) * r, H * 0.12 + Math.sin(angle) * r * 0.4, 12, 0, Math.PI * 2); ctx.fill();
                }
            } else if (pattern === 'lounge') {
                // Bar/lounge scene
                ctx.fillStyle = palette[2];
                ctx.fillRect(0, H * 0.65, W, H * 0.35);
                // Bar counter
                ctx.fillStyle = '#1a1410';
                ctx.strokeStyle = 'rgba(201,168,76,0.35)';
                ctx.lineWidth = 1;
                roundRect(ctx, W * 0.1, H * 0.55, W * 0.8, H * 0.12, 4);
                ctx.fill(); ctx.stroke();
                // Bar stools
                for (let i = 0; i < 4; i++) {
                    const bx = W * 0.18 + i * (W * 0.2);
                    ctx.fillStyle = '#2a2018';
                    ctx.beginPath(); ctx.arc(bx, H * 0.52, W * 0.05, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = 'rgba(201,168,76,0.2)'; ctx.stroke();
                    ctx.strokeStyle = 'rgba(201,168,76,0.3)'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(bx, H * 0.57); ctx.lineTo(bx, H * 0.7); ctx.stroke();
                }
                // Shelves with bottles
                for (let row = 0; row < 2; row++) {
                    for (let col = 0; col < 7; col++) {
                        const bx = W * 0.14 + col * (W * 0.11);
                        const by = H * 0.15 + row * H * 0.14;
                        ctx.fillStyle = `rgba(${40 + col * 8},${30 + row * 10},20,0.8)`;
                        roundRect(ctx, bx, by, W * 0.05, H * 0.1, 2);
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(201,168,76,0.15)'; ctx.stroke();
                    }
                }
                // Shelf glow
                const sg = ctx.createRadialGradient(W * 0.5, H * 0.2, 0, W * 0.5, H * 0.2, W * 0.4);
                sg.addColorStop(0, 'rgba(201,168,76,0.06)');
                sg.addColorStop(1, 'transparent');
                ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
            } else {
                // Elegant bedroom
                ctx.fillStyle = palette[2];
                ctx.fillRect(0, H * 0.68, W, H * 0.32);
                // Bed
                ctx.fillStyle = '#1e1a16';
                ctx.strokeStyle = 'rgba(201,168,76,0.2)';
                ctx.lineWidth = 1;
                roundRect(ctx, W * 0.15, H * 0.45, W * 0.7, H * 0.28, 4);
                ctx.fill(); ctx.stroke();
                // Headboard
                ctx.fillStyle = '#2a2218';
                roundRect(ctx, W * 0.15, H * 0.35, W * 0.7, H * 0.14, 4);
                ctx.fill(); ctx.stroke();
                // Pillows
                [[W * 0.2, H * 0.47], [W * 0.56, H * 0.47]].forEach(([px, py]) => {
                    ctx.fillStyle = '#f5f0e8';
                    roundRect(ctx, px, py, W * 0.22, H * 0.1, 4);
                    ctx.fill();
                    ctx.fillStyle = 'rgba(0,0,0,0.15)';
                    roundRect(ctx, px + 4, py + 4, W * 0.22 - 8, H * 0.1 - 8, 2);
                    ctx.fill();
                });
                // Bedding
                const bedGrad = ctx.createLinearGradient(W * 0.15, H * 0.55, W * 0.85, H * 0.73);
                bedGrad.addColorStop(0, '#2d2820');
                bedGrad.addColorStop(1, '#1e1a16');
                ctx.fillStyle = bedGrad;
                roundRect(ctx, W * 0.15, H * 0.55, W * 0.7, H * 0.18, 2);
                ctx.fill();
                // Bedside lamps
                [[W * 0.1, H * 0.4], [W * 0.82, H * 0.4]].forEach(([lx, ly]) => {
                    const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 60);
                    lg.addColorStop(0, 'rgba(255,210,80,0.2)');
                    lg.addColorStop(1, 'transparent');
                    ctx.fillStyle = lg;
                    ctx.beginPath(); ctx.arc(lx, ly, 60, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = 'rgba(201,168,76,0.5)';
                    ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fill();
                });
            }

            // Overlay
            const ov = ctx.createLinearGradient(0, 0, 0, H);
            ov.addColorStop(0, 'rgba(0,0,0,0.1)');
            ov.addColorStop(1, 'rgba(0,0,0,0.25)');
            ctx.fillStyle = ov; ctx.fillRect(0, 0, W, H);

            // Grain
            for (let i = 0; i < 400; i++) {
                ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
                ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
            }
        }

        /* ─── AVATAR CANVASES ─── */
        function drawAvatar(id, hue) {
            const canvas = document.getElementById(id);
            if (!canvas) return;
            canvas.width = 44; canvas.height = 44;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createLinearGradient(0, 0, 44, 44);
            grad.addColorStop(0, `hsl(${hue},40%,25%)`);
            grad.addColorStop(1, `hsl(${hue + 30},50%,15%)`);
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(22, 22, 22, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(${hue},50%,70%)`;
            ctx.font = 'bold 16px serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            const initials = [['AO'], ['JW'], ['FA']];
            ctx.fillText(id === 'av1' ? 'AO' : id === 'av2' ? 'JW' : 'FA', 22, 22);
        }

        /* ─── INIT ─── */
        window.addEventListener('load', () => {
            drawAbout();
            drawWorkCanvas('work1', ['#14100c', '#1e1810', '#2a2018'], 'penthouse');
            drawWorkCanvas('work2', ['#0c0e14', '#10121c', '#1a1c28'], 'lounge');
            drawWorkCanvas('work3', ['#10100e', '#181614', '#201e18'], 'bedroom');
            drawAvatar('av1', 25);
            drawAvatar('av2', 200);
            drawAvatar('av3', 270);
        });
        window.addEventListener('resize', () => {
            drawAbout();
            drawWorkCanvas('work1', ['#14100c', '#1e1810', '#2a2018'], 'penthouse');
    drawWorkCanvas('work2', ['#0c0e14', '#10121c', '#1a1c28'], 'lounge');
    drawWorkCanvas('work3', ['#10100e', '#181614', '#201e18'], 'bedroom');
});
