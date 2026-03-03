/* ==========================================
   PORTFOLIO — Dynamic Renderer & Interactivity
   Reads everything from config.js → CONFIG
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Load saved config from admin panel (localStorage), fall back to config.js defaults
  const saved = localStorage.getItem("portfolioConfig");
  const C = saved ? JSON.parse(saved) : CONFIG;

  // Merge any new default keys that don't exist in saved config (e.g. orah added later)
  for (const key in CONFIG) {
    if (!(key in C)) {
      C[key] = CONFIG[key];
    }
  }

  // ══════════════════════════════════════════
  //  THEME — Apply custom colors from config
  // ══════════════════════════════════════════
  function applyTheme() {
    const t = C.theme;
    const root = document.documentElement.style;
    root.setProperty("--clr-accent", t.accentColor);
    root.setProperty("--clr-accent-light", t.accentLight);
    root.setProperty("--clr-gradient-start", t.gradientStart);
    root.setProperty("--clr-gradient-end", t.gradientEnd);
    root.setProperty("--clr-bg", t.bgColor);
    root.setProperty("--clr-surface", t.surfaceColor);
    root.setProperty("--clr-text", t.textColor);
    root.setProperty("--clr-text-secondary", t.textSecondary);
    root.setProperty("--clr-dark", t.darkBg);
    root.setProperty("--clr-accent-glow", hexToRgba(t.accentColor, 0.15));
    root.setProperty("--shadow-accent", `0 8px 30px ${hexToRgba(t.accentColor, 0.25)}`);

    // Badge colors
    const badges = [
      document.getElementById("badgeDev"),
      document.getElementById("badgeVideo"),
      document.getElementById("badgeDesign"),
    ];
    t.badgeColors.forEach((color, i) => {
      if (badges[i]) {
        badges[i].style.background = `linear-gradient(135deg, ${color.start}, ${color.end})`;
      }
    });
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // ══════════════════════════════════════════
  //  RENDER — Build all sections from config
  // ══════════════════════════════════════════

  function renderLogo(el) {
    if (!el) return;
    el.innerHTML = `<span class="logo-accent">${C.personal.logoFirstLetter}</span>${C.personal.logoRest}<span class="logo-dot">.</span>`;
  }

  function renderPage() {
    // Page title
    document.title = `${C.personal.firstName} ${C.personal.lastName} — ${C.personal.tagline}`;

    // Logos
    renderLogo(document.getElementById("navLogo"));
    renderLogo(document.getElementById("footerLogo"));

    // ── Hero ──
    document.getElementById("heroTagline").textContent = C.personal.tagline;

    const titleLines = C.personal.heroHeadline.map((l) => l).join("<br />");
    document.getElementById("heroTitle").innerHTML =
      `${titleLines}<br /><span class="hero-accent">${C.personal.heroAccentWord}</span>`;

    document.getElementById("heroDescription").textContent = C.personal.heroDescription;

    // Hero image
    const wrapper = document.getElementById("heroImageWrapper");
    if (C.personal.profileImage) {
      // Remove bg div, add real image
      wrapper.innerHTML = `<img src="${C.personal.profileImage}" alt="${C.personal.firstName} ${C.personal.lastName}" />`;
    } else {
      wrapper.innerHTML = `
        <div class="hero-image-bg"></div>
        <div class="hero-profile-placeholder">
          <i class="fas fa-user"></i>
          <span>Add your photo in config.js</span>
        </div>`;
    }

    // Social links (hero + footer)
    renderSocials("heroSocial", false);
    renderSocials("footerSocial", true);

    // ── About ──
    const aboutContent = document.getElementById("aboutTextContent");
    aboutContent.innerHTML =
      `<p class="about-lead">${C.about.leadText}</p>` +
      C.about.paragraphs.map((p) => `<p>${p}</p>`).join("");

    // Stats
    const statsEl = document.getElementById("aboutStats");
    statsEl.innerHTML = C.about.stats
      .map(
        (s) => `
        <div class="stat">
          <span class="stat-number" data-count="${s.number}">0</span><span class="stat-suffix">${s.suffix}</span>
          <span class="stat-label">${s.label}</span>
        </div>`
      )
      .join("");

    // CV button
    const cvBtn = document.getElementById("downloadCV");
    if (C.personal.cvFile) {
      cvBtn.href = C.personal.cvFile;
      cvBtn.setAttribute("download", "");
      cvBtn.style.display = "";
    }

    // Education
    const eduCard = document.getElementById("educationCard");
    eduCard.innerHTML = `
      <div class="edu-icon"><i class="fas fa-graduation-cap"></i></div>
      <h3>Education</h3>
      <h4>${C.education.degree}</h4>
      <p>${C.education.institution}</p>
      <span class="edu-date">${C.education.graduationDate}</span>`;

    // ── Timeline ──
    const timelineEl = document.getElementById("timeline");
    timelineEl.innerHTML = C.experience
      .map(
        (exp, i) => `
        <div class="timeline-item" data-animate="${i % 2 === 0 ? "fade-right" : "fade-left"}">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <span class="timeline-date">${exp.date}</span>
            <h4>${exp.role}</h4>
            <p class="timeline-company">${exp.company}</p>
          </div>
        </div>`
      )
      .join("");

    // ── Services ──
    const servicesGrid = document.getElementById("servicesGrid");
    servicesGrid.innerHTML = C.services
      .map(
        (svc, i) => `
        <div class="service-card${svc.featured ? " featured" : ""}" data-animate="fade-up" data-delay="${i * 100}">
          <div class="service-icon"><i class="${svc.icon}"></i></div>
          <h3>${svc.title}</h3>
          <p>${svc.description}</p>
          <ul class="service-list">
            ${svc.features.map((f) => `<li>${f}</li>`).join("")}
          </ul>
        </div>`
      )
      .join("");

    // ── Orah — My Business ──
    renderOrah();

    // ── Portfolio Filters ──
    const filtersEl = document.getElementById("portfolioFilters");
    filtersEl.innerHTML = C.portfolioFilters
      .map(
        (f, i) =>
          `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${f.key}">${f.label}</button>`
      )
      .join("");

    // ── Portfolio Cards ──
    const portfolioGrid = document.getElementById("portfolioGrid");
    portfolioGrid.innerHTML = C.projects
      .map(
        (proj, i) => `
        <div class="portfolio-card" data-category="${proj.category}" data-animate="fade-up" data-delay="${i * 100}">
          <div class="portfolio-image">
            ${
              proj.image
                ? `<img src="${proj.image}" alt="${proj.title}" />`
                : `<div class="portfolio-placeholder"><i class="${proj.icon}"></i></div>`
            }
            <div class="portfolio-overlay">
              ${proj.links.map((l) => `<a href="${l.url}" target="_blank" class="portfolio-link"><i class="${l.icon}"></i></a>`).join("")}
            </div>
          </div>
          <div class="portfolio-info">
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="portfolio-tags">
              ${proj.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
            </div>
          </div>
        </div>`
      )
      .join("");

    // ── Skills ──
    const skillsGrid = document.getElementById("skillsGrid");
    skillsGrid.innerHTML = C.skillCategories
      .map(
        (cat, i) => `
        <div class="skills-category" data-animate="fade-up" data-delay="${i * 100}">
          <h3><i class="${cat.icon}"></i> ${cat.title}</h3>
          ${
            cat.type === "bar"
              ? `<div class="skill-items">
                  ${cat.skills
                    .map(
                      (s) => `
                    <div class="skill-item">
                      <div class="skill-info">
                        <span>${s.name}</span>
                        <span>${s.level}%</span>
                      </div>
                      <div class="skill-bar"><div class="skill-progress" data-width="${s.level}"></div></div>
                    </div>`
                    )
                    .join("")}
                </div>`
              : `<div class="soft-skills-tags">
                  ${cat.skills.map((s) => `<span class="soft-tag">${s}</span>`).join("")}
                </div>`
          }
        </div>`
      )
      .join("");

    // ── Contact ──
    document.getElementById("contactLead").textContent = C.contact.heading;

    const contactMethods = document.getElementById("contactMethods");
    contactMethods.innerHTML = C.contact.methods
      .map(
        (m) => `
        <a href="${m.url}" ${m.url.startsWith("http") ? 'target="_blank"' : ""} class="contact-method">
          <div class="contact-icon"><i class="${m.icon}"></i></div>
          <div>
            <span class="contact-method-label">${m.label}</span>
            <span class="contact-method-value">${m.value}</span>
          </div>
        </a>`
      )
      .join("");

    // Contact form services dropdown
    const subjectSelect = document.getElementById("formSubject");
    subjectSelect.innerHTML =
      `<option value="" disabled selected>Select Service</option>` +
      C.contact.formServices
        .map((s) => `<option value="${s.toLowerCase().replace(/\s+/g, "-")}">${s}</option>`)
        .join("");

    // ── Footer ──
    document.getElementById("footerDescription").textContent = C.footer.description;
    document.getElementById("footerCopyright").textContent = C.footer.copyright;
  }

  function renderSocials(elementId, isFooter) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = C.socials
      .map(
        (s) => `<a href="${s.url}" ${s.url.startsWith("http") ? 'target="_blank"' : ""} aria-label="${s.platform}"><i class="${s.icon}"></i></a>`
      )
      .join("");
  }

  // ── Orah Business Section ──
  function renderOrah() {
    const section = document.getElementById("orah");
    const navOrah = document.querySelector('a.nav-link[href="#orah"]');
    const footerOrah = document.getElementById("footerOrahLink");

    if (!C.orah || !C.orah.enabled) {
      if (section) section.style.display = "none";
      if (navOrah) navOrah.parentElement.style.display = "none";
      if (footerOrah) footerOrah.style.display = "none";
      return;
    }

    // Show section & nav
    section.style.display = "";
    if (navOrah) navOrah.parentElement.style.display = "";
    if (footerOrah) footerOrah.style.display = "";

    // Title
    document.getElementById("orahTitle").innerHTML = `Meet<br /><span class="accent">${C.orah.name}.</span>`;

    // Logo
    const logoEl = document.getElementById("orahLogo");
    if (C.orah.logo) {
      logoEl.innerHTML = `<img src="${C.orah.logo}" alt="${C.orah.name}" />`;
    } else {
      logoEl.innerHTML = `<span class="orah-logo-text">${C.orah.name}</span>`;
    }

    // Tagline, description, vision
    document.getElementById("orahTagline").textContent = C.orah.tagline;
    document.getElementById("orahDescription").textContent = C.orah.description;
    document.getElementById("orahVision").textContent = C.orah.vision;

    // Offerings grid
    const grid = document.getElementById("orahOfferings");
    grid.innerHTML = (C.orah.offerings || []).map((o, i) => `
      <div class="orah-offering-card" data-animate="fade-up" data-delay="${i * 100}">
        <div class="offering-icon"><i class="${o.icon}"></i></div>
        <h4>${o.title}</h4>
        <p>${o.description}</p>
      </div>`).join("");

    // CTA button
    const ctaBtn = document.getElementById("orahCTA");
    if (C.orah.cta) {
      ctaBtn.textContent = C.orah.cta.text;
      ctaBtn.href = C.orah.cta.url || "#contact";
    }

    // Website link
    const webBtn = document.getElementById("orahWebsite");
    if (C.orah.website) {
      webBtn.href = C.orah.website;
      webBtn.style.display = "";
    } else {
      webBtn.style.display = "none";
    }
  }

  // ══════════════════════════════════════════
  //  INTERACTIVITY
  // ══════════════════════════════════════════

  // ── Navbar Scroll ──
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ── Mobile Navigation ──
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  // Close on link click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // ── Active Nav Link on Scroll ──
  function updateActiveLink() {
    const scrollY = window.pageYOffset + 120;
    document.querySelectorAll("section[id]").forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
        });
      }
    });
  }
  window.addEventListener("scroll", updateActiveLink);

  // ── Scroll Animations (Intersection Observer) ──
  function initAnimations() {
    const animated = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-delay") || 0;
            setTimeout(() => entry.target.classList.add("animated"), parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );
    animated.forEach((el) => observer.observe(el));
  }

  // ── Counter Animation ──
  function initCounters() {
    const statsSection = document.querySelector(".about-stats");
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".stat-number").forEach((counter) => {
              const target = parseInt(counter.getAttribute("data-count"));
              const duration = 2000;
              const step = target / (duration / 16);
              let current = 0;
              const update = () => {
                current += step;
                if (current < target) {
                  counter.textContent = Math.ceil(current);
                  requestAnimationFrame(update);
                } else {
                  counter.textContent = target;
                }
              };
              update();
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(statsSection);
  }

  // ── Skill Bar Animation ──
  function initSkillBars() {
    const skillsSection = document.querySelector(".skills");
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".skill-progress").forEach((bar) => {
              setTimeout(() => {
                bar.style.width = bar.getAttribute("data-width") + "%";
              }, 300);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(skillsSection);
  }

  // ── Portfolio Filter ──
  function initFilters() {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("filter-btn")) return;

      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.getAttribute("data-filter");
      document.querySelectorAll(".portfolio-card").forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.classList.remove("hidden");
          card.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  }

  // ── Contact Form ──
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById("formName").value,
        email: document.getElementById("formEmail").value,
        subject: document.getElementById("formSubject").value,
        message: document.getElementById("formMessage").value,
        timestamp: new Date().toISOString(),
        read: false,
      };

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // 1) Save to localStorage so admin panel can read it
      const messages = JSON.parse(localStorage.getItem("portfolioMessages") || "[]");
      messages.unshift(data);
      localStorage.setItem("portfolioMessages", JSON.stringify(messages));

      // 2) Try EmailJS if configured (keys set in admin panel)
      const emailCfg = JSON.parse(localStorage.getItem("portfolioEmailJS") || "{}");
      const emailPromise = (emailCfg.serviceId && emailCfg.templateId && emailCfg.publicKey && window.emailjs)
        ? emailjs.send(emailCfg.serviceId, emailCfg.templateId, {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
          }, emailCfg.publicKey)
        : Promise.resolve("local-only");

      emailPromise
        .then(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
        })
        .catch((err) => {
          console.warn("EmailJS send failed (message still saved locally):", err);
          btn.innerHTML = '<i class="fas fa-check"></i> Message Received!';
          btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
        })
        .finally(() => {
          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = "";
            btn.disabled = false;
            form.reset();
          }, 3000);
        });
    });
  }

  // ── Parallax ──
  function initParallax() {
    const heroBg = document.querySelector(".hero-bg-gradient");
    const heroImg = document.querySelector(".hero-image-wrapper");

    window.addEventListener("scroll", () => {
      const scrollY = window.pageYOffset;
      const heroH = document.querySelector(".hero").offsetHeight;
      if (scrollY < heroH) {
        if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        if (heroImg) heroImg.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    });
  }

  // ── Hero accent animation ──
  function initHeroAnimation() {
    const accent = document.querySelector(".hero-accent");
    if (!accent) return;
    accent.style.opacity = "0";
    accent.style.transform = "translateY(20px)";
    setTimeout(() => {
      accent.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      accent.style.opacity = "1";
      accent.style.transform = "translateY(0)";
    }, 600);
  }

  // ══════════════════════════════════════════
  //  BOOT
  // ══════════════════════════════════════════
  applyTheme();
  renderPage();
  initAnimations();
  initCounters();
  initSkillBars();
  initFilters();
  initContactForm();
  initParallax();
  initHeroAnimation();
});

// Inject fadeInUp keyframe
const _s = document.createElement("style");
_s.textContent = `@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(_s);
