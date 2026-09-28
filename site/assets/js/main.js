/* =========================================================================
   Lok Mob · Interações da landing page
   Comparador de planos, tabela por cidade, formulário → WhatsApp,
   rolagem suave (Lenis) e animações (GSAP + ScrollTrigger).
   ========================================================================= */
(() => {
  'use strict';

  const D = window.LM_DATA;
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);
  const animate = hasGsap && !reduceMotion;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR');

  /* Evita viúvas: une as duas últimas palavras de um bloco com espaço
     inseparável, para nenhuma palavra ficar sozinha na última linha. */
  function noWidows(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    // palavras de 1 ou 2 letras (a, o, e, de, em, ou...) e "R$" grudam na palavra seguinte
    nodes.forEach((n) => {
      let v = n.nodeValue;
      let prev;
      do {
        prev = v;
        v = v.replace(/(^|[\s\u00A0])([A-Za-zÀ-ÿ]{1,2}|R\$) +(?=\S)/g, '$1$2\u00A0');
      } while (v !== prev);
      n.nodeValue = v;
    });
    for (let i = nodes.length - 1; i >= 0; i--) {
      const t = nodes[i].nodeValue.replace(/\s+$/, '');
      const idx = t.lastIndexOf(' ');
      if (idx > 0) {
        // se a última "palavra" já tem espaço inseparável (ex.: "a simulação"), não une mais nada
        if (t.slice(idx + 1).includes('\u00A0')) return;
        nodes[i].nodeValue = t.slice(0, idx) + '\u00A0' + t.slice(idx + 1) + nodes[i].nodeValue.slice(t.length);
        return;
      }
      if (/\S/.test(t) && idx === -1 && i < nodes.length - 1) return;
    }
  }
  const WIDOW_SELECTOR = 'h1, h2, h3, p, summary, dd, .lm-pt-group th, .lm-offer__text strong, .lm-offer__text span, .lm-planlist span, .lm-facts span, .lm-includes li > span, .lm-hero__included';

  if (!animate) root.classList.remove('lm-js');
  root.classList.add('lm-ready');

  const state = {
    plan: 'conquiste',
    vehicle: 'bros',
    consultant: null
  };

  /* -----------------------------------------------------------------------
     Rolagem suave (Lenis) integrada ao ticker do GSAP
  ------------------------------------------------------------------------ */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: !hasGsap
    });
    if (hasGsap) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }
  }

  const header = $('[data-header]');
  const headerOffset = () => (header ? header.offsetHeight : 0) + 12;

  function scrollToEl(el, { focus } = {}) {
    if (!el) return;
    const done = () => {
      if (focus) focus.focus({ preventScroll: true });
    };
    if (lenis) {
      lenis.scrollTo(el, { offset: -headerOffset(), duration: 1.25, onComplete: done });
    } else {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      done();
    }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    let focusEl = null;
    if (id === '#conteudo') {
      target.setAttribute('tabindex', '-1');
      focusEl = target;
    }
    scrollToEl(target, { focus: focusEl });
  });

  const onScrollHeader = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* -----------------------------------------------------------------------
     Comparador de planos
  ------------------------------------------------------------------------ */
  const tabs = $$('[role="tab"]');
  const panel = $('#plan-panel');
  const vehiclesBox = $('[data-vehicles]');
  const field = (name) => $(`[data-f="${name}"]`);
  const shownPrice = { fortaleza: null, sobral: null };

  // Regras por cidade: unidade de cobrança e caução podem mudar em Sobral
  const rule = (plan, city) => (plan.cityRules && plan.cityRules[city]) || {};
  const unitFor = (plan, city) => rule(plan, city).unit || plan.unit;
  const depositFor = (plan, spec, city) => rule(plan, city).deposit || spec.deposit;
  const unitWord = (unit) => unit.replace('/', '');

  const carUnavailable = (vehicleKey) => D.vehicles[vehicleKey].type === 'carro' && !D.carAvailable;

  function renderVehicles() {
    const plan = D.plans[state.plan];
    const keys = D.vehicleOrder.filter((k) => plan.vehicles[k]);
    if (!plan.vehicles[state.vehicle]) state.vehicle = 'bros';

    vehiclesBox.style.setProperty('--lm-cols', keys.length);
    vehiclesBox.innerHTML = keys.map((k) => {
      const v = D.vehicles[k];
      const checked = k === state.vehicle;
      const off = carUnavailable(k);
      return `<button type="button" role="radio" class="lm-vehicle${off ? ' is-unavailable' : ''}"
          aria-checked="${checked}" tabindex="${checked ? 0 : -1}" data-vehicle="${k}">
          <img src="${v.thumb}" alt="" width="44" height="44" loading="lazy">
          <span><b>${v.label}</b><small>${off ? 'Sem vaga agora' : v.tagline}</small></span>
        </button>`;
    }).join('');
  }

  function tweenPrice(el, city, value) {
    const prev = shownPrice[city];
    shownPrice[city] = value;
    el.classList.toggle('is-pending', value === null);
    if (value === null) { el.textContent = 'Sob consulta'; return; }
    if (!animate || prev === null || prev === value) { el.textContent = brl(value); return; }
    const obj = { v: prev };
    window.gsap.to(obj, {
      v: value, duration: 0.6, ease: 'power3.out',
      onUpdate: () => { el.textContent = brl(Math.round(obj.v)); }
    });
  }

  function renderComparator() {
    const plan = D.plans[state.plan];
    const spec = plan.vehicles[state.vehicle];
    const vehicle = D.vehicles[state.vehicle];
    const off = carUnavailable(state.vehicle);

    tabs.forEach((t) => {
      const on = t.dataset.plan === state.plan;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on) panel.setAttribute('aria-labelledby', t.id);
    });
    $$('.lm-planlist button').forEach((b) => b.classList.toggle('is-active', b.dataset.gotoPlan === state.plan));

    field('description').textContent = plan.description;
    tweenPrice(field('price-fortaleza'), 'fortaleza', spec.price.fortaleza);
    tweenPrice(field('price-sobral'), 'sobral', spec.price.sobral);
    const unitF = unitFor(plan, 'fortaleza');
    const unitS = unitFor(plan, 'sobral');
    const depF = depositFor(plan, spec, 'fortaleza');
    const depS = depositFor(plan, spec, 'sobral');
    field('unit').textContent = unitF + '*';
    field('unit-sobral').textContent = spec.price.sobral === null ? '' : unitS + '*';
    field('model').textContent = vehicle.model;

    let same = 'Valor próprio em Sobral';
    if (spec.price.sobral === null) same = 'Valor de Sobral sob consulta';
    else if (unitF !== unitS) same = `Em Sobral, cobrança por ${unitWord(unitS)}`;
    else if (spec.price.sobral === spec.price.fortaleza && depF === depS) same = 'Mesmo valor nas duas cidades';
    field('same').textContent = same;

    field('contract').textContent = spec.contract;
    field('deposit').textContent = depF === depS ? depF : `${depF} · Sobral ${depS}`;
    field('mileage').textContent = spec.mileage;
    field('overkm').textContent = spec.overkm;
    field('credit').textContent = spec.credit;
    field('reqs').textContent = spec.reqs;

    field('banner').textContent = plan.banner;
    field('waitlist').hidden = !off;
    $$('[data-f]', panel).forEach(noWidows);
    field('cta').textContent = off
      ? `Entrar na lista de espera · Carro ${plan.name}`
      : `Simular ${plan.name} · ${vehicle.label}`;
  }

  function setPlan(planKey, vehicleKey) {
    if (!D.plans[planKey]) return;
    state.plan = planKey;
    if (vehicleKey && D.plans[planKey].vehicles[vehicleKey]) state.vehicle = vehicleKey;
    renderVehicles();
    renderComparator();
  }

  function setVehicle(vehicleKey) {
    if (!D.plans[state.plan].vehicles[vehicleKey]) return;
    state.vehicle = vehicleKey;
    $$('.lm-vehicle', vehiclesBox).forEach((b) => {
      const on = b.dataset.vehicle === vehicleKey;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    renderComparator();
  }

  // Abas: clique + teclado (setas, Home, End), ativação automática
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => setPlan(tab.dataset.plan));
    tab.addEventListener('keydown', (e) => {
      const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      const next = tabs[(map[e.key] + tabs.length) % tabs.length];
      next.focus();
      setPlan(next.dataset.plan);
    });
  });

  // Veículos: radiogroup
  vehiclesBox.addEventListener('click', (e) => {
    const b = e.target.closest('[data-vehicle]');
    if (b) setVehicle(b.dataset.vehicle);
  });
  vehiclesBox.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const btns = $$('.lm-vehicle', vehiclesBox);
    const i = btns.findIndex((b) => b.dataset.vehicle === state.vehicle);
    const next = btns[(i + step + btns.length) % btns.length];
    setVehicle(next.dataset.vehicle);
    next.focus();
  });

  // Atalhos que escolhem plano (cards do hero e lista de planos)
  $$('[data-goto-plan]').forEach((el) => {
    el.addEventListener('click', () => {
      setPlan(el.dataset.gotoPlan, el.dataset.gotoVehicle);
      if (el.tagName === 'BUTTON' && window.innerWidth <= 1024) scrollToEl($('.lm-config'));
    });
  });

  // CTA do comparador → preenche o formulário
  $('[data-config-cta]').addEventListener('click', () => {
    prefillForm(state.plan, state.vehicle);
    scrollToEl($('#simulacao'), { focus: $('#f-name') });
  });

  /* -----------------------------------------------------------------------
     Tabela de valores por cidade
  ------------------------------------------------------------------------ */
  function renderPriceTable() {
    const body = $('[data-pricetable]');
    const cell = (value, unit) => (value === null
      ? '<td class="is-pending">Sob consulta</td>'
      : `<td><b>${brl(value)}</b><small>${unit}</small></td>`);

    body.innerHTML = D.planOrder.map((pk) => {
      const plan = D.plans[pk];
      const rows = D.vehicleOrder.filter((vk) => plan.vehicles[vk]).map((vk) => {
        const p = plan.vehicles[vk].price;
        const off = carUnavailable(vk);
        return `<tr class="${off ? 'is-unavailable' : ''}">
            <th scope="row">${D.vehicles[vk].model}${off ? '<span class="lm-pt-flag">Sem vaga agora</span>' : ''}</th>
            ${cell(p.fortaleza, unitFor(plan, 'fortaleza'))}${cell(p.sobral, unitFor(plan, 'sobral'))}
          </tr>`;
      }).join('');
      const uF = unitWord(unitFor(plan, 'fortaleza'));
      const uS = unitWord(unitFor(plan, 'sobral'));
      const per = uF === uS ? `valores por ${uF}` : `Fortaleza por ${uF}, Sobral por ${uS}`;
      return `<tr class="lm-pt-group"><th scope="rowgroup" colspan="3">${plan.fullName} <small class="lm-legal">· ${plan.vehicles.bros.contract.toLowerCase()}<span class="lm-pt-unit"> · ${per}</span></small></th></tr>${rows}`;
    }).join('');
  }

  /* -----------------------------------------------------------------------
     Consultores
  ------------------------------------------------------------------------ */
  function renderConsultants() {
    const ul = $('[data-consultants]');
    ul.innerHTML = D.consultants.map((c) => `
      <li>
        <span class="lm-people__avatar" aria-hidden="true">${c.name.charAt(0)}</span>
        <span class="lm-people__who"><b>${c.name}</b>${c.cityLabel}</span>
        <button type="button" class="lm-btn lm-btn--primary lm-cta" data-cta="consultor-${c.id}" data-consultant="${c.id}" aria-label="Simular com ${c.name}, ${c.cityLabel}">Simular</button>
      </li>`).join('');

    ul.addEventListener('click', (e) => {
      const b = e.target.closest('[data-consultant]');
      if (!b) return;
      const c = D.consultants.find((x) => x.id === b.dataset.consultant);
      if (cityBase(form.city.value) !== c.city) form.city.value = c.city;
      setConsultant(c);
      clearError('city');
      scrollToEl($('#simulacao'), { focus: $('#f-name') });
    });
  }

  /* -----------------------------------------------------------------------
     Formulário → WhatsApp
  ------------------------------------------------------------------------ */
  const formEl = $('#lead-form');
  const form = {
    name: $('#f-name'),
    phone: $('#f-phone'),
    city: $('#f-city'),
    plan: $('#f-plan'),
    consultant: $('#f-consultant'),
    vehicles: $$('input[name="vehicle"]', formEl)
  };
  const hint = $('[data-vehicle-hint]');
  const status = $('[data-form-status]');
  const defaultStatus = status.textContent;
  const carRadio = form.vehicles.find((r) => r.value === 'carro');

  const selectedVehicle = () => (form.vehicles.find((r) => r.checked) || {}).value || 'nao-sei';

  // RMF é atendida pelos consultores de Fortaleza
  const cityBase = (cityKey) => (cityKey === 'rmf' ? 'fortaleza' : cityKey);

  // Campo "Consultor": opções agrupadas por cidade
  const groups = {};
  D.consultants.forEach((c) => { (groups[c.city] = groups[c.city] || []).push(c); });
  form.consultant.insertAdjacentHTML('beforeend', Object.keys(groups).map((city) => `
    <optgroup label="${D.cities[city].label}">
      ${groups[city].map((c) => `<option value="${c.id}">${c.name} · ${c.cityLabel}</option>`).join('')}
    </optgroup>`).join(''));

  function setConsultant(c) {
    state.consultant = c || null;
    form.consultant.value = c ? c.id : '';
  }

  form.consultant.addEventListener('change', () => {
    const c = D.consultants.find((x) => x.id === form.consultant.value) || null;
    state.consultant = c;
    if (c && cityBase(form.city.value) !== c.city) {
      form.city.value = c.city;
      clearError('city');
    }
  });

  function syncVehicleRules() {
    const isConquiste = form.plan.value === 'conquiste';
    carRadio.disabled = isConquiste;
    if (isConquiste && carRadio.checked) form.vehicles.find((r) => r.value === 'bros').checked = true;

    const v = selectedVehicle();
    if (isConquiste) hint.textContent = 'O Conquiste é só moto.';
    else if (v === 'carro' && !D.carAvailable) hint.textContent = 'Carros sem vaga no momento: você entra na lista de espera.';
    else hint.textContent = '';
  }

  function prefillForm(planKey, vehicleKey) {
    form.plan.value = planKey;
    const radio = form.vehicles.find((r) => r.value === vehicleKey);
    if (radio) radio.checked = true;
    syncVehicleRules();
  }

  form.plan.addEventListener('change', syncVehicleRules);
  form.vehicles.forEach((r) => r.addEventListener('change', syncVehicleRules));
  form.city.addEventListener('change', () => {
    clearError('city');
    const c = state.consultant;
    if (c && c.city !== cityBase(form.city.value)) setConsultant(null);
  });

  $$('[data-prefill-plan]').forEach((a) => a.addEventListener('click', () => {
    prefillForm(a.dataset.prefillPlan, a.dataset.prefillVehicle);
  }));

  // Máscara: (85) 9 0000-0000, preservando a posição do cursor
  function formatPhone(digits) {
    const d = digits.slice(0, 11);
    if (!d) return '';
    if (d.length <= 2) return `(${d}`;
    if (d.length === 3) return `(${d.slice(0, 2)}) ${d[2]}`;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3)}`;
    return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3, 7)}-${d.slice(7)}`;
  }
  form.phone.addEventListener('input', () => {
    const el = form.phone;
    const caret = el.selectionStart || 0;
    const digitsBefore = el.value.slice(0, caret).replace(/\D/g, '').length;
    el.value = formatPhone(el.value.replace(/\D/g, ''));
    let pos = 0;
    let seen = 0;
    while (pos < el.value.length && seen < digitsBefore) {
      if (/\d/.test(el.value[pos])) seen++;
      pos++;
    }
    el.setSelectionRange(pos, pos);
    clearError('phone');
  });
  form.name.addEventListener('input', () => clearError('name'));

  function setError(key, msg) {
    const input = form[key];
    input.closest('.lm-field').classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    $(`#f-${key}-err`).textContent = msg;
  }
  function clearError(key) {
    const input = form[key];
    input.closest('.lm-field').classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    $(`#f-${key}-err`).textContent = '';
  }

  function validate() {
    let first = null;
    const name = form.name.value.trim();
    if (name.length < 2) { setError('name', 'Conta pra gente como prefere ser chamado.'); first = first || form.name; }

    const digits = form.phone.value.replace(/\D/g, '');
    const validDDD = /^[1-9][1-9]$/.test(digits.slice(0, 2));
    if (digits.length !== 11 || !validDDD || digits[2] !== '9') {
      setError('phone', 'Digite o WhatsApp com DDD, no formato (85) 9 0000-0000.');
      first = first || form.phone;
    }
    if (!form.city.value) { setError('city', 'Escolha a cidade pra falar com o consultor certo.'); first = first || form.city; }
    if (first) first.focus();
    return !first;
  }

  function pickWhatsapp(cityKey) {
    if (state.consultant && state.consultant.whatsapp) return state.consultant.whatsapp;
    const base = cityBase(cityKey);
    const pool = D.consultants.filter((c) => c.city === base && c.whatsapp);
    if (pool.length) return pool[Math.floor(Math.random() * pool.length)].whatsapp;
    return D.fallbackWhatsapp;
  }

  function buildMessage() {
    const planKey = form.plan.value;
    const plan = D.plans[planKey];
    const vehicleKey = selectedVehicle();
    const cityKey = form.city.value;
    const city = D.cities[cityKey];
    const vehicleLabel = vehicleKey === 'nao-sei' ? 'Ainda não sei' : D.vehicles[vehicleKey].model;

    const lines = [
      'Olá! Quero uma simulação da Lok Mob.',
      '',
      `*Nome:* ${form.name.value.trim()}`,
      `*WhatsApp:* ${form.phone.value}`,
      `*Cidade:* ${city.label}`,
      `*Plano:* ${plan.fullName}`,
      `*Veículo:* ${vehicleLabel}`
    ];

    const spec = plan.vehicles[vehicleKey];
    if (spec) {
      const priceCity = city.priceFrom || cityKey;
      const value = spec.price[priceCity];
      if (value !== null && value !== undefined) {
        lines.push(`*Valor de referência:* ${brl(value)}${unitFor(plan, priceCity)} (${D.cities[priceCity].label})`);
      }
    }
    if (state.consultant) lines.push(`*Consultor:* ${state.consultant.name}`);
    if (vehicleKey === 'carro' && !D.carAvailable) {
      lines.push('', 'Sei que os carros estão sem vaga agora. Quero entrar na lista de espera.');
    }
    return lines.join('\n');
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    status.classList.remove('is-error');
    if (!validate()) {
      status.textContent = 'Confira os campos marcados antes de enviar.';
      status.classList.add('is-error');
      return;
    }
    const url = `https://wa.me/${pickWhatsapp(form.city.value)}?text=${encodeURIComponent(buildMessage())}`;

    if (window.dataLayer) {
      window.dataLayer.push({ event: 'lead_whatsapp', plano: form.plan.value, veiculo: selectedVehicle(), cidade: form.city.value, consultor: form.consultant.value || 'qualquer' });
    }

    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
      status.innerHTML = `Pronto! O WhatsApp abriu em outra aba. Se não abriu, <a href="${url}" target="_blank" rel="noopener">toque aqui</a>.`;
    } else {
      window.location.href = url;
    }
  });

  /* -----------------------------------------------------------------------
     Accordion: abre um item por vez, com altura animada
  ------------------------------------------------------------------------ */
  const faqItems = $$('[data-accordion] details');

  function closeFaq(d) {
    if (!d.open) return;
    const body = $('.lm-accordion__body', d);
    if (!animate) { d.open = false; return; }
    d.dataset.busy = '1';
    window.gsap.to(body, {
      height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut',
      onComplete: () => {
        d.open = false;
        body.style.height = '';
        body.style.opacity = '';
        delete d.dataset.busy;
        window.ScrollTrigger.refresh();
      }
    });
  }

  function openFaq(d) {
    faqItems.forEach((other) => { if (other !== d) closeFaq(other); });
    d.open = true;
    if (!animate) return;
    const body = $('.lm-accordion__body', d);
    d.dataset.busy = '1';
    window.gsap.fromTo(body, { height: 0, opacity: 0 }, {
      height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out',
      onComplete: () => {
        body.style.height = '';
        delete d.dataset.busy;
        window.ScrollTrigger.refresh();
      }
    });
  }

  faqItems.forEach((d) => {
    $('summary', d).addEventListener('click', (e) => {
      e.preventDefault();
      if (d.dataset.busy) return;
      if (d.open) closeFaq(d); else openFaq(d);
    });
  });

  /* -----------------------------------------------------------------------
     Inicialização do conteúdo dinâmico
  ------------------------------------------------------------------------ */
  renderVehicles();
  renderComparator();
  renderPriceTable();
  renderConsultants();
  syncVehicleRules();
  status.textContent = defaultStatus;
  $$(WIDOW_SELECTOR).forEach(noWidows);

  /* -----------------------------------------------------------------------
     Animações (GSAP + ScrollTrigger)
  ------------------------------------------------------------------------ */
  if (!animate) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });

  // Hero: título palavra por palavra
  const title = $('[data-split]');
  const text = title.textContent.trim();
  title.setAttribute('aria-label', text);
  title.innerHTML = text.split(/ +/)
    .map((w) => `<span class="lm-word" aria-hidden="true"><span>${w}</span></span>`)
    .join(' ');
  gsap.set(title, { visibility: 'visible' });

  const heroMedia = $('[data-hero-media]');
  const heroImg = $('img', heroMedia);
  const curtain = $('[data-hero-curtain]');
  gsap.set(heroMedia, { autoAlpha: 1 });

  const heroTl = gsap.timeline({ delay: 0.1 });
  heroTl
    // cortina laranja entra pela direita, a foto aparece por trás e a cortina sai pela esquerda
    .fromTo(curtain, { scaleX: 0, transformOrigin: '100% 50%' }, { scaleX: 1, duration: 0.7, ease: 'power4.inOut' }, 0)
    .set(heroImg, { autoAlpha: 1 }, 0.7)
    .to(curtain, { scaleX: 0, transformOrigin: '0% 50%', duration: 0.95, ease: 'power4.inOut' }, 0.7)
    .fromTo(heroImg, { scale: 1.28 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0.7)
    .from('.lm-hero__title .lm-word > span', { yPercent: 115, duration: 1, stagger: 0.055, ease: 'power4.out' }, 0.25)
    .fromTo('[data-hero-fade]', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.75)
    .from('.lm-badge', { x: -16, autoAlpha: 0, duration: 0.7 }, 1.4);

  gsap.to(heroImg, {
    yPercent: 6, ease: 'none',
    scrollTrigger: { trigger: '.lm-hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // Revelações genéricas
  gsap.set('[data-reveal]', { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.09 })
  });

  gsap.set('[data-reveal-card]', { autoAlpha: 0, y: 56 });
  ScrollTrigger.batch('[data-reveal-card]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12, ease: 'expo.out' })
  });

  $$('[data-reveal-list]').forEach((list) => {
    gsap.from(list.children, {
      y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.07,
      scrollTrigger: { trigger: list, start: 'top 85%', once: true }
    });
  });

  // Jornada Conquiste: linha preenche com a rolagem
  const mm = gsap.matchMedia();
  const journey = $('[data-journey]');
  mm.add({ wide: '(min-width: 761px)', narrow: '(max-width: 760px)' }, (ctx) => {
    const { wide } = ctx.conditions;
    gsap.fromTo('[data-journey-fill]', wide ? { scaleX: 0 } : { scaleY: 0 }, {
      scaleX: 1, scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: journey, start: 'top 78%', end: wide ? 'bottom 62%' : 'bottom 70%', scrub: 0.6 }
    });
  });
  gsap.from('[data-journey-step]', {
    y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.18,
    scrollTrigger: { trigger: journey, start: 'top 75%', once: true }
  });
  gsap.from('.lm-journey__end', {
    scale: 0, duration: 0.7, ease: 'back.out(2)',
    scrollTrigger: { trigger: journey, start: 'top 75%', once: true }
  });

  // Incluso: pinos e chaves ligando em sequência
  gsap.from('[data-pin]', {
    scale: 0.4, autoAlpha: 0, duration: 0.7, stagger: 0.14, ease: 'back.out(1.8)',
    scrollTrigger: { trigger: '.lm-included__media', start: 'top 70%', once: true }
  });
  const switches = $$('.lm-switch');
  gsap.set(switches, { '--lm-on': 0 });
  gsap.to(switches, {
    '--lm-on': 1, duration: 0.45, stagger: 0.16, ease: 'power2.inOut',
    scrollTrigger: { trigger: '.lm-includes', start: 'top 70%', once: true }
  });

  // Como funciona: a moto percorre a estrada e acende cada parada
  const route = $('[data-route]');
  const track = $('.road-track', route);
  const rider = $('[data-road-rider]', route);
  const fill = $('[data-road-fill]', route);
  const steps = $$('.lm-route__step', route);
  const nodes = steps.map((s) => $('.lm-route__node', s));

  function markReached(horizontal) {
    const t = track.getBoundingClientRect();
    const r = rider.getBoundingClientRect();
    const riderPos = horizontal ? r.left + r.width / 2 - t.left : r.top + r.height / 2 - t.top;
    nodes.forEach((n, i) => {
      const nb = n.getBoundingClientRect();
      const nodePos = horizontal ? nb.left + nb.width / 2 - t.left : nb.top + nb.height / 2 - t.top;
      steps[i].classList.toggle('is-reached', riderPos >= nodePos - 4);
    });
  }

  mm.add({ wide: '(min-width: 1025px)', narrow: '(max-width: 1024px)' }, (ctx) => {
    const { wide } = ctx.conditions;
    const travel = () => (wide
      ? track.offsetWidth - rider.offsetWidth
      : track.offsetHeight - rider.offsetHeight);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      onUpdate: () => markReached(wide),
      scrollTrigger: {
        trigger: route,
        start: wide ? 'top 65%' : 'top 70%',
        end: wide ? 'bottom 55%' : 'bottom 60%',
        scrub: 0.8,
        invalidateOnRefresh: true,
        onRefresh: () => markReached(wide)
      }
    });
    tl.fromTo(rider, wide ? { x: 0 } : { y: 0 }, wide ? { x: travel } : { y: travel }, 0)
      .fromTo(fill, wide ? { scaleX: 0 } : { scaleY: 0 }, wide ? { scaleX: 1 } : { scaleY: 1 }, 0);

    gsap.from($$('.lm-route__card', route), {
      y: wide ? 30 : 20, autoAlpha: 0, duration: 0.7, stagger: 0.12,
      scrollTrigger: { trigger: route, start: 'top 75%', once: true }
    });

    return () => steps.forEach((s) => s.classList.remove('is-reached'));
  });

  // Mosaico: barras de duração e foto
  gsap.fromTo('[data-bar]', { clipPath: 'inset(0 100% 0 0 round 8px)' }, {
    clipPath: 'inset(0 0% 0 0 round 8px)', duration: 0.9, stagger: 0.14, ease: 'power3.inOut',
    scrollTrigger: { trigger: '.lm-bars', start: 'top 82%', once: true }
  });
  gsap.fromTo('.lm-bento__photo img', { scale: 1.14 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: '.lm-bento__photo', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.from('.lm-bento__strikes s', {
    x: -12, autoAlpha: 0, duration: 0.5, stagger: 0.1,
    scrollTrigger: { trigger: '.lm-bento__credit', start: 'top 80%', once: true }
  });

  // Recalcula posições quando fontes e imagens terminam de carregar
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
