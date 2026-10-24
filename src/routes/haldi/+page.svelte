<script lang="ts">
  import { onMount } from 'svelte';

  let hd = $state(0), hh = $state(0), hm = $state(0), hs = $state(0);
  let wd = $state(0), wh = $state(0), wm = $state(0), ws = $state(0);

  const haldiDate   = new Date('2026-12-13T10:00:00+05:30');
  const weddingDate = new Date('2026-12-14T12:21:00+05:30');

  onMount(() => {
    function tick() {
      const now = Date.now();
      const dh = haldiDate.getTime() - now;
      const dw = weddingDate.getTime() - now;
      if (dh > 0) {
        hd = Math.floor(dh / 86400000);
        hh = Math.floor((dh / 3600000) % 24);
        hm = Math.floor((dh / 60000) % 60);
        hs = Math.floor((dh / 1000) % 60);
      } else { hd = hh = hm = hs = 0; }
      if (dw > 0) {
        wd = Math.floor(dw / 86400000);
        wh = Math.floor((dw / 3600000) % 24);
        wm = Math.floor((dw / 60000) % 60);
        ws = Math.floor((dw / 1000) % 60);
      } else { wd = wh = wm = ws = 0; }
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  });
</script>

<svelte:head>
  <title>Shubham & Shreya | Haldi & Wedding Invitation</title>
  <meta name="description" content="Join the Haldi ceremony (13th Dec 2026) and Wedding (14th Dec 2026) of Shubham & Shreya in Goa." />
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

    <!-- ═══════════════════════════════════════
         HALDI CEREMONY
    ═══════════════════════════════════════ -->

    <!-- Haldi Groom Medallion Avatar -->
    <div class="avatar-wrap animate-scale-in">
      <div class="avatar-frame">
        <img src="/groom_haldi_avatar.png" alt="Shubham - Haldi Ceremony" class="couple-avatar" />
        <span class="avatar-sparkle s-top">🌿</span>
        <span class="avatar-sparkle s-right">🌼</span>
        <span class="avatar-sparkle s-left">✨</span>
      </div>
    </div>

    <p class="invite-label animate-fade-in delay-200">YOU ARE INVITED TO</p>
    <p class="script-sub haldi-sub animate-fade-in delay-300">the haldi ceremony of</p>

    <!-- Main name - Groom only for Haldi -->
    <div class="name-container">
      <h1 class="name haldi-name animate-fade-in-up delay-400">Shubham</h1>
    </div>

    <div class="ornament haldi-orn animate-fade-in delay-500">✦ ——— ✦ ——— ✦</div>

    <div class="info-blurb reveal-scale">
      <p>The sacred Haldi ceremony marks the beginning of our wedding celebrations. Join us to bless Shubham with turmeric, love, and joy as we begin this beautiful journey! 🌸</p>
    </div>

    <div class="details-grid reveal-left">
      <div class="detail-cell">
        <span class="d-icon">📅</span>
        <span class="d-label">DATE</span>
        <span class="d-val haldi-val">13<sup>th</sup> December 2026</span>
      </div>
      <div class="d-sep haldi-sep"></div>
      <div class="detail-cell">
        <span class="d-icon">🌿</span>
        <span class="d-label">CEREMONY</span>
        <span class="d-val haldi-val">Haldi Ceremony</span>
      </div>
    </div>

    <div class="venue-card haldi-card reveal-right">
      <span class="venue-pin">📍</span>
      <span class="venue-tag">LOCATION</span>
      <p class="venue-name">Naroji Wada</p>
      <p class="venue-addr">Morjim, Pernem, Goa</p>
      <a href="https://maps.app.goo.gl/4sMsVwHBCrSJNCep7" target="_blank" rel="noopener noreferrer"
        class="map-btn haldi-btn" id="haldi-maps-btn" aria-label="Open Haldi venue on Google Maps">
        🗺️ View on Google Maps
      </a>
    </div>

    <!-- Car animation scene — Haldi -->
    <div class="car-scene haldi-scene reveal-bounce" data-car id="haldi-car-scene">
      <div class="cs-sky haldi-sky">
        <span class="cs-tree">🌴</span>
        <span class="cs-tree">🌿</span>
        <span class="cs-cloud">☁️</span>
        <span class="cs-tree">🌳</span>
        <span class="cs-tree">🌿</span>
      </div>
      <div class="cs-road">
        <div class="cs-road-surface"></div>
        <div class="cs-dashes"></div>
        <div class="cs-car-wrap">
          <img src="/couple_car.png" class="cs-car-img" alt="Shubham and Shreya in a decorated car" />
        </div>
        <div class="cs-caption">Heading to the Haldi!</div>
        <div class="cs-pin" aria-hidden="true">📍</div>
      </div>
    </div>

    <div class="map-wrap reveal-scale">
      <iframe src="https://maps.google.com/maps?q=Morjim+Pernem+Goa&output=embed&z=14"
        title="Haldi Venue" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <!-- Countdown Haldi -->
    <div class="countdown-card haldi-cd reveal-bounce">
      <p class="cd-label">Counting down to the Haldi! 🌿</p>
      <div class="countdown">
        {#each [{v: hd, u: 'Days'}, {v: hh, u: 'Hours'}, {v: hm, u: 'Mins'}, {v: hs, u: 'Secs'}] as item, i}
          {#if i > 0}<span class="cd-colon haldi-colon">:</span>{/if}
          <div class="cd-box haldi-box">
            <span class="cd-num haldi-num">{item.v}</span>
            <span class="cd-unit">{item.u}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         INNER DIVIDER
    ═══════════════════════════════════════ -->
    <div class="inner-divider reveal">
      <div class="id-line"></div>
      <div class="id-emblem">
        <span class="id-ring">💍</span>
      </div>
      <div class="id-line"></div>
    </div>

    <!-- ═══════════════════════════════════════
         WEDDING CEREMONY
    ═══════════════════════════════════════ -->

    <!-- Bride and Groom Character Avatar (Replaced S S symbol) -->
    <div class="avatar-wrap reveal-scale">
      <div class="avatar-frame">
        <img src="/couple_avatar.png" alt="Shubham & Shreya - Bride and Groom" class="couple-avatar" />
        <span class="avatar-sparkle s-top">✨</span>
        <span class="avatar-sparkle s-right">💖</span>
        <span class="avatar-sparkle s-left">✨</span>
      </div>
    </div>

    <p class="invite-label reveal">YOU ARE INVITED TO</p>
    <p class="script-sub reveal">the wedding of</p>

    <!-- Main wedding names with ample line-height so they never get cut off -->
    <div class="name-container">
      <h1 class="name groom reveal-left">Shubham</h1>
    </div>
    <div class="weds-row reveal">
      <span class="w-line"></span>
      <span class="weds-heart">♥</span>
      <span class="weds-text">Weds</span>
      <span class="weds-heart">♥</span>
      <span class="w-line r"></span>
    </div>
    <div class="name-container">
      <h1 class="name bride reveal-right">Shreya</h1>
    </div>

    <div class="ornament reveal">✦ ——— ✦ ——— ✦</div>

    <div class="details-grid reveal-right">
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

    <div class="venue-card reveal-left">
      <span class="venue-pin">📍</span>
      <span class="venue-tag">VENUE</span>
      <p class="venue-name">Shree Varadsiddhi Vinayak Sabhagruh</p>
      <p class="venue-addr">Mapusa – Calangute Road, Parra, Goa</p>
      <a href="https://maps.app.goo.gl/FRrCM7yYmZzHBE9t7" target="_blank" rel="noopener noreferrer"
        class="map-btn" id="wedding-maps-btn" aria-label="Open wedding venue on Google Maps">
        🗺️ View on Google Maps
      </a>
    </div>

    <!-- Car animation scene — Wedding -->
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

    <div class="map-wrap reveal-scale">
      <iframe src="https://maps.google.com/maps?q=Shree+Varadsiddhi+Vinayak+Sabhagruh+Parra+Goa&output=embed&z=15"
        title="Wedding Venue" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <!-- Countdown Wedding -->
    <div class="countdown-card reveal-bounce">
      <p class="cd-label">Counting down to the wedding day 💍</p>
      <div class="countdown">
        {#each [{v: wd, u: 'Days'}, {v: wh, u: 'Hours'}, {v: wm, u: 'Mins'}, {v: ws, u: 'Secs'}] as item, i}
          {#if i > 0}<span class="cd-colon">:</span>{/if}
          <div class="cd-box">
            <span class="cd-num">{item.v}</span>
            <span class="cd-unit">{item.u}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="contact-row reveal">
      <span class="orn-small">✦ ——— ✦</span>
      <a href="tel:9049252232" class="contact-link" id="haldi-contact">📞 Contact: 9049252232</a>
      <span class="orn-small">✦ ——— ✦</span>
    </div>

    <p class="closing reveal">We look forward to celebrating with you!</p>

  </div><!-- /content -->
</div><!-- /page -->

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
    pointer-events: none; z-index: 2;
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
    pointer-events: none; z-index: 5;
    transition: filter 0.4s ease;
  }
  .floral-tl { top: -4px; left: -4px; transform-origin: top left; animation: scaleIn 1.2s ease both; }
  .floral-tr { top: -4px; right: -4px; transform: scaleX(-1); transform-origin: top right; animation: scaleIn 1.2s ease 0.15s both; }
  .floral-br { bottom: -4px; right: -4px; transform-origin: bottom right; animation: scaleIn 1.2s ease 0.3s both; }

  @keyframes scaleIn   { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
  @keyframes ringDraw  { to{stroke-dashoffset:0} }

  /* ── Content ── */
  .content {
    position: relative; z-index: 4;
    display: flex; flex-direction: column; align-items: center;
    padding: clamp(75px, 14vw, 130px) 18px 50px;
    text-align: center;
    width: 100%;
  }



  /* ── Couple Avatar ── */
  .avatar-wrap {
    margin-bottom: 22px;
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
  .invite-label { font-family: var(--font-sans); font-size: 0.67rem; letter-spacing: 0.26em; font-weight: 700; color: var(--text-medium); margin-bottom: 4px; text-transform: uppercase; }
  .haldi-sub { color: var(--haldi-accent); }

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
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.06));
    max-width: 100%;
  }
  .haldi-name {
    background: var(--haldi-name-gradient);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .groom, .bride {
    background: var(--name-gradient);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .groom { margin-bottom: 0px; }
  .bride  { margin-top: 0px; }

  /* ── Divider rows ── */
  .weds-row {
    display: flex; align-items: center; gap: 9px;
    width: 100%; max-width: 280px; margin: 2px 0;
  }
  .w-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--gold)); }
  .w-line.r { background: linear-gradient(to left, transparent, var(--gold)); }
  .weds-text { font-family: var(--font-serif); font-size: 1rem; font-style: italic; color: var(--text-medium); letter-spacing: 0.08em; }
  .weds-heart { font-size: 0.6rem; color: var(--rose); animation: heartbeat 2.5s ease-in-out infinite; }

  /* ── Ornaments ── */
  .ornament { font-size: 0.7rem; letter-spacing: 0.27em; color: var(--gold); margin: 16px 0; font-family: var(--font-sans); }
  .haldi-orn { color: #d4a017; }
  .orn-small { font-size: 0.56rem; letter-spacing: 0.2em; color: var(--gold); font-family: var(--font-sans); }

  /* ── Info blurb ── */
  .info-blurb {
    max-width: 440px; margin-bottom: 16px;
    padding: 16px 20px;
    background: rgba(212,160,23,0.08); border: 1px solid rgba(212,160,23,0.24);
    border-radius: 14px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .info-blurb p { font-family: var(--font-elegant); font-size: clamp(0.88rem, 2.3vw, 0.98rem); line-height: 1.7; color: var(--text-medium); font-style: italic; }

  /* ── Details grid ── */
  .details-grid {
    display: flex; align-items: stretch;
    border-radius: 14px; overflow: hidden;
    width: 100%; max-width: 520px;
    margin: 6px 0 16px;
    background: var(--cell-bg); border: 1px solid var(--cell-border);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .detail-cell { flex: 1; padding: 13px 10px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .d-sep { width: 1px; background: var(--cell-border); align-self: stretch; }
  .haldi-sep { background: rgba(212,160,23,0.32); }
  .d-icon { font-size: 1.1rem; }
  .d-label { font-family: var(--font-sans); font-size: 0.56rem; letter-spacing: 0.16em; font-weight: 700; color: var(--text-medium); text-transform: uppercase; }
  .haldi-val { color: var(--haldi-accent); }
  .d-val sup { font-size: 0.6em; }

  /* ── Venue card ── */
  .venue-card {
    background: var(--card-inner-bg); border: 1px solid var(--cell-border);
    border-radius: 14px; padding: 20px 24px;
    width: 100%; max-width: 520px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    margin-bottom: 14px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .haldi-card { background: rgba(212,160,23,0.06); border-color: rgba(212,160,23,0.22); }
  .venue-pin { font-size: 1.3rem; }
  .venue-tag { font-family: var(--font-sans); font-size: 0.58rem; letter-spacing: 0.2em; font-weight: 700; color: var(--text-medium); text-transform: uppercase; }
  .venue-name { font-family: var(--font-serif); font-size: clamp(0.95rem, 2.7vw, 1.1rem); font-weight: 600; color: var(--text-dark); margin-top: 2px; line-height: 1.4; }
  .venue-addr { font-family: var(--font-elegant); font-size: clamp(0.84rem, 2.2vw, 0.94rem); color: var(--text-medium); font-style: italic; }
  .map-btn {
    display: inline-flex; align-items: center; gap: 6px; margin-top: 10px;
    padding: 9px 22px; border-radius: 50px;
    background: var(--map-btn-bg);
    color: #fff; text-decoration: none;
    font-family: var(--font-sans); font-size: 0.74rem; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    box-shadow: 0 4px 14px var(--gold-glow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .haldi-btn { background: var(--haldi-btn-bg); }
  .map-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--gold-glow); }

  /* ══════════════════════════════════════
     CAR ANIMATION SCENE
  ══════════════════════════════════════ */
  .car-scene {
    width: 100%; max-width: 520px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--cell-border);
    margin: 4px 0 16px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.06);
  }

  /* Sky strip */
  .cs-sky {
    height: 52px;
    display: flex; align-items: flex-end; justify-content: space-evenly;
    padding: 0 16px 6px;
    position: relative;
  }
  .haldi-sky  { background: var(--haldi-sky); }
  .wedding-sky { background: var(--wedding-sky); }

  .cs-tree {
    font-size: 1.4rem;
    display: inline-block;
    animation: treeSway 3s ease-in-out infinite;
    transform-origin: bottom center;
  }
  .cs-tree:nth-child(2) { animation-delay: 0.6s; font-size: 1.1rem; }
  .cs-tree:nth-child(4) { animation-delay: 1.1s; }
  .cs-tree:nth-child(5) { animation-delay: 1.7s; font-size: 1.1rem; }
  .cs-cloud { font-size: 1.2rem; align-self: flex-start; margin-top: 4px; opacity: 0.8; animation: cloudDrift 8s ease-in-out infinite; }
  @keyframes cloudDrift { 0%,100%{transform:translateX(0)} 50%{transform:translateX(8px)} }

  /* Road strip */
  .cs-road {
    height: 72px;
    position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .cs-road-surface {
    position: absolute; inset: 0;
    background: var(--road-surface);
  }
  .wedding-road { background: var(--wedding-road); }

  .cs-dashes {
    position: absolute; top: 50%; left: 0; right: 0;
    height: 3px; margin-top: -1.5px;
    background: repeating-linear-gradient(to right, rgba(255,255,255,0.55) 0, rgba(255,255,255,0.55) 18px, transparent 18px, transparent 36px);
    animation: roadDash 1.2s linear infinite;
  }
  .car-scene:not(:global(.car-go)) .cs-dashes { animation-play-state: paused; }

  /* Footpath edges */
  .cs-road::before, .cs-road::after {
    content: ''; position: absolute; left: 0; right: 0; height: 5px;
    background: var(--cell-border);
  }
  .cs-road::before { top: 0; }
  .cs-road::after  { bottom: 0; }

  /* Car wrapper */
  .cs-car-wrap {
    position: absolute;
    left: -180px;
    bottom: 8px;
    z-index: 3;
    display: flex; flex-direction: column; align-items: center;
    transition: left 2.8s cubic-bezier(0.33, 1, 0.68, 1);
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.18));
  }
  :global(.car-go) .cs-car-wrap { left: calc(100% - 185px); }

  .cs-car-img {
    width: 110px; height: auto;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.22));
    display: block;
  }

  /* Caption under car */
  .cs-caption {
    position: absolute;
    bottom: 6px; left: 50%; transform: translateX(-50%);
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

  /* Destination pin */
  .cs-pin {
    position: absolute; right: 18px; bottom: 12px;
    font-size: 2rem; z-index: 2;
    animation: pinBounce 1.8s ease-in-out infinite;
    transform-origin: bottom center;
  }
  :global(.car-go) .cs-pin { animation: pinBounceExcited 0.7s ease-in-out infinite; }

  /* ── Map embed ── */
  .map-wrap {
    width: 100%; max-width: 520px; height: 220px;
    border-radius: 14px; overflow: hidden;
    border: 2px solid var(--cell-border);
    box-shadow: 0 5px 20px rgba(0,0,0,0.06);
    margin-bottom: 16px;
  }
  .map-wrap iframe { width: 100%; height: 100%; border: none; display: block; }

  /* ── Countdown ── */
  .countdown-card {
    width: 100%; max-width: 520px;
    padding: 20px 14px; margin-bottom: 16px;
    background: var(--card-inner-bg); border: 1px solid var(--cell-border);
    border-radius: 14px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .haldi-cd { background: rgba(212,160,23,0.06); border-color: rgba(212,160,23,0.22); }
  .cd-label { font-family: var(--font-elegant); font-size: 0.95rem; font-style: italic; color: var(--text-medium); margin-bottom: 12px; }
  .countdown { display: flex; align-items: center; justify-content: center; gap: 6px; }
  .cd-box {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    background: var(--cell-bg); border: 1px solid var(--cell-border);
    border-radius: 12px; padding: 10px 14px; min-width: 58px;
    box-shadow: 0 3px 12px rgba(0,0,0,0.03);
  }
  .haldi-box { background: rgba(212,160,23,0.1); border-color: rgba(212,160,23,0.25); }
  .haldi-num { color: var(--haldi-accent); }
  .cd-unit { font-family: var(--font-sans); font-size: 0.52rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-medium); font-weight: 700; }
  .cd-colon { font-family: var(--font-serif); font-size: 1.5rem; color: var(--gold); line-height: 1; padding-bottom: 10px; }
  .haldi-colon { color: #d4a017; }

  /* ── Inner divider between Haldi and Wedding ── */
  .inner-divider {
    display: flex; align-items: center; gap: 14px;
    width: 100%; max-width: 520px;
    margin: 26px 0;
    padding: 6px 0;
  }
  .id-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--gold), transparent); }
  .id-emblem {
    width: 56px; height: 56px; border-radius: 50%;
    border: 1.5px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    background: var(--card-bg);
    box-shadow: 0 2px 14px var(--gold-glow);
  }
  .id-ring { font-size: 1.6rem; animation: heartbeat 3s ease-in-out infinite; }

  /* ── Contact ── */
  .contact-row { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 12px; }
  .contact-link { font-family: var(--font-sans); font-size: 0.86rem; font-weight: 700; letter-spacing: 0.07em; color: var(--text-medium); text-decoration: none; transition: color 0.2s; }
  .contact-link:hover { color: var(--gold-dark); }
  .closing { font-family: var(--font-script); font-size: clamp(1.3rem, 3.8vw, 1.75rem); color: var(--brown); margin-top: 10px; margin-bottom: 30px; }

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
    .info-blurb {
      padding: 12px 14px;
      font-size: 0.95rem;
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
