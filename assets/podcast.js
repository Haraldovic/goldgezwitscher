'use strict';

// Set these only when Dietmar releases the corresponding media.
// Use a local audio file (for example assets/titelsong.mp3) and the actual episode URL.
const release = {
  themeSong: null,
  episodeUrl: null,
  endOfPremiereDay: '2026-12-02T00:00:00+01:00'
};

function connectOriginalNotices() {
  if (!document.body.matches('.page-agb, .page-impressum, .page-datenschutz')) return;
  const nav = document.getElementById('hauptmenue');
  const podcast = nav.querySelector('a[href="format.html"]');
  podcast.href = 'index.html#format';
  podcast.textContent = 'Über mich';
  podcast.insertAdjacentHTML('afterend', '<a href="index.html#startpost">Newsletter</a>');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#121315');
  const campaign = nav.querySelector('a[href="dietmar.html"]');
  campaign.href = 'index.html#crowdfunding';
  campaign.textContent = 'Crowdfunding';
  const partners = nav.querySelector('a[href="sponsoren.html"]');
  partners.href = 'index.html#sponsoring';
  partners.textContent = 'Sponsoring';
  partners.insertAdjacentHTML('afterend', '<a href="index.html#faq">FAQ</a>');
  nav.querySelector('.nav-guest').href = 'index.html#gast-werden';
  const footer = document.querySelector('.site-footer');
  const footerNav = footer.querySelector('nav[aria-label="Mitmachen"]');
  footerNav.querySelector('a[href="mitmachen.html"]').href = 'index.html#crowdfunding';
  footerNav.querySelector('a[href="sponsoren.html"]').href = 'index.html#sponsoring';
  footerNav.insertAdjacentHTML('beforeend', '<a href="index.html#startpost">Newsletter</a><a href="index.html#faq">Häufige Fragen</a>');
  footer.querySelector('.brand + p').textContent = 'Mein Videopodcast aus Karlsruhe. Dietmar Vogelmann.';
  footer.querySelector('.footer-family span').textContent = 'Meine Arbeit mit Gold und Schmuck';
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
    player.querySelector('audio').src = release.themeSong;
    player.hidden = false;
  }
  const pastPremiere = Date.now() >= Date.parse(release.endOfPremiereDay);
  if (!release.episodeUrl && !pastPremiere) return;

  const published = Boolean(release.episodeUrl);
  document.querySelectorAll('[data-premiere-action]').forEach(link => {
    if (!published) {
      link.hidden = true;
      return;
    }
    link.removeAttribute('download');
    link.href = release.episodeUrl;
    link.textContent = 'Meine erste Folge ansehen';
    link.rel = 'external noreferrer';
  });
  document.querySelectorAll('[data-premiere-status]').forEach(status => {
    status.textContent = published ? 'Meine erste Folge ist online.' : 'Ich bereite meine erste Folge vor.';
  });
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
    const request = guest ? 'Gastbewerbung' : 'Partneranfrage';
    const subject = request + ' für Goldgezwitscher – ' + interest.value;
    const lines = ['Hallo Dietmar,', '', guest
      ? 'ich möchte mich als Gast für Goldgezwitscher vorstellen.'
      : 'ich interessiere mich für eine Partnerschaft mit Goldgezwitscher.', ''];
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
showRelease();
activateInquiry();
activateNewsletter();
