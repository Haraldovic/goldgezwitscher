'use strict';

// Set these only when Dietmar releases the corresponding media.
// Use a local audio file (for example assets/titelsong.mp3) and the actual episode URL.
const release = {
  themeSong: null,
  episodeUrl: null,
  endOfPremiereDay: '2026-12-02T00:00:00+01:00'
};

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

function showRelease() {
  const player = document.querySelector('[data-theme-player]');
  if (player && release.themeSong) {
    player.querySelector('audio').src = release.themeSong;
    player.hidden = false;
  }
  const pastPremiere = Date.now() >= Date.parse(release.endOfPremiereDay);
  if (!release.episodeUrl && !pastPremiere) return;

  const published = Boolean(release.episodeUrl);
  const actionUrl = release.episodeUrl || 'mitmachen.html';
  const actionText = published ? 'Erste Folge ansehen' : 'Zum Startnext-Projekt';
  document.querySelectorAll('[data-premiere-action]').forEach(link => {
    link.removeAttribute('download');
    link.href = actionUrl;
    link.textContent = actionText;
    if (published) link.rel = 'external noreferrer';
  });
  document.querySelectorAll('[data-premiere-status]').forEach(status => {
    status.textContent = published ? 'Die erste Folge ist erschienen.' : 'Die erste Folge ist in Vorbereitung.';
  });
  const episodeInfo = document.querySelector('[data-episode-info]');
  if (episodeInfo && published) {
    const link = document.createElement('a');
    link.href = release.episodeUrl;
    link.rel = 'external noreferrer';
    link.textContent = 'Erste Folge auf YouTube ansehen';
    episodeInfo.replaceChildren(link);
  }
}

function activateRecord() {
  const scene = document.querySelector('[data-record]');
  if (!scene) return;
  const record = scene.querySelector('.record-object');
  const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

  function reset() {
    record.style.removeProperty('--yaw');
    record.style.removeProperty('--pitch');
  }
  function tilt(event) {
    if (!motion.matches || event.pointerType === 'touch') return;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    record.style.setProperty('--yaw', (x * 6).toFixed(2) + 'deg');
    record.style.setProperty('--pitch', (-y * 4).toFixed(2) + 'deg');
  }
  scene.addEventListener('pointermove', tilt, { passive: true });
  scene.addEventListener('pointerleave', reset);
  scene.addEventListener('pointercancel', reset);
  motion.addEventListener('change', reset);
}

function activateTopics() {
  const topics = document.querySelector('[data-topics]');
  if (!topics) return;
  const sections = Array.from(topics.querySelectorAll('[data-topic]'));
  const photo = topics.querySelector('.topic-photo img');
  const caption = topics.querySelector('.topic-photo [data-caption]');
  const credit = topics.querySelector('.topic-photo [data-credit]');

  function updatePhoto() {
    const selected = sections.find(item => item.open) || sections[0];
    photo.src = selected.dataset.image;
    photo.alt = selected.dataset.alt;
    caption.textContent = selected.dataset.caption;
    credit.textContent = selected.dataset.credit;
  }
  sections.forEach(section => section.addEventListener('toggle', updatePhoto));
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
    copyStatus.textContent = '';
  }
  document.querySelectorAll('[data-package]').forEach(link => {
    link.addEventListener('click', () => {
      interest.value = link.dataset.package;
      clearDraft();
    });
  });
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
    emailLink.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    result.hidden = false;
    result.focus();
  });
  form.querySelector('[data-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      copyStatus.textContent = 'Nachricht kopiert.';
    } catch {
      output.focus();
      output.select();
      copyStatus.textContent = 'Der Text ist markiert. Kopiere ihn und füge ihn in eine E-Mail ein.';
    }
  });
  form.hidden = false;
}

activateMenu();
showRelease();
activateRecord();
activateTopics();
activateInquiry();
