'use strict';

// Set these only when Dietmar releases the corresponding media.
// Use a local audio file (for example assets/titelsong.mp3) and the actual episode URL.
const release = {
  themeSong: null,
  episodeUrl: null,
  endOfPremiereMonth: '2027-03-01T00:00:00+01:00'
};

function connectOriginalNotices() {
  if (!document.body.matches('.page-agb, .page-impressum, .page-datenschutz')) return;
  const nav = document.getElementById('hauptmenue');
  const guestLink = nav.querySelector('.nav-guest');
  guestLink.href = 'index.html#gast-werden';
  nav.replaceChildren(guestLink);
  guestLink.insertAdjacentHTML('beforebegin', '<a href="index.html#format">Der Podcast</a>');
  guestLink.insertAdjacentHTML('afterend', `
    <a href="index.html#sponsoring">Sponsoring</a>
    <a href="index.html#faq">FAQ</a>
    <a href="index.html#startpost">Newsletter</a>
  `);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#121315');
  const privacyOverview = document.querySelector('.page-datenschutz .legal-overview');
  if (privacyOverview) {
    privacyOverview.insertAdjacentHTML('beforeend', '<p><a href="startpost-datenschutz.html">Datenschutz zum Newsletter</a></p>');
  }

  // Use the host's voice in the original notices. Keep their names, links and statutory wording intact.
  const voice = [
    ['Goldgezwitscher ist der Videocast von Dietmar Vogelmann.', 'Goldgezwitscher ist mein Videopodcast.'],
    ['Goldgezwitscher ist ein Projekt von Dietmar Vogelmann,', 'Ich betreibe Goldgezwitscher. Meine Geschäftsanschrift lautet Dietmar Vogelmann,'],
    ['Sie erreichen Dietmar unter', 'Sie erreichen mich unter'],
    ['direkt an Dietmar wenden', 'direkt an mich wenden'],
    ['Dietmar erstellt auf dieser Website', 'Ich erstelle auf dieser Website'],
    ['zum geschäftlich angegebenen Anschluss von Dietmar', 'zu meinem geschäftlichen Anschluss'],
    ['wird sie an Dietmar übermittelt', 'erhalte ich sie'],
    ['Wenn du Dietmar kontaktierst, verarbeitet er', 'Wenn du mich kontaktierst, verarbeite ich'],
    ['Entsprechend erhält Dietmar', 'Entsprechend erhalte ich'],
    ['Kontaktierst du Dietmar', 'Kontaktierst du mich'],
    ['Für eine Antwort benötigt Dietmar', 'Für eine Antwort benötige ich'],
    ['Dietmar beendet die betroffene Verarbeitung, es sei denn, er weist', 'Ich beende die betroffene Verarbeitung, es sei denn, ich weise']
  ];
  const words = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
  while (words.nextNode()) {
    const node = words.currentNode;
    if (!node.data.includes('Dietmar')) continue;
    for (const [from, to] of voice) {
      if (node.data.includes(from)) node.data = node.data.replace(from, to);
    }
  }
}

function activateMenu() {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('hauptmenue');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('span').textContent = open ? 'Schließen' : 'Menü';
  }

  menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.masthead')) setOpen(false);
  });
  window.matchMedia('(max-width: 900px)').addEventListener('change', () => setOpen(false));
  menu.hidden = false;
  document.documentElement.classList.add('menu-ready');
}

