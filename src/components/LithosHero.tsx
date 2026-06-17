import { useEffect, useRef, useState } from 'react';

// Make sure your images in the public folder are named exactly this, or change the names here:
const BG_IMAGE_1 = "/base-optimized.webp";
const BG_IMAGE_2 = "/reveal-optimized.webp";
const SPOTLIGHT_R = 260;

const RevealLayer = ({ image, cursorX, cursorY }: { image: string; cursorX: number; cursorY: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const revealDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const ctx = canvas.getContext('2d');
        if (ctx && revealDivRef.current) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
            gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
            gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
            ctx.fill();
            const dataUrl = canvas.toDataURL();
            revealDivRef.current.style.maskImage = `url(${dataUrl})`;
            revealDivRef.current.style.webkitMaskImage = `url(${dataUrl})`;
            revealDivRef.current.style.maskSize = '100% 100%';
            revealDivRef.current.style.webkitMaskSize = '100% 100%';
        }
        return () => window.removeEventListener('resize', resize);
    }, [cursorX, cursorY]);

    return (
        <>
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
            <div ref={revealDivRef} className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none" style={{ backgroundImage: `url(${image})`, zIndex: 10 }} />
        </>
    );
};

export default function LithosHero() {
    const mouse = useRef({ x: -999, y: -999 });
    const smooth = useRef({ x: -999, y: -999 });
    const rafRef = useRef<number>(0);
    const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };
        const handleTouchEnd = () => { mouse.current = { x: -999, y: -999 }; };

        const animate = () => {
            smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
            smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
            setCursorPos({ x: smooth.current.x, y: smooth.current.y });
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        // RESTORED: mesh-bg and pt-24 md:pt-0 to match your exact original layout
        <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden mesh-bg pt-24 md:pt-0">

            {/* 1. Base Image */}
            <div className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom" style={{ backgroundImage: `url(${BG_IMAGE_1})`, zIndex: 0 }} />

            {/* 2. FIXED OVERLAY: Using your site's exact background color (#111110) instead of pure black */}
            <div className="absolute inset-0 bg-[#111110]/50" style={{ zIndex: 5 }}></div>

            {/* 3. Cursor Reveal Image */}
            <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

            {/* 4. YOUR ORIGINAL CONTENT */}
            <div className="relative z-20 text-center px-6 max-w-4xl">

                <div className="hero-anim hero-reveal" style={{ animationDelay: '0.3s' }}>
                    <h1
                        className="glitch font-heading font-bold text-text-primary text-4xl sm:text-5xl md:text-7xl leading-[1.1] tracking-tight"
                        data-text="QAZI SULTAN"
                    >
                        QAZI SULTAN
                    </h1>
                </div>

                <div className="mt-4 md:mt-6 hero-anim hero-fade" style={{ animationDelay: '0.5s' }}>
                    <div className="typing-container text-lg md:text-xl font-heading font-medium text-text-primary">
                        <div className="typing-slider">
                            <span>Digital Marketing Associate</span>
                            <span>Meta &amp; Google Certified</span>
                            <span>Paid Ads | SEO | Lead Gen</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
                    <p className="text-text-muted text-base italic font-body">
                        I don't just run campaigns. I deliver results.
                    </p>
                </div>

                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 hero-anim hero-fade" style={{ animationDelay: '0.9s' }}>
                    <a
                        href="#experience"
                        className="btn-glow relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-accent-blue text-background font-semibold text-base rounded-full transition-all duration-200 hover:bg-white hover:text-background"
                    >
                        View My Work
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                        </svg>
                    </a>
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-text-primary font-semibold text-base rounded-full transition-all duration-200 hover:border-text-primary hover:text-text-primary"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Resume
                    </a>
                </div>
            </div>

            {/* Scroll Arrow */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-arrow z-20" aria-hidden="true">
                <svg className="text-accent-blue" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
            </div>

        </section>
    );
}