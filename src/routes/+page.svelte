<script lang="ts">
  import { onMount } from 'svelte';

  let days = $state(0), hours = $state(0), minutes = $state(0), seconds = $state(0);
  const weddingDate = new Date('2026-12-14T12:21:00+05:30');

  onMount(() => {
    function tick() {
      const diff = weddingDate.getTime() - Date.now();
      if (diff <= 0) { days = hours = minutes = seconds = 0; return; }
      days    = Math.floor(diff / 86400000);
      hours   = Math.floor((diff / 3600000) % 24);
      minutes = Math.floor((diff / 60000) % 60);
      seconds = Math.floor((diff / 1000) % 60);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  });
</script>

<svelte:head>
  <title>Shubham Weds Shreya | Wedding Invitation</title>
  <meta name="description" content="You are cordially invited to the wedding of Shubham & Shreya on 14th December 2026 at Shree Varadsiddhi Vinayak Sabhagruh, Parra, Goa." />
</svelte:head>

<!-- Single unified card -->
<div class="page">
  <!-- Floral corners blend into cream/dark background -->
  <img src="/floral_tl.png" alt="" class="floral floral-tl" aria-hidden="true" />
  <img src="/floral_tl.png" alt="" class="floral floral-tr" aria-hidden="true" />
  <img src="/floral_br.png" alt="" class="floral floral-br" aria-hidden="true" />

  <!-- Single animated border frame -->
  <div class="border-frame border-outer animate-fade-in"></div>
  <div class="border-frame border-inner animate-fade-in delay-400"></div>

  <div class="content">
    <!-- Bride and Groom Character Avatar (Replaced S S symbol) -->
    <div class="avatar-wrap animate-scale-in">
      <div class="avatar-frame">
        <img src="/couple_avatar.png" alt="Shubham & Shreya - Bride and Groom" class="couple-avatar" />
        <span class="avatar-sparkle s-top">✨</span>
        <span class="avatar-sparkle s-right">💖</span>
        <span class="avatar-sparkle s-left">✨</span>
      </div>
    </div>

    <p class="invite-label animate-fade-in delay-200">YOU ARE INVITED TO</p>
    <p class="script-sub animate-fade-in delay-300">the wedding of</p>

    <!-- Main names with ample line-height and padding so they never get cut off -->
    <div class="name-container">
      <h1 class="name groom animate-fade-in-up delay-400">Shubham</h1>
    </div>

    <div class="weds-row animate-scale-in delay-500">
      <span class="weds-line"></span>
      <span class="weds-heart">♥</span>
      <span class="weds-text">Weds</span>
      <span class="weds-heart">♥</span>
      <span class="weds-line r"></span>
    </div>

    <div class="name-container">
      <h1 class="name bride animate-fade-in-up delay-600">Shreya</h1>
    </div>

    <div class="ornament animate-fade-in delay-700">✦ ——— ✦ ——— ✦</div>

    <!-- Event details -->
    <div class="details-grid reveal-left">
      <div class="detail-cell">
        <span class="d-icon">📅</span>
        <span class="d-label">WEDDING DATE</span>
        <span class="d-val">14<sup>th</sup> December 2026</span>
      </div>
      <div class="d-sep"></div>
      <div class="detail-cell">
        <span class="d-icon">🕐</span>
        <span class="d-label">MURTH</span>
        <span class="d-val">12:21 pm</span>
      </div>
      <div class="d-sep"></div>
      <div class="detail-cell">
        <span class="d-icon">👥</span>
        <span class="d-label">RECEPTION</span>
        <span class="d-val">2:00 pm onwards</span>
      </div>
    </div>

    <!-- Venue -->
    <div class="venue-card reveal-right">
      <span class="venue-pin">📍</span>
      <span class="venue-tag">VENUE</span>
      <p class="venue-name">Shree Varadsiddhi Vinayak Sabhagruh</p>
      <p class="venue-addr">Mapusa – Calangute Road, Parra, Goa</p>
      <a href="https://maps.app.goo.gl/FRrCM7yYmZzHBE9t7" target="_blank" rel="noopener noreferrer"
        class="map-btn" id="wedding-maps-btn" aria-label="Open venue on Google Maps">
        🗺️ View on Google Maps
      </a>
    </div>

    <!-- Car animation scene near maps -->
    <div class="car-scene wedding-scene reveal-bounce" data-car id="wedding-car-scene">
      <div class="cs-sky wedding-sky">
        <span class="cs-tree">🌸</span>
        <span class="cs-tree">🌺</span>
        <span class="cs-cloud">🌤️</span>
        <span class="cs-tree">🌸</span>
        <span class="cs-tree">🌺</span>
      </div>
      <div class="cs-road">
        <div class="cs-road-surface wedding-road"></div>
        <div class="cs-dashes"></div>
        <div class="cs-car-wrap">
          <img src="/couple_car.png" class="cs-car-img" alt="Shubham and Shreya heading to the wedding" />
        </div>
        <div class="cs-caption">Just Married! 💍</div>
        <div class="cs-pin" aria-hidden="true">📍</div>
      </div>
    </div>

    <!-- Map embed -->
    <div class="map-wrap reveal-scale">
      <iframe
        src="https://maps.google.com/maps?q=Shree+Varadsiddhi+Vinayak+Sabhagruh+Parra+Goa&output=embed&z=15"
        title="Wedding Venue" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <!-- Countdown -->
    <div class="countdown-card reveal-bounce">
      <p class="cd-label">Counting down to our special day</p>
      <div class="countdown">
        {#each [{v: days, u: 'Days'}, {v: hours, u: 'Hours'}, {v: minutes, u: 'Mins'}, {v: seconds, u: 'Secs'}] as item, i}
          {#if i > 0}<span class="cd-colon">:</span>{/if}
          <div class="cd-box">
            <span class="cd-num">{item.v}</span>
            <span class="cd-unit">{item.u}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Contact -->
    <div class="contact-row reveal">
      <span class="orn-small">✦ ——— ✦</span>
      <a href="tel:9049252232" class="contact-link" id="wedding-contact">📞 Contact: 9049252232</a>
      <span class="orn-small">✦ ——— ✦</span>
    </div>

    <p class="closing reveal">We look forward to celebrating with you!</p>
  </div>
</div>

<style>
  /* ── Page (single card) ── */
  .page {
    position: relative;
    width: min(680px, calc(100% - 24px));
    margin: 24px auto 60px;
    padding: 0 16px;
    background: var(--card-bg);
    box-shadow: var(--card-shadow);
    border-radius: 4px;
    z-index: 2;
    transition: background-color 0.4s ease, box-shadow 0.4s ease;
  }

  /* ── Border frames ── */
  .border-frame {
    position: absolute;
    pointer-events: none;
    z-index: 2;
    border-radius: 2px;
  }
  .border-outer {
    inset: 0;
    border: 1.5px solid var(--border-outer-color);
    transition: border-color 0.4s ease;
  }
  .border-inner {
    inset: 8px;
    border: 0.7px solid var(--border-inner-color);
    transition: border-color 0.4s ease;
  }

  /* ── Floral corners — Transparent PNG ── */
  .floral {
    position: absolute;
    width: clamp(140px, 30vw, 230px);
    pointer-events: none;
    z-index: 5;
    transition: filter 0.4s ease;
  }
  .floral-tl { top: -4px; left: -4px; transform-origin: top left; animation: scaleIn 1.2s ease both; }
  .floral-tr { top: -4px; right: -4px; transform: scaleX(-1); transform-origin: top right; animation: scaleIn 1.2s ease 0.15s both; }
  .floral-br { bottom: -4px; right: -4px; transform-origin: bottom right; animation: scaleIn 1.2s ease 0.3s both; }

  @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

  /* ── Content ── */
  .content {
    position: relative;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(75px, 14vw, 130px) 18px 50px;
    text-align: center;
    width: 100%;
  }

  /* ── Couple Avatar ── */
  .avatar-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  .avatar-frame {
    position: relative;
    width: clamp(120px, 25vw, 150px);
    height: clamp(120px, 25vw, 150px);
    border-radius: 50%;
    animation: floatGentle 4s ease-in-out infinite;
  }
  .couple-avatar {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
    filter: drop-shadow(0 6px 20px var(--gold-glow));
    transition: transform 0.3s ease;
  }
  .couple-avatar:hover {
    transform: scale(1.05);
  }
  .avatar-sparkle {
    position: absolute;
    font-size: 1.1rem;
    pointer-events: none;
    animation: sparkleTwinkle 2.5s ease-in-out infinite;
  }
  .s-top   { top: -6px; right: 10px; animation-delay: 0.2s; }
  .s-right { bottom: 8px; right: -8px; animation-delay: 0.8s; font-size: 0.9rem; }
  .s-left  { top: 20px; left: -10px; animation-delay: 1.4s; font-size: 0.95rem; }

  /* ── Typography ── */
  .invite-label {
    font-family: var(--font-sans);
    font-size: 0.67rem;
    letter-spacing: 0.26em;
    font-weight: 700;
    color: var(--text-medium);
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .script-sub {
    font-family: var(--font-script);
    font-size: clamp(1.25rem, 3.8vw, 1.7rem);
    color: var(--brown);
    margin-bottom: 5px;
  }

  /* ── Names — NO CUT OFF: safe line-height, padding, and visible overflow ── */
  .name-container {
    width: 100%;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2px 0;
  }
  .name {
    font-family: var(--font-script);
    font-size: clamp(2.5rem, 8.5vw, 5.2rem);
    line-height: 1.35;
    padding: 0.15em 0.25em;
    margin: 0;
    display: inline-block;
    text-align: center;
    overflow: visible;
    background: var(--name-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.06));
    max-width: 100%;
  }
  .groom { margin-bottom: 0px; }
  .bride { margin-top: 0px; }

  /* ── Weds divider ── */
  .weds-row {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    max-width: 280px;
    margin: 2px 0;
  }
  .weds-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold));
  }
  .weds-line.r {
    background: linear-gradient(to left, transparent, var(--gold));
  }
  .weds-text {
    font-family: var(--font-serif);
    font-size: 1rem;
    font-style: italic;
    color: var(--text-medium);
    letter-spacing: 0.08em;
  }
  .weds-heart {
    font-size: 0.6rem;
    color: var(--rose);
    animation: heartbeat 2.5s ease-in-out infinite;
  }

  /* ── Ornaments ── */
  .ornament {
    font-size: 0.7rem;
    letter-spacing: 0.27em;
    color: var(--gold);
    margin: 16px 0;
    font-family: var(--font-sans);
  }
  .orn-small {
    font-size: 0.56rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    font-family: var(--font-sans);
  }

  /* ── Details grid ── */
  .details-grid {
    display: flex;
    align-items: stretch;
    border-radius: 14px;
    overflow: hidden;
    width: 100%;
    max-width: 520px;
    margin: 6px 0 16px;
    background: var(--cell-bg);
    border: 1px solid var(--cell-border);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .detail-cell {
    flex: 1;
    padding: 13px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .d-sep {
    width: 1px;
    background: var(--cell-border);
    align-self: stretch;
  }
  .d-icon { font-size: 1.1rem; }
  .d-label {
    font-family: var(--font-sans);
    font-size: 0.56rem;
    letter-spacing: 0.16em;
    font-weight: 700;
    color: var(--text-medium);
    text-transform: uppercase;
  }
  .d-val {
    font-family: var(--font-elegant);
    font-size: clamp(0.8rem, 2.3vw, 0.95rem);
    font-weight: 600;
    color: var(--gold-dark);
    line-height: 1.3;
  }
  .d-val sup { font-size: 0.6em; }

  /* ── Venue card ── */
  .venue-card {
    background: var(--card-inner-bg);
    border: 1px solid var(--cell-border);
    border-radius: 14px;
    padding: 20px 24px;
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 14px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .venue-pin { font-size: 1.3rem; }
  .venue-tag {
    font-family: var(--font-sans);
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    font-weight: 700;
    color: var(--text-medium);
    text-transform: uppercase;
  }
  .venue-name {
    font-family: var(--font-serif);
    font-size: clamp(0.95rem, 2.7vw, 1.1rem);
    font-weight: 600;
    color: var(--text-dark);
    margin-top: 2px;
    line-height: 1.4;
  }
  .venue-addr {
    font-family: var(--font-elegant);
    font-size: clamp(0.84rem, 2.2vw, 0.94rem);
    color: var(--text-medium);
    font-style: italic;
  }
  .map-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    padding: 9px 22px;
    border-radius: 50px;
    background: var(--map-btn-bg);
    color: #fff;
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    box-shadow: 0 4px 14px var(--gold-glow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .map-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--gold-glow);
  }

  /* ══════════════════════════════════════
     CAR ANIMATION SCENE
  ══════════════════════════════════════ */
  .car-scene {
    width: 100%;
    max-width: 520px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--cell-border);
    margin: 4px 0 16px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.06);
  }

  .cs-sky {
    height: 52px;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
    padding: 0 16px 6px;
    position: relative;
  }
  .wedding-sky {
    background: var(--wedding-sky);
  }

  .cs-tree {
    font-size: 1.4rem;
    display: inline-block;
    animation: treeSway 3s ease-in-out infinite;
    transform-origin: bottom center;
  }
  .cs-tree:nth-child(2) { animation-delay: 0.6s; font-size: 1.1rem; }
  .cs-tree:nth-child(4) { animation-delay: 1.1s; }
  .cs-tree:nth-child(5) { animation-delay: 1.7s; font-size: 1.1rem; }
  .cs-cloud {
    font-size: 1.2rem;
    align-self: flex-start;
    margin-top: 4px;
    opacity: 0.8;
    animation: cloudDrift 8s ease-in-out infinite;
  }
  @keyframes cloudDrift { 0%,100%{transform:translateX(0)} 50%{transform:translateX(8px)} }

  .cs-road {
    height: 72px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .wedding-road {
    position: absolute;
    inset: 0;
    background: var(--wedding-road);
  }

  .cs-dashes {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    margin-top: -1.5px;
    background: repeating-linear-gradient(to right, rgba(255,255,255,0.55) 0, rgba(255,255,255,0.55) 18px, transparent 18px, transparent 36px);
    animation: roadDash 1.2s linear infinite;
  }
  .car-scene:not(:global(.car-go)) .cs-dashes { animation-play-state: paused; }

  .cs-road::before, .cs-road::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 5px;
    background: var(--cell-border);
  }
  .cs-road::before { top: 0; }
  .cs-road::after  { bottom: 0; }

  .cs-car-wrap {
    position: absolute;
    left: -180px;
    bottom: 8px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: left 2.8s cubic-bezier(0.33, 1, 0.68, 1);
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.18));
  }
  :global(.car-go) .cs-car-wrap {
    left: calc(100% - 185px);
  }

  .cs-car-img {
    width: 110px;
    height: auto;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.22));
    display: block;
  }

  .cs-caption {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-script);
    font-size: 0.95rem;
    color: rgba(255,255,255,0.92);
    white-space: nowrap;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
    pointer-events: none;
    opacity: 0;
    transition: opacity 1s ease 2s;
  }
  :global(.car-go) .cs-caption { opacity: 1; }

  .cs-pin {
    position: absolute;
    right: 18px;
    bottom: 12px;
    font-size: 2rem;
    z-index: 2;
    animation: pinBounce 1.8s ease-in-out infinite;
    transform-origin: bottom center;
  }
  :global(.car-go) .cs-pin { animation: pinBounceExcited 0.7s ease-in-out infinite; }

  /* ── Map embed ── */
  .map-wrap {
    width: 100%;
    max-width: 520px;
    height: 220px;
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid var(--cell-border);
    box-shadow: 0 5px 20px rgba(0,0,0,0.06);
    margin-bottom: 16px;
  }
  .map-wrap iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  /* ── Countdown ── */
  .countdown-card {
    width: 100%;
    max-width: 520px;
    padding: 20px 14px;
    margin-bottom: 16px;
    background: var(--card-inner-bg);
    border: 1px solid var(--cell-border);
    border-radius: 14px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .cd-label {
    font-family: var(--font-elegant);
    font-size: 0.95rem;
    font-style: italic;
    color: var(--text-medium);
    margin-bottom: 12px;
  }
  .countdown {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .cd-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    background: var(--cell-bg);
    border: 1px solid var(--cell-border);
    border-radius: 12px;
    padding: 10px 14px;
    min-width: 58px;
    box-shadow: 0 3px 12px rgba(0,0,0,0.03);
  }
  .cd-num {
    font-family: var(--font-serif);
    font-size: clamp(1.3rem, 4vw, 1.9rem);
    font-weight: 700;
    color: var(--gold-dark);
    line-height: 1;
    min-width: 2ch;
    text-align: center;
  }
  .cd-unit {
    font-family: var(--font-sans);
    font-size: 0.52rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-medium);
    font-weight: 700;
  }
  .cd-colon {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    color: var(--gold);
    line-height: 1;
    padding-bottom: 10px;
  }

  /* ── Contact ── */
  .contact-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }
  .contact-link {
    font-family: var(--font-sans);
    font-size: 0.86rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    color: var(--text-medium);
    text-decoration: none;
    transition: color 0.2s;
  }
  .contact-link:hover {
    color: var(--gold-dark);
  }
  .closing {
    font-family: var(--font-script);
    font-size: clamp(1.3rem, 3.8vw, 1.75rem);
    color: var(--brown);
    margin-top: 10px;
    margin-bottom: 30px;
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .page {
      width: calc(100% - 16px);
      margin: 14px auto 40px;
      padding: 0 4px;
    }
    .content {
      padding-top: 85px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 35px;
    }
    .floral {
      width: clamp(75px, 20vw, 100px);
    }
    .avatar-frame {
      width: 110px;
      height: 110px;
    }
    .details-grid {
      flex-direction: column;
      margin: 8px 0 16px;
    }
    .detail-cell {
      padding: 12px 14px;
    }
    .d-sep {
      width: 100%;
      height: 1px;
    }
    .venue-card {
      padding: 16px 14px;
    }
    .countdown {
      gap: 3px;
    }
    .cd-box {
      min-width: 46px;
      padding: 8px 6px;
      border-radius: 9px;
    }
    .cd-num {
      font-size: 1.35rem;
    }
    .cd-unit {
      font-size: 0.46rem;
      letter-spacing: 0.08em;
    }
    .cd-colon {
      font-size: 1rem;
    }
    .cs-car-img {
      width: 80px;
    }
    :global(.car-go) .cs-car-wrap {
      left: calc(100% - 130px);
    }
    .cs-pin {
      right: 12px;
      font-size: 1.6rem;
    }
    .cs-caption {
      font-size: 0.8rem;
    }
    .map-wrap {
      height: 190px;
    }
  }
</style>