function markLandingSection() {
  if (!document.body.classList.contains('page-index')) return;
  const links = Array.from(document.querySelectorAll('#hauptmenue a[href^="#"]'));
  const sections = links.map(link => ({ link, section: document.querySelector(link.hash) }));
  let scheduled = false;
  function update() {
    scheduled = false;
    const top = document.querySelector('.masthead').getBoundingClientRect().bottom + 48;
    const visible = sections.filter(({ section }) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= top && rect.bottom > top;
    });
    const active = visible.find(({ link }) => link.hash === window.location.hash) || visible[0];
    for (const entry of sections) {
      if (entry === active) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('hashchange', schedule);
  schedule();
}

function showRelease() {
  const player = document.querySelector('[data-theme-player]');
  if (player && release.themeSong) {
    const audio = player.querySelector('audio');
    if (audio.getAttribute('src') !== release.themeSong) audio.src = release.themeSong;
    player.hidden = false;
  }
  if (release.episodeUrl) {
    document.querySelectorAll('[data-premiere-action]').forEach(link => {
      link.href = release.episodeUrl;
      link.textContent = 'Meine erste Folge ansehen';
    });
  }
  const published = Boolean(release.episodeUrl);
  if (published || Date.now() >= Date.parse(release.endOfPremiereMonth)) {
    document.querySelectorAll('[data-premiere-status]').forEach(status => {
      status.hidden = !published;
      if (published) status.textContent = 'Meine erste Folge ist online.';
    });
  }
}

function activateCampaignNotice() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;
  const onHomepage = document.body.matches('.page-index');
  footer.insertAdjacentHTML('beforebegin', `
    <dialog class="campaign-dialog" aria-labelledby="campaign-dialog-title" aria-describedby="campaign-dialog-copy" id="campaign-dialog">
      <div class="campaign-dialog-bar">
        <p class="eyebrow">Mein Crowdfunding</p>
        <button type="button" class="campaign-close" data-dialog-close aria-label="Hinweis schließen" autofocus>×</button>
      </div>
      <h2 id="campaign-dialog-title">Goldgezwitscher <em>auf Startnext.</em></h2>
      <p id="campaign-dialog-copy">Ich möchte meine ersten Gespräche in Karlsruhe aufnehmen. Wenn du den Podcast von Anfang an begleiten möchtest, findest du meine Kampagne auf Startnext.</p>
      <dl class="campaign-dates">
        <div><dt>Zeitraum</dt><dd>1.–31. Dezember 2026</dd></div>
        <div><dt>Mein Kampagnenziel</dt><dd>3.500&nbsp;€</dd></div>
      </dl>
      <div class="campaign-actions">
        <a class="button button-gold" data-campaign-link href="https://www.startnext.com/goldgezwitscher" rel="external noreferrer">Projekt auf Startnext ansehen</a>
        <button type="button" class="campaign-continue" data-dialog-close>${onHomepage ? 'Weiter zum Podcast' : 'Zurück zur Seite'}</button>
      </div>
    </dialog>
    <button type="button" class="campaign-launcher" id="campaign-launcher" aria-haspopup="dialog" aria-controls="campaign-dialog" hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 9h-3a3 3 0 0 0 0 6h3l11 4V5L9 9Zm0 0v6m-3 0 1.2 5h3l-1.1-5"></path></svg>
      Crowdfunding
    </button>
  `);
  const dialog = document.getElementById('campaign-dialog');
  const launcher = document.getElementById('campaign-launcher');

  const begins = Date.parse('2026-12-01T00:00:00+01:00');
  const ends = Date.parse('2027-01-01T00:00:00+01:00');
  const sessionKey = 'goldgezwitscher.startnext-2026.dismissed';
  let autoNoticePending = onHomepage;
  let timer;

  function rememberVisit() {
    try {
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // The current page still remembers that the notice was shown.
    }
  }

  function update() {
    const now = Date.now();
    const active = now >= begins && now < ends;
    document.querySelectorAll('[data-campaign-link]').forEach(link => {
      link.textContent = active ? 'Auf Startnext unterstützen' : 'Projekt auf Startnext ansehen';
    });
    const calendar = document.querySelector('[data-campaign-calendar]');
    if (calendar) calendar.hidden = now >= ends;
    launcher.hidden = now >= ends || typeof dialog.showModal !== 'function';

    if (now >= ends && dialog.open) dialog.close();
    if (!launcher.hidden && autoNoticePending && !location.hash && !document.hidden) {
      try {
        if (!sessionStorage.getItem(sessionKey)) {
          dialog.showModal();
          autoNoticePending = false;
        }
      } catch {
        // The same campaign and link are accessible in the page without session storage.
      }
    }

    showRelease();
    clearTimeout(timer);
    const next = [begins, ends, Date.parse(release.endOfPremiereMonth)].find(date => date > now);
    if (next) timer = setTimeout(update, Math.min(next - now, 2147483647));
  }

  launcher.addEventListener('click', () => {
    if (Date.now() >= ends) {
      update();
      return;
    }
    // Native dialog dismissal restores focus to this button, including on touch browsers.
    launcher.focus({ preventScroll: true });
    dialog.showModal();
    autoNoticePending = false;
  });
  dialog.querySelectorAll('[data-dialog-close]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.querySelector('[data-campaign-link]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', rememberVisit);
  window.addEventListener('pagehide', () => {
    if (dialog.open) {
      rememberVisit();
      dialog.close();
    }
  });
  window.addEventListener('pageshow', update);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) update();
  });
  update();
}

