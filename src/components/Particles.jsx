import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const expanded = normalized.length === 3
    ? normalized.split("").map((value) => value + value).join("")
    : normalized;
  const value = parseInt(expanded, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export const Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !container) return;

    const rgb = hexToRgb(color).join(", ");
    let width = 0;
    let height = 0;
    let circles = [];
    let frame = null;
    let inView = false;
    let lastTime = null;

    const createCircle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      translateX: 0,
      translateY: 0,
      size: Math.random() * 2 + size,
      alpha: Math.random() * 0.6 + 0.1,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    });

    const draw = (step = 0) => {
      context.clearRect(0, 0, width, height);
      const smoothing = 1 - Math.pow(1 - 1 / Math.max(ease, 1), step);
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.x += (circle.dx + vx) * step;
        circle.y += (circle.dy + vy) * step;
        if (
          circle.x < -circle.size || circle.x > width + circle.size ||
          circle.y < -circle.size || circle.y > height + circle.size
        ) {
          circle = circles[i] = createCircle();
        }
        const attraction = Math.max(staticity, 1) / circle.magnetism;
        circle.translateX += (mouseRef.current.x / attraction - circle.translateX) * smoothing;
        circle.translateY += (mouseRef.current.y / attraction - circle.translateY) * smoothing;
        const x = circle.x + circle.translateX;
        const y = circle.y + circle.translateY;
        const edge = Math.min(x, width - x, y, height - y);
        context.beginPath();
        context.arc(x, y, circle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb}, ${circle.alpha * Math.max(0, Math.min(1, edge / 20))})`;
        context.fill();
      }
    };

    const animate = (time) => {
      const step = lastTime === null ? 1 : Math.min((time - lastTime) / (1000 / 60), 2);
      lastTime = time;
      draw(step);
      frame = window.requestAnimationFrame(animate);
    };

    const updateAnimation = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
      if (inView && !document.hidden) {
        frame = window.requestAnimationFrame(animate);
      } else {
        draw();
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      circles = Array.from({ length: quantity }, createCircle);
      draw();
    };

    const handlePointerMove = (event) => {
      if (!inView || event.pointerType === "touch") return;
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && x <= width && y >= 0 && y <= height;
      mouseRef.current = inside ? { x: x - width / 2, y: y - height / 2 } : { x: 0, y: 0 };
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    });
    resize();
    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", updateAnimation);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", updateAnimation);
    };
  }, [color, quantity, staticity, ease, size, refresh, vx, vy]);

  return (
    <div className={twMerge("pointer-events-none", className)} ref={containerRef} aria-hidden="true" {...props}>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
