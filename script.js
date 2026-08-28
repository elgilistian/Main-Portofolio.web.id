/* =========================================================
   ELGI LISTIANI PORTFOLIO
   INTERACTION SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;
    const header = document.getElementById("siteHeader");

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("main section[id]");

    /* =====================================================
       NAVBAR
       ===================================================== */

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            navToggle.classList.toggle("open", isOpen);

            navToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");
                navToggle.classList.remove("open");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const observerOptions = {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                navLinks.forEach(link => {

                    const href = link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        href === `#${id}`
                    );

                });

            });

        },
        observerOptions
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       SMOOTH ANCHOR
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       HERO MOUSE PARALLAX
       ===================================================== */

    const heroImageArea =
        document.getElementById("heroImageArea");

    const heroSection =
        document.querySelector(".hero-new");

    if (
        heroImageArea &&
        heroSection &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        heroSection.addEventListener("mousemove", event => {

            const rect =
                heroSection.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - .5;

            const y =
                (event.clientY - rect.top) /
                rect.height - .5;

            const rotateY = x * 5;
            const rotateX = y * -5;

            heroImageArea.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });

        heroSection.addEventListener("mouseleave", () => {

            heroImageArea.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".about-heading, .about-info, .about-visual, " +
        ".bottom-item, .pro-title-wrap, .pro-header-side, " +
        ".pro-category, .pro-showcase, .projects-title, " +
        ".projects-description, .project-card, .blog-heading, " +
        ".blog-single, .contact-heading, .contact-info, " +
        ".contact-form-box"
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        if (
            element.classList.contains("pro-category") ||
            element.classList.contains("project-card") ||
            element.classList.contains("bottom-item")
        ) {
            element.style.transitionDelay =
                `${Math.min(index * .04, .3)}s`;
        }

    });

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            });

        },
        {
            threshold: .12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       SKILLS
       ===================================================== */

    const skillData = {

        frontend: {
            title: "Front End",
            number: "01",
            description:
                "Membangun tampilan website yang modern, responsif, dan interaktif.",
            skills: [
                ["HTML", "STRUCTURE"],
                ["CSS", "STYLING"],
                ["JavaScript", "INTERACTION"]
            ]
        },

        backend: {
            title: "Back End",
            number: "02",
            description:
                "Mempelajari bagaimana website bekerja dari sisi server dan database.",
            skills: [
                ["PHP", "BACK END"],
                ["MySQL", "DATABASE"],
                ["CRUD", "SYSTEM"]
            ]
        },

        programming: {
            title: "Programming",
            number: "03",
            description:
                "Mengembangkan logika pemrograman melalui project dan latihan.",
            skills: [
                ["PHP", "PROGRAMMING"],
                ["JavaScript", "LOGIC"],
                ["Python", "LEARNING"]
            ]
        },

        ui: {
            title: "UI Design",
            number: "04",
            description:
                "Membuat interface yang sederhana, terstruktur, dan nyaman digunakan.",
            skills: [
                ["Figma", "UI DESIGN"],
                ["Wireframe", "PLANNING"],
                ["Prototype", "INTERACTION"]
            ]
        },

        framework: {
            title: "Framework",
            number: "05",
            description:
                "Menggunakan framework dan library untuk mempercepat proses pengembangan.",
            skills: [
                ["Bootstrap", "CSS FRAMEWORK"],
                ["Font Awesome", "ICONS"],
                ["Responsive", "LAYOUT"]
            ]
        },

        editing: {
            title: "Editing",
            number: "06",
            description:
                "Mengembangkan kemampuan visual untuk mendukung kebutuhan project.",
            skills: [
                ["Image Editing", "VISUAL"],
                ["Video Editing", "CONTENT"],
                ["Creative", "DESIGN"]
            ]
        },

        tools: {
            title: "Tools",
            number: "07",
            description:
                "Berbagai tools yang membantu proses coding, desain, dan pengembangan project.",
            skills: [
                ["VS Code", "EDITOR"],
                ["GitHub", "VERSION CONTROL"],
                ["Figma", "DESIGN"]
            ]
        }

    };


    const skillButtons =
        document.querySelectorAll(".pro-category");

    const skillTitle =
        document.getElementById("proSkillTitle");

    const skillNumber =
        document.getElementById("proSkillNumber");

    const skillDescription =
        document.getElementById("proSkillDescription");

    const skillList =
        document.getElementById("proSkillList");

    const skillCount =
        document.getElementById("proSkillCount");


    function renderSkills(type) {

        const data = skillData[type];

        if (!data) return;

        if (skillTitle) {
            skillTitle.style.opacity = "0";
            skillTitle.style.transform = "translateY(8px)";
        }

        if (skillDescription) {
            skillDescription.style.opacity = "0";
        }

        setTimeout(() => {

            if (skillTitle) {
                skillTitle.textContent = data.title;
                skillTitle.style.opacity = "1";
                skillTitle.style.transform = "translateY(0)";
            }

            if (skillNumber) {
                skillNumber.textContent = data.number;
            }

            if (skillDescription) {
                skillDescription.textContent =
                    data.description;

                skillDescription.style.opacity = "1";
            }

            if (skillList) {

                skillList.innerHTML = "";

                data.skills.forEach((skill, index) => {

                    const item =
                        document.createElement("div");

                    item.className = "skill-item";

                    item.style.opacity = "0";
                    item.style.transform = "translateY(12px)";

                    item.innerHTML = `
                        <strong>${skill[0]}</strong>
                        <span>${skill[1]}</span>
                    `;

                    skillList.appendChild(item);

                    requestAnimationFrame(() => {

                        setTimeout(() => {

                            item.style.opacity = "1";
                            item.style.transform =
                                "translateY(0)";

                        }, index * 70);

                    });

                });

            }

            if (skillCount) {
                skillCount.textContent =
                    `${String(data.skills.length).padStart(2, "0")} SKILLS`;
            }

        }, 130);

    }


    skillButtons.forEach(button => {

        button.addEventListener("click", () => {

            skillButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const skill =
                button.dataset.skill;

            renderSkills(skill);

        });

    });

    renderSkills("frontend");


    /* =====================================================
       PROJECT SLIDER
       ===================================================== */

    const slider =
        document.getElementById("projectsSlider");

    const prevButton =
        document.getElementById("projectPrev");

    const nextButton =
        document.getElementById("projectNext");

    const currentProject =
        document.getElementById("projectCurrent");

    const progress =
        document.getElementById("projectProgress");

    const cards =
        slider ?
        slider.querySelectorAll(".project-card") :
        [];


    function getProjectStep() {

        if (!cards.length) return 0;

        const card = cards[0];

        const gap =
            parseFloat(
                getComputedStyle(slider).gap
            ) || 20;

        return card.offsetWidth + gap;

    }


    function updateProjectCounter() {

        if (!slider || !cards.length) return;

        const step = getProjectStep();

        if (!step) return;

        const index =
            Math.round(slider.scrollLeft / step);

        const current =
            Math.min(
                Math.max(index + 1, 1),
                cards.length
            );

        if (currentProject) {
            currentProject.textContent =
                String(current).padStart(2, "0");
        }

        if (progress) {

            const percentage =
                cards.length > 1
                    ? (current - 1) /
                      (cards.length - 1) * 100
                    : 100;

            progress.style.width =
                `${Math.max(20, percentage)}%`;
        }

    }


    if (prevButton && slider) {

        prevButton.addEventListener("click", () => {

            slider.scrollBy({
                left: -getProjectStep(),
                behavior: "smooth"
            });

        });

    }


    if (nextButton && slider) {

        nextButton.addEventListener("click", () => {

            slider.scrollBy({
                left: getProjectStep(),
                behavior: "smooth"
            });

        });

    }


    if (slider) {

        slider.addEventListener(
            "scroll",
            updateProjectCounter,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateProjectCounter
        );

        updateProjectCounter();

    }

    


    /* =====================================================
       DRAG TO SCROLL
       ===================================================== */

    if (slider) {

        let isDown = false;
        let startX = 0;
        let startScroll = 0;

        slider.addEventListener("mousedown", event => {

            if (
                event.target.closest("button") ||
                event.target.closest("a")
            ) {
                return;
            }

            isDown = true;

            slider.classList.add("dragging");

            startX = event.pageX;

            startScroll = slider.scrollLeft;

        });

        window.addEventListener("mouseup", () => {

            isDown = false;

            slider.classList.remove("dragging");

        });

        slider.addEventListener("mousemove", event => {

            if (!isDown) return;

            event.preventDefault();

            const distance =
                (event.pageX - startX) * 1.15;

            slider.scrollLeft =
                startScroll - distance;

        });

    }


    /* =====================================================
       PROJECT PREVIEW MODAL
       ===================================================== */

    const projectModal =
        document.getElementById("projectModal");

    const modalImage =
        document.getElementById("modalProjectImage");

    const modalTitle =
        document.getElementById("modalProjectTitle");

    const modalDescription =
        document.getElementById("modalProjectDescription");

    const modalCategory =
        document.getElementById("modalProjectCategory");

    const modalYear =
        document.getElementById("modalProjectYear");

    const modalTech1 =
        document.getElementById("modalTech1");

    const modalTech2 =
        document.getElementById("modalTech2");

    const modalTech3 =
        document.getElementById("modalTech3");

    const modalDirectLink =
        document.getElementById("modalDirectLink");


    const projectData = {

        project1: {
            image: "assets/pro1.png",
            title: 'Website "Jasa Pembuatan Website"',
            category: "WEB DEVELOPMENT",
            year: "2026",
            description:
                "Website layanan pemesanan jasa pembuatan website berbasis PHP dengan sistem backend dan database.",
            tech: ["PHP", "Bootstrap", "MySQL"],
            link: "https://vicode.ct.ws/"
        },

        project2: {
            image: "assets/pro2.png",
            title: "Website Top Up Game",
            category: "WEB DEVELOPMENT",
            year: "2026",
            description:
                "Website top up game alternatif dengan sistem pembayaran semi otomatis.",
            tech: ["PHP", "CSS", "MySQL"],
            link: "https://virgigame.gt.tc/"
        },

        project3: {
            image: "assets/pro3.png",
            title: "Website Sistem Akademik Sederhana",
            category: "WEB DEVELOPMENT",
            year: "2026",
            description:
                "Sistem akademik sederhana untuk mahasiswa dan dosen dengan fitur manajemen tugas, absensi, dan komunikasi.",
            tech: ["PHP", "CSS", "MySQL"],
            link: "https://myacademic.ct.ws/"
        },

        project4: {
            image: "assets/port-2.png",
            title: "Desain Sistem Rumah Sakit",
            category: "UI DESIGN",
            year: "2026",
            description:
                "Perancangan interface sistem rumah sakit dengan role pasien, dokter, dan admin.",
            tech: ["Figma", "UI", "Prototype"],
            link: "https://figma.com/"
        },

        project5: {
            image: "assets/pro5.png",
            title: "Landing Page Media",
            category: "LANDING PAGE",
            year: "2025",
            description:
                "Landing page responsif untuk menyimpan foto dan video sekaligus menjadi latihan membangun interface modern.",
            tech: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com/"
        }

    };


    function openProjectModal(projectId) {

        const data =
            projectData[projectId];

        if (!data || !projectModal) return;

        if (modalImage) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
        }

        if (modalTitle) {
            modalTitle.textContent = data.title;
        }

        if (modalDescription) {
            modalDescription.textContent =
                data.description;
        }

        if (modalCategory) {
            modalCategory.textContent =
                data.category;
        }

        if (modalYear) {
            modalYear.textContent =
                data.year;
        }

        const techElements = [
            modalTech1,
            modalTech2,
            modalTech3
        ];

        techElements.forEach((element, index) => {

            if (!element) return;

            if (data.tech[index]) {

                element.textContent =
                    data.tech[index];

                element.style.display = "";

            } else {

                element.style.display = "none";

            }

        });

        if (modalDirectLink) {
            modalDirectLink.href = data.link;
        }

        projectModal.classList.add("active");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add("modal-open");

    }


    function closeProjectModal() {

        if (!projectModal) return;

        projectModal.classList.remove("active");

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove("modal-open");

    }


    document.querySelectorAll(".preview-button")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                openProjectModal(
                    button.dataset.project
                );

            });

        });


    if (projectModal) {

        const close =
            projectModal.querySelector(".modal-close");

        const backdrop =
            projectModal.querySelector(".modal-backdrop");

        if (close) {
            close.addEventListener(
                "click",
                closeProjectModal
            );
        }

        if (backdrop) {
            backdrop.addEventListener(
                "click",
                closeProjectModal
            );
        }

    }


    /* =====================================================
       PROFILE DETAIL MODAL
       ===================================================== */

    const detailModal =
        document.getElementById("detailModal");

    const detailButton =
        document.getElementById("detailButton");


    function openDetailModal() {

        if (!detailModal) return;

        detailModal.classList.add("active");

        body.classList.add("modal-open");

    }


    function closeDetailModal() {

        if (!detailModal) return;

        detailModal.classList.remove("active");

        body.classList.remove("modal-open");

    }


    if (detailButton) {

        detailButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openDetailModal();

            }
        );

    }


    if (detailModal) {

        const close =
            detailModal.querySelector(".modal-close");

        if (close) {

            close.addEventListener(
                "click",
                closeDetailModal
            );

        }

        detailModal.addEventListener(
            "click",
            event => {

                if (event.target === detailModal) {
                    closeDetailModal();
                }

            }
        );

    }


    /* =====================================================
       BLOG MODAL
       ===================================================== */

    const blogModal =
        document.getElementById("blogModal");

    const blogButton =
        document.querySelector(".blog-btn");


    const blogData = {

        "1": {
            image: "assets/blog1.png",

            meta:
                "WEB DEVELOPMENT • 21 JULI 2026 • 5 MIN READ",

            title:
                "Cara Saya Mengenal Coding dan Web Developer",

            description:
                "Pengalaman saya dalam memulai dan mengenal dunia coding serta pengembangan website.",

            content: `
                <p>
                    Perjalanan saya mengenal dunia coding
                    dimulai dari rasa penasaran terhadap
                    bagaimana sebuah website dapat bekerja.
                </p>

                <p>
                    Dari sana saya mulai mempelajari HTML,
                    CSS, JavaScript, PHP, dan berbagai teknologi
                    lainnya melalui project-project kecil.
                </p>

                <p>
                    Saya menyadari bahwa kemampuan programming
                    tidak dibangun dalam satu malam. Setiap
                    error, debugging, dan project yang selesai
                    menjadi bagian dari proses belajar.
                </p>

                <p>
                    Bagi saya, coding bukan hanya tentang
                    menulis kode, tetapi juga tentang bagaimana
                    memecahkan masalah dan terus berkembang.
                </p>
            `
        }

    };


    function openBlogModal(id) {

        if (!blogModal) return;

        const data = blogData[id];

        if (!data) return;

        const image =
            document.getElementById("blogModalImage");

        const meta =
            document.getElementById("blogModalMeta");

        const title =
            document.getElementById("blogModalTitle");

        const description =
            document.getElementById("blogModalDescription");

        const text =
            document.getElementById("blogModalText");


        if (image) {
            image.src = data.image;
            image.alt = data.title;
        }

        if (meta) {
            meta.textContent = data.meta;
        }

        if (title) {
            title.textContent = data.title;
        }

        if (description) {
            description.textContent =
                data.description;
        }

        if (text) {
            text.innerHTML = data.content;
        }

        blogModal.classList.add("active");

        body.classList.add("modal-open");

    }


    function closeBlogModal() {

        if (!blogModal) return;

        blogModal.classList.remove("active");

        body.classList.remove("modal-open");

    }


    if (blogButton) {

        blogButton.addEventListener(
            "click",
            () => openBlogModal(
                blogButton.dataset.blog || "1"
            )
        );

    }


    if (blogModal) {

        const close =
            blogModal.querySelector(".blog-modal-close");

        const overlay =
            blogModal.querySelector(".blog-modal-overlay");

        if (close) {
            close.addEventListener(
                "click",
                closeBlogModal
            );
        }

        if (overlay) {
            overlay.addEventListener(
                "click",
                closeBlogModal
            );
        }

    }


    /* =====================================================
       ESC CLOSE ALL MODALS
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        closeProjectModal();
        closeDetailModal();
        closeBlogModal();

    });


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        ".contact-submit"
                    );

                const originalText =
                    submitButton
                        ? submitButton.innerHTML
                        : "";

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        "Mengirim...";

                }

                if (formStatus) {
                    formStatus.textContent =
                        "";
                }

                try {

                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",
                                body:
                                    new FormData(
                                        contactForm
                                    ),
                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );

                    if (response.ok) {

                        contactForm.reset();

                        if (formStatus) {

                            formStatus.textContent =
                                "Pesan berhasil dikirim. Terima kasih!";

                            formStatus.style.color =
                                "#21884c";

                        }

                    } else {

                        throw new Error(
                            "Request failed"
                        );

                    }

                } catch (error) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Pesan belum berhasil dikirim. Silakan coba lagi.";

                        formStatus.style.color =
                            "#c33";

                    }

                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalText;

                    }

                }

            }
        );

    }


    /* =====================================================
       PREVENT IMAGE DRAG
       ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener(
            "dragstart",
            event => event.preventDefault()
        );

    });


    /* =====================================================
       HERO PARALLAX SCROLL
       ===================================================== */

    const heroVisual =
        document.querySelector(".hero-new-visual");

    if (heroVisual) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.innerWidth < 760 ||
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    heroVisual.getBoundingClientRect();

                const viewport =
                    window.innerHeight;

                if (
                    rect.bottom < 0 ||
                    rect.top > viewport
                ) {
                    return;
                }

                const progress =
                    (viewport - rect.top) /
                    (viewport + rect.height);

                const offset =
                    (progress - .5) * 18;

                heroVisual.style.transform =
                    `translateY(${offset}px)`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       SPECIAL PAGE BUTTON
       ===================================================== */

    const specialPage =
        document.querySelector(".nav-contact");

    if (specialPage) {

        specialPage.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const target =
                    document.getElementById("project");

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateHeader();
    updateProjectCounter();

});

