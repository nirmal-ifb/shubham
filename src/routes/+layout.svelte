<script lang="ts">
  import '../app.css';
  import type { LayoutProps } from './$types';
  import { onMount } from 'svelte';

  let { children }: LayoutProps = $props();

  let isDarkMode = $state(true);
  let isEnvelopeOpened = $state(false);
  let isEnvelopeOpening = $state(false);

  const petalColorsLight = ['#f5c5cd', '#e8d5a3', '#fde8ee', '#d4a8b0', '#c9a96e'];
  const petalColorsDark  = ['#dfb76c', '#f5da8a', '#c89547', '#e8c872', '#b8860b'];

  class Petal {
    x = 0; y = 0; size = 0; speed = 0; angle = 0;
    rotSpeed = 0; color = ''; opacity = 0; drift = 0;
    w = 0; h = 0;

    constructor(w: number, h: number) {
      this.w = w;
      this.h = h;
      this.reset(true);
    }

    updateDimensions(w: number, h: number) {
      this.w = w;
      this.h = h;
    }

    reset(initial = false) {
      this.x = Math.random() * this.w;
      this.y = initial ? Math.random() * this.h : -20;
      this.size = Math.random() * 10 + 5;
      this.speed = Math.random() * 1.2 + 0.4;
      this.angle = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      const palette = isDarkMode ? petalColorsDark : petalColorsLight;
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.opacity = Math.random() * 0.45 + 0.15;
      this.drift = (Math.random() - 0.5) * 0.5;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.y += this.speed;
      this.x += this.drift;
      this.angle += this.rotSpeed;
      if (this.y > this.h + 20) this.reset();
    }
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
  }

  function openEnvelope() {
    if (isEnvelopeOpening || isEnvelopeOpened) return;
    isEnvelopeOpening = true;
    setTimeout(() => {
      isEnvelopeOpened = true;
      isEnvelopeOpening = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1250);
  }

  function replayEnvelope() {
    isEnvelopeOpened = false;
    isEnvelopeOpening = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    // Dark mode is default: check if user explicitly chose light
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light') {
        isDarkMode = false;
        document.documentElement.removeAttribute('data-theme');
      } else {
        isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch {}

    // Falling petal canvas animation
    const canvas = document.getElementById('petal-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const petals = Array.from({ length: 28 }, () => new Petal(window.innerWidth, window.innerHeight));

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      petals.forEach(p => p.updateDimensions(canvas.width, canvas.height));
    }
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => { p.update(); p.draw(ctx); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    // Scroll reveal – watches all variants
    const revealSel = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-bounce';
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });

    const observe = () => document.querySelectorAll(revealSel + ':not(.visible)').forEach(el => io.observe(el));
    observe();

    // Car trigger observer
    const carIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('car-go'); carIo.unobserve(e.target); }
      });
    }, { threshold: 0.45 });

    const observeCars = () => document.querySelectorAll('[data-car]:not(.car-go)').forEach(el => carIo.observe(el));
    observeCars();

    const mo = new MutationObserver(() => { observe(); observeCars(); });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      mo.disconnect();
    };
  });
</script>

<!-- Floating Toolbar -->
<div class="floating-bar" aria-label="Page controls">
  <button class="tool-btn" onclick={toggleTheme} aria-label="Toggle dark mode" id="theme-toggle-btn">
    {#if isDarkMode}
      <span>☀️</span> <span>Light</span>
    {:else}
      <span>🌙</span> <span>Dark</span>
    {/if}
  </button>
  <button class="tool-btn" onclick={replayEnvelope} aria-label="Replay envelope opening animation" id="replay-envelope-btn">
    <span>✉️</span> <span>Envelope</span>
  </button>
</div>

<!-- Royal Envelope Opening Experience -->
<div class="envelope-overlay" class:opened={isEnvelopeOpened} class:opening={isEnvelopeOpening}>
  <div class="env-container">
    <div class="envelope" onclick={openEnvelope} role="button" tabindex="0" onkeydown={(e) => { if (e.key === 'Enter') openEnvelope(); }}>
      <!-- Interior back -->
      <div class="env-back-interior"></div>

      <!-- Card that slides out -->
      <div class="env-invitation-card">
        <h2 class="env-card-title">Shubham &amp; Shreya</h2>
        <p class="env-card-sub">Together with their families</p>
      </div>

      <!-- Envelope pockets -->
      <div class="env-pocket-left"></div>
      <div class="env-pocket-right"></div>
      <div class="env-pocket-bottom"></div>

      <!-- Flap (flips open) -->
      <div class="env-flap"></div>

      <!-- Golden Wax Seal -->
      <button class="wax-seal" onclick={openEnvelope} aria-label="Break seal to open invitation">
        <span class="seal-icon">💍</span>
        <span class="seal-word">OPEN</span>
      </button>
    </div>
  </div>
  <p class="env-instructions">✨ Tap the Wax Seal to Open Your Invitation ✨</p>
</div>

<canvas id="petal-canvas" aria-hidden="true"></canvas>

<!-- No nav bar between pages: URLs (/ and /haldi) are isolated per user requirement -->
<main>
  {@render children()}
</main>
