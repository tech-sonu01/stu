/**
 * load.js - FINAL FIXED VERSION with Active Sidebar
 */

document.addEventListener("DOMContentLoaded", function () {

  const components = {
    "navbar": "navbar/navbar.html",
    "sidebar": "sidebar.php",      // ← Must be .php
    "footer": "footer/footer.html"
    // add other components here if you have more
  };

  function fetchText(url) {
    return fetch(url).then(resp => {
      if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status}`);
      return resp.text();
    });
  }

  function injectAndExec(targetId, html) {
    const container = document.getElementById(targetId);
    if (!container) return;

    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const scripts = Array.from(tmp.querySelectorAll('script'));
    scripts.forEach(s => s.parentNode && s.parentNode.removeChild(s));

    container.innerHTML = tmp.innerHTML;

    // Run any inline scripts
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      for (let i = 0; i < script.attributes.length; i++) {
        newScript.setAttribute(script.attributes[i].name, script.attributes[i].value);
      }
      if (script.src) {
        newScript.src = script.src;
        document.body.appendChild(newScript);
      } else {
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
      }
    });
  }

  // Load ALL components and wait for them to finish
  const loadPromises = Object.entries(components).map(([id, file]) =>
    fetchText(file)
      .then(html => injectAndExec(id, html))
      .catch(err => {
        console.error("Load error for", file, err);
        const el = document.getElementById(id);
        if (el) el.innerHTML = `<!-- Failed to load ${file} -->`;
      })
  );

  // After everything is loaded → highlight active link
  Promise.all(loadPromises).then(() => {
    setTimeout(highlightActiveNav, 200);
  });

  // ==================== ACTIVE NAV FUNCTION ====================
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();

  console.log("Current Page:", currentPage);

  // 1. Reset all active
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(el => {
    el.classList.remove('active');
  });

  // 2. Check all links (including dropdown items)
  const allLinks = document.querySelectorAll('.nav-link, .dropdown-item');

  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === "#") return;

    const linkPage = href.split('/').pop();

    if (linkPage === currentPage) {

      // ✅ Child active
      link.classList.add('active');

      // ✅ Parent dropdown active
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        const parentLink = dropdown.querySelector('.nav-link');
        if (parentLink) {
          parentLink.classList.add('active');
        }
      }
    }
  });
}
  // ============================================================

  // Scroll reveal (unchanged)
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }
  setTimeout(initScrollReveal, 300);
  window.addEventListener('load', () => setTimeout(initScrollReveal, 500));
});