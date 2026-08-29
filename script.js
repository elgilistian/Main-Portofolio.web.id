/* =========================================================
   ELGI LISTIANI — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR: scroll state + mobile toggle ---------- */
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link highlight on scroll
  const sections = [...document.querySelectorAll('main section[id]')];
  if (sections.length && navLinks.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll(
    '.about-info, .about-visual, .pro-skills-header, .pro-skills-content, .project-card, .blog-single, .contact-info, .contact-form-box, .about-bottom .bottom-item'
  );
  revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- PROFILE DETAIL MODAL ---------- */
  const detailModal = document.getElementById('detailModal');
  const detailButton = document.getElementById('detailButton');
  const detailCloseButtons = detailModal ? detailModal.querySelectorAll('.modal-close') : [];

  const openModal = (modal) => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = (modal) => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (detailButton && detailModal) {
    detailButton.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(detailModal);
    });
    detailCloseButtons.forEach(btn => btn.addEventListener('click', () => closeModal(detailModal)));
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeModal(detailModal);
    });
  }

  /* ---------- PRO SKILLS: category switch + drag-to-scroll rail ---------- */
  const skillData = {
    frontend: {
      title: 'Front End',
      number: '01',
      description: 'Membangun tampilan website yang modern, responsif, dan interaktif.',
      skills: ['HTML5', 'CSS3', 'JavaScript']
    },
    backend: {
      title: 'Back End',
      number: '02',
      description: 'Mengelola logika server, data, dan alur aplikasi di balik layar.',
      skills: ['PHP', 'MySQL', 'REST API']
    },
    programming: {
      title: 'Programming',
      number: '03',
      description: 'Dasar pemrograman untuk menyelesaikan masalah secara terstruktur.',
      skills: ['C++', 'PHP', 'JavaScript','Python']
    },
    ui: {
      title: 'UI Design',
      number: '04',
      description: 'Merancang tampilan antarmuka yang rapi, enak dilihat, dan mudah digunakan.',
      skills: ['Figma', 'Wireframing', 'Prototyping']
    },
    framework: {
      title: 'Framework',
      number: '05',
      description: 'Mempercepat pengembangan dengan struktur dan komponen siap pakai.',
      skills: ['Bootstrap', 'Tailwind CSS']
    },
    editing: {
      title: 'Editing',
      number: '06',
      description: 'Mengedit aset visual sederhana untuk kebutuhan project dan konten.',
      skills: ['Canva', 'CapCut PC','Photoshop','kinemaster','alight motion',]
    },
    tools: {
      title: 'Tools',
      number: '07',
      description: 'Perangkat sehari-hari untuk menulis, menguji, dan mengelola kode.',
      skills: ['VS Code', 'Git', 'XAMPP','Visual Studio','codeblock','GColab']
    }
  };

  const categoryButtons = document.querySelectorAll('.pro-category');
  const skillTitle = document.getElementById('proSkillTitle');
  const skillNumber = document.getElementById('proSkillNumber');
  const skillDescription = document.getElementById('proSkillDescription');
  const skillList = document.getElementById('proSkillList');
  const skillCount = document.getElementById('proSkillCount');

  const renderSkill = (key) => {
    const data = skillData[key];
    if (!data) return;
    skillTitle.textContent = data.title;
    skillNumber.textContent = data.number;
    skillDescription.textContent = data.description;
    skillCount.textContent = String(data.skills.length).padStart(2, '0') + ' SKILLS';
    skillList.innerHTML = '';
    data.skills.forEach((skill, i) => {
      const chip = document.createElement('span');
      chip.className = 'pro-skill-chip';
      chip.style.animationDelay = `${i * 0.06}s`;
      chip.innerHTML = `<i class="fa-solid fa-check"></i>${skill}`;
      skillList.appendChild(chip);
    });
  };

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkill(btn.dataset.skill);
    });
  });

  if (categoryButtons.length) renderSkill(categoryButtons[0].dataset.skill);

  // Generic drag-to-scroll (mouse + touch works natively, mouse needs JS)
  const makeDraggable = (el) => {
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let moved = false;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      moved = false;
      el.classList.add('dragging');
      startX = e.pageX;
      scrollStart = el.scrollLeft;
    });
    window.addEventListener('mouseup', () => {
      isDown = false;
      el.classList.remove('dragging');
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) moved = true;
      el.scrollLeft = scrollStart - dx;
    });
    // Prevent click-through firing after a real drag
    el.addEventListener('click', (e) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);
  };

  makeDraggable(document.querySelector('.pro-category-nav'));

  /* ---------- PROJECT SLIDER: drag + arrows + autoplay ---------- */
  const slider = document.getElementById('projectsSlider');
  const prevBtn = document.getElementById('projectPrev');
  const nextBtn = document.getElementById('projectNext');
  const counterCurrent = document.getElementById('projectCurrent');
  const progressBar = document.getElementById('projectProgress');

  if (slider) {
    const cards = slider.querySelectorAll('.project-card');
    const total = cards.length;

    const cardStep = () => {
      const card = cards[0];
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.columnGap || style.gap || 24);
      return card.getBoundingClientRect().width + gap;
    };

    const updateCounter = () => {
      const step = cardStep();
      const index = Math.round(slider.scrollLeft / step);
      const clamped = Math.min(Math.max(index, 0), total - 1);
      if (counterCurrent) counterCurrent.textContent = String(clamped + 1).padStart(2, '0');
      if (progressBar) progressBar.style.width = `${((clamped + 1) / total) * 100}%`;
      return clamped;
    };

    const scrollToIndex = (index) => {
      const clamped = (index + total) % total;
      slider.scrollTo({ left: clamped * cardStep(), behavior: 'smooth' });
    };

    let currentIndex = 0;

    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentIndex = updateCounter();
      scrollToIndex(currentIndex + 1);
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentIndex = updateCounter();
      scrollToIndex(currentIndex - 1);
    });

    slider.addEventListener('scroll', () => {
      updateCounter();
    }, { passive: true });

    // Drag to scroll (mouse)
    let isDown = false, startX = 0, scrollStart = 0, moved = false;
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      moved = false;
      slider.classList.add('dragging');
      startX = e.pageX;
      scrollStart = slider.scrollLeft;
      pauseAutoplay();
    });
    window.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('dragging');
      resumeAutoplay();
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) moved = true;
      slider.scrollLeft = scrollStart - dx;
    });
    slider.addEventListener('click', (e) => {
      if (moved) { e.stopPropagation(); e.preventDefault(); }
    }, true);

    // Pause autoplay on touch interaction too
    slider.addEventListener('touchstart', pauseAutoplay, { passive: true });
    slider.addEventListener('touchend', () => setTimeout(resumeAutoplay, 2000), { passive: true });

    // Autoplay: project geser sendiri
    let autoplayTimer = null;
    function startAutoplay() {
      autoplayTimer = setInterval(() => {
        const idx = updateCounter();
        const next = idx + 1 >= total ? 0 : idx + 1;
        if (next === 0) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollToIndex(next);
        }
      }, 3800);
    }
    function pauseAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    function resumeAutoplay() {
      pauseAutoplay();
      startAutoplay();
    }

    slider.addEventListener('mouseenter', pauseAutoplay);
    slider.addEventListener('mouseleave', resumeAutoplay);

    updateCounter();
    startAutoplay();

    window.addEventListener('resize', () => updateCounter());
  }

  /* ---------- PROJECT PREVIEW MODAL ---------- */
  const projectModal = document.getElementById('projectModal');
  const previewButtons = document.querySelectorAll('.preview-button');
  const projectModalCloseButtons = projectModal ? projectModal.querySelectorAll('.modal-close') : [];

  const projectDetails = {
    project1: {
      image: 'assets/pro1.png',
      category: 'WEB DEVELOPMENT',
      year: '2026',
      title: 'Website "Jasa Pembuatan Website"',
      description: 'Ini Adalah Project website untuk membuat layanan pemasanan website berbasis PHP sebagai backend.',
      tech: ['PHP', 'Bootstrap', 'MySQL'],
      link: 'https://vicode.ct.ws/'
    },
    project2: {
      image: 'assets/pro2.png',
      category: 'WEB DEVELOPMENT',
      year: '2026',
      title: 'Website Top Up Game',
      description: 'Website top up game dengan alternatif payment gateway menggunakan pembayaran mandiri semi otomatis.',
      tech: ['PHP', 'CSS', 'MySQL'],
      link: 'https://virgigame.gt.tc/'
    },
    project3: {
      image: 'assets/pro3.png',
      category: 'WEB DEVELOPMENT',
      year: '2026',
      title: 'Website Sistem Akademik Sederhana',
      description: 'Layanan akademik bagi mahasiswa dan dosen dengan fitur sederhana seperti manajemen tugas, absen, dan chat dosen.',
      tech: ['PHP', 'CSS', 'MySQL'],
      link: 'https://myacademic.ct.ws/'
    },
    project4: {
      image: 'assets/port-2.png',
      category: 'UI DESIGN',
      year: '2026',
      title: 'Desain Sistem Rumah Sakit',
      description: 'Merancang desain sistem rumah sakit dengan 3 role: pasien, admin, dan dokter, untuk menyelesaikan mata kuliah Analisis Desain Perangkat Lunak.',
      tech: ['Figma'],
      link: 'https://figma.com'
    },
    project5: {
      image: 'assets/pro5.png',
      category: 'LANDING PAGE',
      year: '2025',
      title: 'Landing Page untuk Menyimpan Media',
      description: 'Landing page untuk menyimpan foto dan video sebagai percobaan membangun website yang responsif dan modern.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com'
    }
  };

  const modalImage = document.getElementById('modalProjectImage');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalYear = document.getElementById('modalProjectYear');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDescription = document.getElementById('modalProjectDescription');
  const modalTech1 = document.getElementById('modalTech1');
  const modalTech2 = document.getElementById('modalTech2');
  const modalTech3 = document.getElementById('modalTech3');
  const modalDirectLink = document.getElementById('modalDirectLink');

  previewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const data = projectDetails[btn.dataset.project];
      if (!data || !projectModal) return;

      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalCategory.textContent = data.category;
      modalYear.textContent = data.year;
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;

      const techEls = [modalTech1, modalTech2, modalTech3];
      techEls.forEach((el, i) => {
        if (!el) return;
        if (data.tech[i]) {
          el.textContent = data.tech[i];
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });

      modalDirectLink.href = data.link;
      openModal(projectModal);
    });
  });

  projectModalCloseButtons.forEach(btn => btn.addEventListener('click', () => closeModal(projectModal)));
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal || e.target.classList.contains('modal-backdrop')) closeModal(projectModal);
    });
  }

  /* ---------- BLOG MODAL ---------- */
  const blogModals = document.querySelectorAll('.blog-modal');
  const blogModal = blogModals[0]; // first one is the functional one
  const blogButtons = document.querySelectorAll('.blog-btn');

  const blogDetails = {
    1: {
      image: 'assets/blog1.png',
      meta: 'WEB DEVELOPMENT • 21 Juli 2026 • 5 MIN READ',
      title: 'Cara Saya Mengenal Coding dan Web Developer',
      description: 'Pengalaman saya dalam memulai dan mengenal dunia coding dan pengembangan website.',
      text: `Awalnya saya penasaran dengan bagaimana sebuah website bisa dibuat, mulai dari tampilan sampai fungsinya. Dari rasa penasaran itu saya mulai belajar HTML dan CSS secara otodidak lewat video dan dokumentasi.

Semakin lama, saya mulai tertarik membuat website yang punya fungsi nyata, bukan sekadar tampilan statis. Di sinilah saya mulai belajar PHP dan database untuk membangun sistem sederhana seperti layanan pemesanan dan top up.

Proses belajar ini tidak instan, banyak error dan percobaan berulang. Tapi dari situ saya belajar bahwa coding bukan soal seberapa cepat selesai, tapi seberapa konsisten mau belajar dari kesalahan.`
    }
  };

  const blogModalImage = document.getElementById('blogModalImage');
  const blogModalMeta = document.getElementById('blogModalMeta');
  const blogModalTitle = document.getElementById('blogModalTitle');
  const blogModalDescription = document.getElementById('blogModalDescription');
  const blogModalText = document.getElementById('blogModalText');

  blogButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const data = blogDetails[btn.dataset.blog];
      if (!data || !blogModal) return;

      blogModalImage.src = data.image;
      blogModalImage.alt = data.title;
      blogModalMeta.textContent = data.meta;
      blogModalTitle.textContent = data.title;
      blogModalDescription.textContent = data.description;
      blogModalText.innerHTML = data.text
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('');

      openModal(blogModal);
    });
  });

  blogModals.forEach(modal => {
    modal.querySelectorAll('.blog-modal-close').forEach(btn => btn.addEventListener('click', () => closeModal(modal)));
    modal.querySelector('.blog-modal-overlay')?.addEventListener('click', () => closeModal(modal));
  });

  /* ---------- ESC closes any open modal ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [detailModal, projectModal, blogModal].forEach(m => {
        if (m && m.classList.contains('open')) closeModal(m);
      });
    }
  });

  /* ---------- CONTACT FORM: basic status feedback ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', () => {
      formStatus.textContent = 'Mengirim pesan...';
      formStatus.style.color = 'var(--muted)';
    });
  }

});
