// Admin broadcast banner — fetches admin_message.json on each page load.
// Shows a dismissible banner when a new message id is posted.
// Acknowledged id stored in localStorage under 'app_msg_seen'.
(function () {
  'use strict';

  const SEEN_KEY = 'app_msg_seen';

  fetch('/brand/admin_message.json', { cache: 'no-cache' })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (msg) {
      if (!msg || !msg.active || !msg.id) return;
      if (localStorage.getItem(SEEN_KEY) === msg.id) return;
      showBanner(msg);
    })
    .catch(function () { /* offline or missing file — silently ignore */ });

  function showBanner(msg) {
    var type = ['info', 'warning', 'critical'].indexOf(msg.type) !== -1 ? msg.type : 'info';

    var linkHTML = '';
    if (msg.link && typeof msg.link.url === 'string' && msg.link.url.indexOf('https://') === 0) {
      linkHTML = ' <a href="' + escAttr(msg.link.url) + '" target="_blank" rel="noopener noreferrer">'
               + escText(msg.link.text || 'Learn more') + '</a>';
    }

    var banner = document.createElement('div');
    banner.className = 'admin-banner admin-banner--' + type;
    banner.setAttribute('role', 'status');
    banner.innerHTML =
      '<span class="admin-banner__content">'
      + (msg.title ? '<strong>' + escText(msg.title) + '</strong> ' : '')
      + escText(msg.body)
      + linkHTML
      + '</span>'
      + '<button class="admin-banner__dismiss" aria-label="Dismiss message">Got it &times;</button>';

    var header = document.querySelector('header.header') || document.querySelector('header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(banner, header.nextSibling);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }

    banner.querySelector('.admin-banner__dismiss').addEventListener('click', function () {
      localStorage.setItem(SEEN_KEY, msg.id);
      banner.classList.add('admin-banner--dismissed');
      setTimeout(function () { banner.remove(); }, 350);
    });
  }

  function escText(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escAttr(str) {
    return escText(str).replace(/"/g, '&quot;');
  }
}());