// The static site hands the draft to the visitor's mail application.
function mailDraftLink(recipient, subject, body) {
  return 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

function enableDraftCopy(button, output, status) {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent = 'Nachricht kopiert.';
    } catch {
      const details = output.closest('details');
      if (details) details.open = true;
      output.focus();
      output.select();
      status.textContent = 'Der Text ist markiert. Kopiere ihn und füge ihn in eine E-Mail ein.';
    }
  });
}

function activateNewsletter() {
  const webmail = document.querySelector('.newsletter-webmail');
  if (!webmail) return;
  const button = webmail.querySelector('[data-copy]');
  enableDraftCopy(button, webmail.querySelector('textarea'), webmail.querySelector('.copy-status'));
  button.hidden = false;
}

function activateInquiry() {
  const form = document.querySelector('[data-inquiry]');
  if (!form) return;
  const guest = form.dataset.inquiry === 'guest';
  const result = form.querySelector('.form-result');
  const output = form.querySelector('#prepared-message');
  const emailLink = form.querySelector('[data-email-link]');
  const copyStatus = form.querySelector('.copy-status');
  const interest = form.querySelector('#interest');
  function clearDraft() {
    result.hidden = true;
    output.value = '';
    emailLink.setAttribute('href', 'mailto:' + form.dataset.email);
    copyStatus.textContent = '';
  }
  if (!guest) {
    const tier = new URLSearchParams(window.location.search).get('paket');
    const match = Array.from(interest.options).find(option => tier && option.dataset.tier === tier);
    if (match) interest.value = match.value;
  }
  const requiredText = form.querySelectorAll('input[required]:not([type="checkbox"]), textarea[required]');
  requiredText.forEach(field => {
    field.addEventListener('input', () => {
      const trimmed = field.value.trim();
      let message = '';
      if (field.value && !trimmed) {
        message = 'Bitte fülle dieses Feld aus.';
      } else if (trimmed && trimmed.length < field.minLength) {
        message = 'Schreib bitte mindestens ' + field.minLength + ' Zeichen.';
      }
      field.setCustomValidity(message);
    });
  });
  form.addEventListener('input', clearDraft);
  form.addEventListener('change', clearDraft);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = fields.get('Name').trim();
    const request = guest ? 'Gastbewerbung' : 'Sponsoringanfrage';
    const subject = request + ' für Goldgezwitscher – ' + interest.value;
    const lines = ['Hallo Dietmar,', '', guest
      ? 'ich möchte mich als Gast für Goldgezwitscher vorstellen.'
      : 'ich interessiere mich für ein Sponsoring bei Goldgezwitscher.', ''];
    for (const [key, value] of fields) {
      if (key !== 'privacy' && value.trim()) lines.push(key + ': ' + value.trim());
    }
    lines.push('', 'Viele Grüße', name);
    const body = lines.join('\r\n');
    output.value = body;
    emailLink.href = mailDraftLink(form.dataset.email, subject, body);
    result.hidden = false;
    result.focus();
  });
  enableDraftCopy(form.querySelector('[data-copy]'), output, copyStatus);
  form.hidden = false;
}

connectOriginalNotices();
activateMenu();
markLandingSection();
activateCampaignNotice();
activateInquiry();
activateNewsletter();
