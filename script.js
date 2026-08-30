/* =========================================================
   ELGI PORTFOLIO
   CLEAN INTERACTION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";


    /* =====================================================
       HELPER
    ===================================================== */

    const $ = (selector, parent = document) => {
        return parent.querySelector(selector);
    };

    const $$ = (selector, parent = document) => {
        return Array.from(
            parent.querySelectorAll(selector)
        );
    };


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.addEventListener("load", function () {
        document.body.classList.add("page-ready");
    });


    /* =====================================================
       NAVBAR
    ===================================================== */

    const siteHeader = $("#siteHeader");
    const navToggle = $("#navToggle");
    const navMenu = $("#navMenu");

    function closeNav() {
        if (!navMenu || !navToggle) return;

        navMenu.classList.remove("active");
        navToggle.classList.remove("is-open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (navToggle) {
        navToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    navMenu.classList.contains(
                        "active"
                    );

                navMenu.classList.toggle(
                    "active",
                    !isOpen
                );

                navToggle.classList.toggle(
                    "is-open",
                    !isOpen
                );

                navToggle.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );
            }
        );
    }

    $$(".nav-link").forEach(function (link) {
        link.addEventListener(
            "click",
            closeNav
        );
    });

    document.addEventListener(
        "click",
        function (event) {

            if (!navMenu || !navToggle) {
                return;
            }

            if (
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)
            ) {
                closeNav();
            }
        }
    );


    /* Header scroll */

    function headerScroll() {
        if (!siteHeader) return;

        if (window.scrollY > 15) {
            siteHeader.classList.add(
                "scrolled"
            );
        } else {
            siteHeader.classList.remove(
                "scrolled"
            );
        }
    }

    window.addEventListener(
        "scroll",
        headerScroll,
        { passive: true }
    );

    headerScroll();


    /* =====================================================
       NAV ACTIVE SECTION
    ===================================================== */

    const sections = $$(
        "#beranda, #tentang, #keahlian, #project, #blog, #kontak"
    );

    const navLinks = $$(".nav-link");

    if (sections.length) {

        const navObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            navLinks.forEach(
                                function (link) {

                                    link.classList.remove(
                                        "active"
                                    );

                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );

                                    if (
                                        href ===
                                        "#" +
                                        entry.target.id
                                    ) {
                                        link.classList.add(
                                            "active"
                                        );
                                    }
                                }
                            );
                        }
                    );
                },
                {
                    threshold: 0.15,
                    rootMargin:
                        "-20% 0px -60% 0px"
                }
            );

        sections.forEach(
            function (section) {
                navObserver.observe(
                    section
                );
            }
        );
    }


    /* =====================================================
       SMOOTH ANCHOR
    ===================================================== */

    $$('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            href
                        );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            );
        }
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        $(".hero-new");

    const heroImage =
        $(".hero-image-area");

    if (
        hero &&
        heroImage &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;

                heroImage.style.transform =
                    `translate(
                        ${x * -5}px,
                        ${y * -5}px
                    )`;
            }
        );

        hero.addEventListener(
            "mouseleave",
            function () {

                heroImage.style.transform =
                    "";
            }
        );
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealTargets = [
        ".about-heading",
        ".about-info",
        ".about-visual",
        ".bottom-item",
        ".pro-skills-header",
        ".pro-category-nav",
        ".pro-showcase",
        ".projects-header",
        ".project-card",
        ".blog-heading",
        ".blog-single",
        ".contact-heading",
        ".contact-info",
        ".contact-form-box"
    ];

    revealTargets.forEach(
        function (selector) {

            $$(selector).forEach(
                function (element) {

                    element.style.opacity =
                        "0";

                    element.style.transform =
                        "translateY(25px)";

                    element.style.transition =
                        "opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1)";
                }
            );
        }
    );


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: .08,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );

    revealTargets.forEach(
        function (selector) {

            $$(selector).forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );
                }
            );
        }
    );


    /* =====================================================
       =====================================================
       SKILL SECTION
       =====================================================
    ===================================================== */

    const skillData = {

        frontend: {
            title: "Front End",
            number: "01",
            description:
                "Membangun tampilan website yang modern, responsif, dan interaktif.",

            skills: [
                ["HTML", "Semantic structure"],
                ["CSS", "Responsive styling"],
                ["JavaScript", "Interaction"],
            ]
        },

        backend: {
            title: "Back End",
            number: "02",
            description:
                "Mengembangkan logic website, pengolahan data, dan komunikasi dengan database.",

            skills: [
                ["PHP", "Server-side"],
                ["MySQL", "Database"],
                ["CRUD", "Data processing"],
                ["API", "Data exchange"]
            ]
        },

        programming: {
            title: "Programming",
            number: "03",
            description:
                "Programming untuk membangun logic dan menyelesaikan berbagai masalah.",

            skills: [
                ["PHP", "Programming"],
                ["JavaScript", "Web logic"],
                ["C++", "Programming"],
                ["Python", "Basic logic"]
            ]
        },

        ui: {
            title: "UI Design",
            number: "04",
            description:
                "Membuat interface yang sederhana, jelas, dan nyaman digunakan.",

            skills: [
                ["Figma", "Interface design"],
                ["Canva", "Interface design & typograpi"],
        },

        framework: {
            title: "Framework",
            number: "05",
            description:
                "Menggunakan framework dan library untuk mempercepat proses development.",

            skills: [
                ["Bootstrap", "CSS framework"],
                ["Tailwind CSS", "CSS framework"],
                
            ]
        },

        editing: {
            title: "Editing",
            number: "06",
            description:
                "Mengolah media visual untuk kebutuhan digital.",

            skills: [
                ["Photshop", "Visual"],
                ["Capcut PC", "Video editing"],
                ["Pixallab", "Image editing"],
                ["Canva", "Design alternatif"]
            ]
        },

        tools: {
            title: "Tools",
            number: "07",
            description:
                "Tools yang membantu coding, debugging, design, dan pengembangan website.",

            skills: [
                ["VS Code", "Code editor"],
                ["GitHub", "Version control"],
                ["Laragon", "Server Web"],
                ["Visual Studio", "IDE Programing"],
                ["Colab Studio", "Python Analyst"]
            ]
        }

    };


    const skillButtons =
        $$(".pro-category");

    const skillTitle =
        $("#proSkillTitle");

    const skillNumber =
        $("#proSkillNumber");

    const skillDescription =
        $("#proSkillDescription");

    const skillList =
        $("#proSkillList");

    const skillCount =
        $("#proSkillCount");


    function showSkills(
        key
    ) {

        const data =
            skillData[key];

        if (!data) return;


        /* active */

        skillButtons.forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.skill ===
                    key
                );
            }
        );


        /* heading */

        if (skillTitle) {
            skillTitle.textContent =
                data.title;
        }

        if (skillNumber) {
            skillNumber.textContent =
                data.number;
        }

        if (skillDescription) {
            skillDescription.textContent =
                data.description;
        }


        /* list */

        if (skillList) {

            skillList.innerHTML = "";

            data.skills.forEach(
                function (
                    skill,
                    index
                ) {

                    const card =
                        document.createElement(
                            "div"
                        );

                    card.className =
                        "skill-chip";

                    card.innerHTML = `
                        <strong>
                            ${skill[0]}
                        </strong>

                        <span>
                            ${skill[1]}
                        </span>
                    `;

                    skillList.appendChild(
                        card
                    );

                    card.animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    "translateY(10px)"
                            },
                            {
                                opacity: 1,
                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 350,
                            delay:
                                index * 50,
                            fill: "both",
                            easing:
                                "cubic-bezier(.22,1,.36,1)"
                        }
                    );
                }
            );
        }


        /* count */

        if (skillCount) {
            skillCount.textContent =
                String(
                    data.skills.length
                ).padStart(
                    2,
                    "0"
                ) +
                " SKILLS";
        }
    }


    /* =====================================================
       SKILL BUTTON
       SUPER SIMPLE
    ===================================================== */

    skillButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const skill =
                        button.dataset.skill;

                    showSkills(
                        skill
                    );
                }
            );
        }
    );


    /* default */

    showSkills(
        "frontend"
    );


    /* =====================================================
       SKILL HORIZONTAL DRAG
       MOBILE + TABLET
       
       IMPORTANT:
       BUTTON CLICK TIDAK DIGANGGU
    ===================================================== */

    const skillScroller =
        $(".pro-category-nav");

    if (skillScroller) {

        let isDragging = false;

        let startX = 0;
        let startScroll = 0;

        let movedDistance = 0;

        skillScroller.addEventListener(
            "pointerdown",
            function (event) {

                /*
                 * Kalau yang ditekan button,
                 * jangan memulai drag.
                 */
                if (
                    event.target.closest(
                        ".pro-category"
                    )
                ) {
                    return;
                }

                isDragging = true;

                startX =
                    event.clientX;

                startScroll =
                    skillScroller.scrollLeft;

                movedDistance = 0;

                skillScroller.classList.add(
                    "dragging"
                );
            }
        );


        skillScroller.addEventListener(
            "pointermove",
            function (event) {

                if (!isDragging) return;

                const distance =
                    event.clientX -
                    startX;

                movedDistance =
                    Math.abs(distance);

                skillScroller.scrollLeft =
                    startScroll -
                    distance;
            }
        );


        function endSkillDrag() {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            skillScroller.classList.remove(
                "dragging"
            );
        }


        skillScroller.addEventListener(
            "pointerup",
            endSkillDrag
        );

        skillScroller.addEventListener(
            "pointercancel",
            endSkillDrag
        );


        /*
         * Wheel desktop
         */

        skillScroller.addEventListener(
            "wheel",
            function (event) {

                if (
                    Math.abs(
                        event.deltaY
                    ) >
                    Math.abs(
                        event.deltaX
                    )
                ) {

                    skillScroller.scrollLeft +=
                        event.deltaY;
                }
            },
            {
                passive: true
            }
        );
    }


    /* =====================================================
       =====================================================
       PROJECT SLIDER
       =====================================================
    ===================================================== */

    const projectSlider =
        $("#projectsSlider");

    const projectCards =
        $$(".project-card");

    const previousButton =
        $("#projectPrev");

    const nextButton =
        $("#projectNext");

    const currentCounter =
        $("#projectCurrent");

    const progressBar =
        $("#projectProgress");


    let projectTimer = null;


    /* =====================================================
       PROJECT STEP
    ===================================================== */

    function getProjectStep() {

        if (
            !projectCards.length
        ) {
            return 0;
        }

        const card =
            projectCards[0];

        const style =
            window.getComputedStyle(
                projectSlider
            );

        const gap =
            parseFloat(
                style.gap
            ) || 22;

        return (
            card.offsetWidth +
            gap
        );
    }


    /* =====================================================
       PROJECT COUNTER
    ===================================================== */

    function updateProjectCounter() {

        if (
            !projectSlider ||
            !projectCards.length
        ) {
            return;
        }

        const step =
            getProjectStep();

        if (!step) return;

        const index =
            Math.round(
                projectSlider.scrollLeft /
                step
            );

        const safeIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    projectCards.length - 1
                )
            );


        if (currentCounter) {

            currentCounter.textContent =
                String(
                    safeIndex + 1
                ).padStart(
                    2,
                    "0"
                );
        }


        if (progressBar) {

            const max =
                projectSlider.scrollWidth -
                projectSlider.clientWidth;

            let percent = 20;

            if (max > 0) {

                percent =
                    (
                        projectSlider.scrollLeft /
                        max
                    ) * 100;
            }

            progressBar.style.width =
                Math.max(
                    20,
                    Math.min(
                        100,
                        percent
                    )
                ) + "%";
        }
    }


    /* =====================================================
       PROJECT GO TO
    ===================================================== */

    function goToProject(
        index
    ) {

        if (
            !projectSlider ||
            !projectCards.length
        ) {
            return;
        }

        const step =
            getProjectStep();

        const max =
            projectSlider.scrollWidth -
            projectSlider.clientWidth;

        let target =
            step * index;

        target =
            Math.max(
                0,
                Math.min(
                    target,
                    max
                )
            );

        projectSlider.scrollTo({
            left: target,
            behavior: "smooth"
        });
    }


    /* =====================================================
       NEXT PROJECT
    ===================================================== */

    function nextProject() {

        if (!projectSlider) return;

        const step =
            getProjectStep();

        const max =
            projectSlider.scrollWidth -
            projectSlider.clientWidth;

        let target =
            projectSlider.scrollLeft +
            step;


        /*
         * End → back to first
         */

        if (
            target >=
            max - 5
        ) {
            target = 0;
        }


        projectSlider.scrollTo({
            left: target,
            behavior: "smooth"
        });


        restartProjectTimer();
    }


    /* =====================================================
       PREVIOUS PROJECT
    ===================================================== */

    function previousProject() {

        if (!projectSlider) return;

        const step =
            getProjectStep();

        let target =
            projectSlider.scrollLeft -
            step;


        /*
         * Beginning → go to last
         */

        if (target <= 5) {

            const max =
                projectSlider.scrollWidth -
                projectSlider.clientWidth;

            target = max;
        }


        projectSlider.scrollTo({
            left: target,
            behavior: "smooth"
        });


        restartProjectTimer();
    }


    previousButton?.addEventListener(
        "click",
        previousProject
    );

    nextButton?.addEventListener(
        "click",
        nextProject
    );


    /* =====================================================
       PROJECT AUTO SLIDE
    ===================================================== */

    function stopProjectTimer() {

        if (projectTimer) {

            clearInterval(
                projectTimer
            );

            projectTimer = null;
        }
    }


    function startProjectTimer() {

        if (
            !projectSlider ||
            projectCards.length < 2
        ) {
            return;
        }


        stopProjectTimer();


        /*
         * 5 second interval.
         */

        projectTimer =
            setInterval(
                function () {

                    nextProject();

                },
                1000
            );
    }


    function restartProjectTimer() {

        stopProjectTimer();

        setTimeout(
            function () {

                startProjectTimer();

            },
            2000
        );
    }


    /* =====================================================
       PAUSE AUTO SLIDE WHEN HOVER
    ===================================================== */

    if (projectSlider) {

        projectSlider.addEventListener(
            "mouseenter",
            stopProjectTimer
        );

        projectSlider.addEventListener(
            "mouseleave",
            startProjectTimer
        );

        projectSlider.addEventListener(
            "touchstart",
            stopProjectTimer,
            {
                passive: true
            }
        );

        projectSlider.addEventListener(
            "touchend",
            restartProjectTimer,
            {
                passive: true
            }
        );

        projectSlider.addEventListener(
            "scroll",
            updateProjectCounter,
            {
                passive: true
            }
        );
    }


    /* =====================================================
       PROJECT DRAG
       
       VERY IMPORTANT:
       Kita tidak menggunakan setPointerCapture.
       Jadi tombol Preview tetap menerima click.
    ===================================================== */

    if (projectSlider) {

        let dragging = false;

        let startX = 0;

        let startScroll = 0;

        let moved = false;


        projectSlider.addEventListener(
            "pointerdown",
            function (event) {

                /*
                 * Jangan drag ketika klik
                 * tombol Preview.
                 */
                if (
                    event.target.closest(
                        "button, a"
                    )
                ) {
                    return;
                }


                dragging = true;

                moved = false;

                startX =
                    event.clientX;

                startScroll =
                    projectSlider.scrollLeft;

                projectSlider.classList.add(
                    "dragging"
                );


                stopProjectTimer();
            }
        );


        projectSlider.addEventListener(
            "pointermove",
            function (event) {

                if (!dragging) {
                    return;
                }

                const distance =
                    event.clientX -
                    startX;


                if (
                    Math.abs(distance) >
                    5
                ) {
                    moved = true;
                }


                projectSlider.scrollLeft =
                    startScroll -
                    distance;
            }
        );


        function endProjectDrag() {

            if (!dragging) {
                return;
            }

            dragging = false;

            projectSlider.classList.remove(
                "dragging"
            );


            updateProjectCounter();

            restartProjectTimer();
        }


        projectSlider.addEventListener(
            "pointerup",
            endProjectDrag
        );

        projectSlider.addEventListener(
            "pointercancel",
            endProjectDrag
        );
    }


    /* =====================================================
       PROJECT PREVIEW MODAL
    ===================================================== */

    const projectModal =
        $("#projectModal");

    const modalImage =
        $("#modalProjectImage");

    const modalCategory =
        $("#modalProjectCategory");

    const modalYear =
        $("#modalProjectYear");

    const modalTitle =
        $("#modalProjectTitle");

    const modalDescription =
        $("#modalProjectDescription");

    const modalDirectLink =
        $("#modalDirectLink");

    const modalTech = [
        $("#modalTech1"),
        $("#modalTech2"),
        $("#modalTech3")
    ];


    function getCardData(card) {

        if (!card) return null;

        const image =
            $(".project-image img", card);

        const category =
            $(".project-meta span:first-child", card);

        const year =
            $(".project-meta span:last-child", card);

        const title =
            $(".project-body h3", card);

        const description =
            $(".project-body > p", card);

        const tags =
            $$(".project-tags span", card);

        const directLink =
            $(".project-direct-link", card);


        return {

            image:
                image
                    ? image.src
                    : "",

            category:
                category
                    ? category.textContent.trim()
                    : "",

            year:
                year
                    ? year.textContent.trim()
                    : "",

            title:
                title
                    ? title.textContent.trim()
                    : "",

            description:
                description
                    ? description.textContent.trim()
                    : "",

            tags:
                tags.map(
                    function (tag) {
                        return tag.textContent.trim();
                    }
                ),

            link:
                directLink
                    ? directLink.href
                    : "#"
        };
    }


    /* =====================================================
       OPEN PROJECT
    ===================================================== */

    function openProject(
        card
    ) {

        if (
            !projectModal ||
            !card
        ) {
            return;
        }

        const data =
            getCardData(card);

        if (!data) return;


        if (modalImage) {

            modalImage.src =
                data.image;

            modalImage.alt =
                data.title;
        }


        if (modalCategory) {

            modalCategory.textContent =
                data.category;
        }


        if (modalYear) {

            modalYear.textContent =
                data.year;
        }


        if (modalTitle) {

            modalTitle.textContent =
                data.title;
        }


        if (modalDescription) {

            modalDescription.textContent =
                data.description;
        }


        modalTech.forEach(
            function (
                tech,
                index
            ) {

                if (!tech) return;

                const value =
                    data.tags[index] ||
                    "";

                tech.textContent =
                    value;

                tech.style.display =
                    value
                        ? "inline-block"
                        : "none";
            }
        );


        if (modalDirectLink) {

            modalDirectLink.href =
                data.link;
        }


        projectModal.classList.add(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lock-scroll"
        );


        stopProjectTimer();
    }


    /* =====================================================
       CLOSE PROJECT
    ===================================================== */

    function closeProject() {

        if (!projectModal) return;

        projectModal.classList.remove(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lock-scroll"
        );

        startProjectTimer();
    }


    /* =====================================================
       PREVIEW BUTTONS
       
       IMPORTANT:
       Query langsung semua tombol.
    ===================================================== */

    $$(".preview-button").forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const card =
                        button.closest(
                            ".project-card"
                        );


                    openProject(
                        card
                    );
                }
            );
        }
    );


    /* close */

    $$(".project-modal .modal-close")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    closeProject
                );
            }
        );


    $(".project-modal .modal-backdrop")
        ?.addEventListener(
            "click",
            closeProject
        );


    /* =====================================================
       DETAIL MODAL
    ===================================================== */

    const detailModal =
        $("#detailModal");

    const detailButton =
        $("#detailButton");


    if (
        detailModal &&
        detailButton
    ) {

        detailButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                detailModal.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "lock-scroll"
                );

                stopProjectTimer();
            }
        );


        $$(".modal-close", detailModal)
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            detailModal.classList.remove(
                                "active"
                            );

                            document.body.classList.remove(
                                "lock-scroll"
                            );

                            startProjectTimer();
                        }
                    );
                }
            );


        detailModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    detailModal
                ) {

                    detailModal.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "lock-scroll"
                    );

                    startProjectTimer();
                }
            }
        );
    }


    /* =====================================================
       BLOG MODAL
       
       HTML kamu mempunyai dua blog modal.
       Kita hanya gunakan modal pertama.
    ===================================================== */

    const blogModal =
        $(".blog-modal");

    const blogButton =
        $(".blog-btn");


    if (
        blogModal &&
        blogButton
    ) {

        const blogClose =
            $(".blog-modal-close",
                blogModal
            );

        const blogOverlay =
            $(".blog-modal-overlay",
                blogModal
            );

        const blogImage =
            $("#blogModalImage",
                blogModal
            );

        const blogMeta =
            $("#blogModalMeta",
                blogModal
            );

        const blogTitle =
            $("#blogModalTitle",
                blogModal
            );

        const blogDescription =
            $("#blogModalDescription",
                blogModal
            );

        const blogText =
            $("#blogModalText",
                blogModal
            );


        function openBlog() {

            const image =
                $(".blog-single-image img");

            const meta =
                $(".blog-meta");

            const title =
                $(".blog-single-content h3");

            const description =
                $(".blog-single-content > p");


            if (
                blogImage &&
                image
            ) {

                blogImage.src =
                    image.src;

                blogImage.alt =
                    image.alt;
            }


            if (
                blogMeta &&
                meta
            ) {

                blogMeta.textContent =
                    meta.textContent.trim();
            }


            if (
                blogTitle &&
                title
            ) {

                blogTitle.textContent =
                    title.textContent.trim();
            }


            if (
                blogDescription &&
                description
            ) {

                blogDescription.textContent =
                    description.textContent.trim();
            }


            if (blogText) {

                blogText.innerHTML = `

                    <p>
                        Belajar coding bagi saya
                        dimulai dari rasa penasaran
                        untuk memahami bagaimana
                        sebuah website bekerja.
                    </p>

                    <p>
                        Dari HTML, CSS, JavaScript,
                        sampai backend dan database,
                        setiap project memberikan
                        pengalaman baru.
                    </p>

                    <p>
                        Tidak semua project berjalan
                        mulus. Dari error dan debugging
                        saya justru mendapatkan banyak
                        pengalaman.
                    </p>

                    <p>
                        Saya masih terus belajar dan
                        ingin membangun lebih banyak
                        project nyata.
                    </p>
                `;
            }


            blogModal.classList.add(
                "active"
            );

            document.body.classList.add(
                "lock-scroll"
            );

            stopProjectTimer();
        }


        function closeBlog() {

            blogModal.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "lock-scroll"
            );

            startProjectTimer();
        }


        blogButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openBlog();
            }
        );


        blogClose?.addEventListener(
            "click",
            closeBlog
        );


        blogOverlay?.addEventListener(
            "click",
            closeBlog
        );
    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            closeProject();


            if (detailModal) {

                detailModal.classList.remove(
                    "active"
                );
            }


            if (blogModal) {

                blogModal.classList.remove(
                    "active"
                );
            }


            document.body.classList.remove(
                "lock-scroll"
            );


            closeNav();
        }
    );


    /* =====================================================
       CONTACT FORMSPREE
    ===================================================== */

    const contactForm =
        $("#contactForm");

    const formStatus =
        $("#formStatus");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const button =
                    $(".contact-submit",
                        contactForm
                    );


                const oldHTML =
                    button
                        ? button.innerHTML
                        : "";


                if (button) {

                    button.disabled =
                        true;

                    button.textContent =
                        "Mengirim...";
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
                                    Accept:
                                        "application/json"
                                }
                            }
                        );


                    if (
                        !response.ok
                    ) {
                        throw new Error(
                            "Request failed"
                        );
                    }


                    contactForm.reset();


                    if (formStatus) {

                        formStatus.textContent =
                            "Pesan berhasil dikirim.";
                    }

                } catch (error) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Pesan gagal dikirim. Silakan coba lagi.";
                    }

                } finally {

                    if (button) {

                        button.disabled =
                            false;

                        button.innerHTML =
                            oldHTML;
                    }
                }
            }
        );
    }


    /* =====================================================
       INITIAL PROJECT STATE
    ===================================================== */

    updateProjectCounter();

    setTimeout(
        function () {
            startProjectTimer();
        },
        1000
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            updateProjectCounter();
        }
    );

});
