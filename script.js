// ==========================================
// NAVBAR & HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Tutup menu setelah memilih halaman
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// ==========================================
// DETAIL MODAL (MODAL PERTAMA)
// ==========================================
const detailButton = document.getElementById("detailButton");
const detailModal = document.getElementById("detailModal");
const modalClose = document.getElementById("modalClose");

// Buka modal detail
if (detailButton && detailModal) {
    detailButton.addEventListener("click", () => {
        detailModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

// Tutup dengan tombol X (Modal Detail)
if (modalClose && detailModal) {
    modalClose.addEventListener("click", () => {
        detailModal.classList.remove("active");
        document.body.style.overflow = "";
    });

    // Tutup ketika klik area luar modal
    detailModal.addEventListener("click", (event) => {
        if (event.target === detailModal) {
            detailModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

// Tutup Detail Modal dengan tombol Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && detailModal && detailModal.classList.contains("active")) {
        detailModal.classList.remove("active");
        document.body.style.overflow = "";
    }
});


/* ==================================================
   PROJECT SLIDER + PREVIEW MODAL
================================================== */
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("projectsSlider");
    const prevButton = document.getElementById("projectPrev");
    const nextButton = document.getElementById("projectNext");
    const currentNumber = document.getElementById("projectCurrent");
    const progressBar = document.getElementById("projectProgress");

    /* Jika section slider tidak ada, hentikan fungsi slider */
    if (!slider) {
        return;
    }

    const cards = Array.from(slider.querySelectorAll(".project-card"));
    if (cards.length === 0) {
        return;
    }

    let currentIndex = 0;
    let autoSlide = null;
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    /* ==================================================
        GET CARD WIDTH
    ================================================== */
    function getCardWidth() {
        const card = cards[0];
        const sliderStyle = window.getComputedStyle(slider);
        const gap = parseFloat(sliderStyle.gap) || 22;
        return card.offsetWidth + gap;
    }

    /* ==================================================
        UPDATE UI
    ================================================== */
    function updateUI() {
        if (currentNumber) {
            currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");
        }

        if (progressBar) {
            const percentage = ((currentIndex + 1) / cards.length) * 100;
            progressBar.style.width = percentage + "%";
        }
    }

    /* ==================================================
        MOVE TO CARD
    ================================================== */
    function goToProject(index) {
        if (index < 0) {
            index = cards.length - 1;
        }

        if (index >= cards.length) {
            index = 0;
        }

        currentIndex = index;
        const position = currentIndex * getCardWidth();

        slider.scrollTo({
            left: position,
            behavior: "smooth"
        });

        updateUI();
    }

    /* ==================================================
        NEXT & PREVIOUS
    ================================================== */
    function nextProject() {
        goToProject(currentIndex + 1);
    }

    function previousProject() {
        goToProject(currentIndex - 1);
    }

    if (nextButton) {
        nextButton.addEventListener("click", function (event) {
            event.preventDefault();
            nextProject();
            restartAutoSlide();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function (event) {
            event.preventDefault();
            previousProject();
            restartAutoSlide();
        });
    }

    /* ==================================================
        AUTO SLIDE
    ================================================== */
    function startAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(function () {
            nextProject();
        }, 2500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = null;
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    /* PAUSE ON HOVER */
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", function () {
        if (!isDragging) {
            startAutoSlide();
        }
    });

    /* ==================================================
        MOUSE DRAG
    ================================================== */
    slider.addEventListener("mousedown", function (event) {
        isDragging = true;
        startX = event.pageX;
        startScrollLeft = slider.scrollLeft;
        slider.classList.add("dragging");
        stopAutoSlide();
    });

    slider.addEventListener("mousemove", function (event) {
        if (!isDragging) return;
        event.preventDefault();
        const distance = event.pageX - startX;
        slider.scrollLeft = startScrollLeft - distance;
    });

    function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove("dragging");

        const cardWidth = getCardWidth();
        currentIndex = Math.round(slider.scrollLeft / cardWidth);
        currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));

        goToProject(currentIndex);
        startAutoSlide();
    }

    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mouseleave", function () {
        if (isDragging) {
            stopDragging();
        }
    });

    /* ==================================================
        TOUCH SWIPE
    ================================================== */
    let touchStartX = 0;
    let touchStartScroll = 0;

    slider.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
        touchStartScroll = slider.scrollLeft;
        stopAutoSlide();
    }, { passive: true });

    slider.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].clientX;
        const distance = touchStartX - touchEndX;

        if (distance > 50) {
            nextProject();
        } else if (distance < -50) {
            previousProject();
        } else {
            const cardWidth = getCardWidth();
            currentIndex = Math.round(slider.scrollLeft / cardWidth);
            goToProject(currentIndex);
        }
        startAutoSlide();
    }, { passive: true });

    /* ==================================================
        PREVIEW MODAL (PROJECT MODAL)
    ================================================== */
    const modal = document.getElementById("projectModal");
    
    // PERBAIKAN: Target tombol X spesifik yang berada di dalam #projectModal
    const projectModalClose = modal ? modal.querySelector("#modalClose") : null;
    const modalBackdrop = modal ? modal.querySelector(".modal-backdrop") : null;

    const modalImage = document.getElementById("modalProjectImage");
    const modalCategory = document.getElementById("modalProjectCategory");
    const modalYear = document.getElementById("modalProjectYear");
    const modalTitle = document.getElementById("modalProjectTitle");
    const modalDescription = document.getElementById("modalProjectDescription");
    const modalTech1 = document.getElementById("modalTech1");
    const modalTech2 = document.getElementById("modalTech2");
    const modalTech3 = document.getElementById("modalTech3");
    const modalDirectLink = document.getElementById("modalDirectLink");

    /* ==================================================
        PROJECT DATA
    ================================================== */
    const projectData = {
        project1: {
            image: "assets/priw1.png",
            category: "WEB DEVELOPMENT",
            year: "2026",
            title: "Website Jasa Pembuatan Website",
            description: "Website yang saya bangun menggunakan php ini sebagai beckend adalah sebuah layanan jasa untuk pembuatan website yang bisa digunakan semua orang yang lagi butuh sebguah website berdarkan keperluan.",
            tech: ["PHP", "Bootstrap", "MySql"],
            link: "https://vicode.ct.ws/"
        },
        project2: {
            image: "assets/priw2.png",
            category: "WEB DEVELOPMENT",
            year: "2026",
            title: "Website top up game",
            description: "Pada Webiste ini saya mencoba mengambangkan website top up game dengan sistem pembayaran mengunakan virtua coin vigi coin sistem pembayaran dalam wesbite ini tanpa menggukan paymanet gatway tapi menggunkan semi-otomatis.",
            tech: ["PHP", "Bootstrap", "MySql"],
            link: "https://virgigame.gt.tc/"
        },
        project3: {
            image: "assets/priw3.png",
            category: "DASHBOARD",
            year: "2026",
            title: "Website Sistem Akademik sederhana",
            description: "pada wesbite ini adalah layanan akademik bagi mahasiswa dan dosen dengan fitur sederhana sperti menejmen tugas, absen, chat dosen dll.",
            tech: ["PHP", "Bootstrap", "MySql"],
            link: "hhttps://myacademic.ct.ws/"
        },
        project4: {
            image: "assets/port-2.png",
            category: "UI DESIGN",
            year: "2026",
            title: "Sistem Rumah sakit (Desain)",
            description: "Saya Dan tim Saya memrancang desain sistem rumah sakit yang terdapat 3 role pasien ,Admin, Dokter. Yang bertujuan untuk menyelesaikan matkul Analisis Desain Perangkat Lunak",
            tech: ["Figma"],
            link: "https://figma.com"
        },
        project5: {
            image: "assets/pro5.png",
            category: "UI DESIGN",
            year: "2026",
            title: "Landing Page untuk menyimpan media",
            description: " Saya membuat wesbite landing page untuk menyimpan foto dan vidio sebagai percobaan Membangun Wesbite yang responsif dan modren. ",
            tech: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com"
        }
    };

    /* OPEN MODAL */
    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data || !modal) return;

        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalCategory.textContent = data.category;
        modalYear.textContent = data.year;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;

        modalTech1.textContent = data.tech[0] || "";
        modalTech2.textContent = data.tech[1] || "";
        modalTech3.textContent = data.tech[2] || "";

        modalDirectLink.href = data.link;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    /* CLOSE MODAL */
    function closeProjectModal() {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    /* PREVIEW BUTTON EVENTS */
    const previewButtons = document.querySelectorAll(".preview-button");
    previewButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const projectId = button.dataset.project;
            openProjectModal(projectId);
        });
    });

    /* CLOSE BUTTON EVENT (PERBAIKAN) */
    if (projectModalClose) {
        projectModalClose.addEventListener("click", function (event) {
            event.preventDefault();
            closeProjectModal();
        });
    }

    /* BACKDROP CLOSE EVENT */
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", function () {
            closeProjectModal();
        });
    }

    /* ESCAPE KEY CLOSE EVENT FOR PROJECT MODAL */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal && modal.classList.contains("active")) {
            closeProjectModal();
        }
    });

    /* PREVENT IMAGE DRAG */
    slider.querySelectorAll("img").forEach(function (image) {
        image.addEventListener("dragstart", function (event) {
            event.preventDefault();
        });
    });

    /* INITIALIZE */
    updateUI();
    startAutoSlide();
});

/* =========================================
   SIMPLE BLOG MODAL (ARTIKEL UTUH)
========================================= */
document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("blogModal");
    const closeBtn = document.getElementById("blogModalClose");
    const overlay = document.querySelector(".blog-modal-overlay");

    const image = document.getElementById("blogModalImage");
    const meta = document.getElementById("blogModalMeta");
    const title = document.getElementById("blogModalTitle");
    const description = document.getElementById("blogModalDescription");
    const text = document.getElementById("blogModalText");

    const blogs = {
        1: {
            image: "assets/blog1.png",
            meta: "WEB DEVELOPMENT · 28 AGUSTUS 2026 · 5 MIN READ",
            title: "Cara Saya Mengenal coding Dan Web developer",
            description: "Web development menjadi salah satu bidang yang menarik untuk dipelajari.",
            text: `Dunia teknologi merupakan salah satu bidang yang terus berkembang dan memiliki banyak peluang untuk dipelajari. Salah satu hal yang menarik perhatian saya adalah coding dan pengembangan website. Pada awalnya, saya menganggap coding sebagai sesuatu yang sulit karena banyak terdapat kode, simbol, dan istilah yang belum saya pahami. Namun, setelah mulai mempelajarinya, saya menyadari bahwa coding bukan hanya tentang menulis kode, tetapi juga tentang bagaimana kita berpikir, memecahkan masalah, dan menciptakan sesuatu yang dapat digunakan oleh orang lain.

Awal Saya Mengenal Coding

Pertama kali mengenal coding, saya masih merasa cukup asing dengan berbagai bahasa pemrograman. Saya sering melihat orang membuat website atau aplikasi dan bertanya-tanya bagaimana semua itu bisa dibuat hanya dengan menggunakan kode. Rasa penasaran tersebut membuat saya mulai mencoba mempelajari dasar-dasar pemrograman.

Saya mulai mengenal beberapa bahasa yang umum digunakan dalam pengembangan website, seperti HTML, CSS, dan JavaScript. Dari ketiga teknologi tersebut, saya memahami bahwa masing-masing memiliki fungsi yang berbeda. HTML digunakan untuk membuat struktur halaman, CSS digunakan untuk mengatur tampilan, sedangkan JavaScript digunakan untuk membuat website menjadi lebih interaktif.

Pada tahap awal, saya sering mengalami kesulitan dalam memahami struktur kode. Kesalahan kecil seperti kurang tanda kurung, salah menulis nama class, atau kesalahan penulisan kode dapat membuat website tidak berjalan sesuai keinginan. Dari pengalaman tersebut, saya mulai memahami bahwa ketelitian merupakan salah satu hal penting dalam dunia coding.

Mulai Mencoba Membuat Website

Setelah memahami dasar-dasar HTML dan CSS, saya mulai mencoba membuat website sederhana. Awalnya saya hanya membuat halaman dengan teks, gambar, tombol, dan beberapa bagian sederhana. Meskipun terlihat sederhana, ketika berhasil membuat halaman tersebut tampil sesuai dengan yang saya inginkan, saya merasa cukup senang dan termotivasi untuk belajar lebih jauh.

Saya kemudian mulai mencoba membuat website dengan desain yang lebih modern dan rapi. Saya belajar mengenai penggunaan warna, ukuran tulisan, layout, navigasi, hingga membuat website agar dapat menyesuaikan dengan ukuran layar perangkat yang berbeda.

Dari sinilah saya mulai tertarik dengan web development. Saya menyadari bahwa membuat website tidak hanya membutuhkan kemampuan coding, tetapi juga membutuhkan kreativitas dalam menentukan desain dan pengalaman pengguna.

Tantangan yang Saya Hadapi

Dalam proses belajar coding, tentu tidak semuanya berjalan dengan mudah. Salah satu tantangan terbesar yang saya alami adalah ketika kode yang dibuat tidak berjalan seperti yang diharapkan. Terkadang saya sudah merasa bahwa kode tersebut benar, tetapi ketika dijalankan ternyata terdapat error.

Pada awalnya, hal tersebut cukup membuat saya bingung. Namun, saya mulai belajar untuk tidak langsung menyerah ketika menemukan error. Saya mencoba membaca pesan error, mencari penyebabnya, kemudian memperbaiki kode secara bertahap.

Saya juga menyadari bahwa kemampuan coding tidak bisa dikuasai hanya dalam waktu singkat. Dibutuhkan latihan dan pengalaman secara terus-menerus. Semakin sering mencoba membuat sebuah project, semakin banyak pula hal yang dapat dipelajari.

Pengalaman Membuat Project

Salah satu hal yang membuat saya semakin tertarik dengan coding adalah ketika mulai mengerjakan sebuah project. Dengan project, saya tidak hanya belajar teori, tetapi juga langsung menerapkan apa yang sudah dipelajari.

Saya mulai mencoba membuat berbagai halaman website seperti halaman beranda, tentang saya, keahlian, project, blog, dan kontak. Dari project tersebut saya belajar bagaimana menggabungkan HTML, CSS, dan JavaScript menjadi sebuah website yang lebih lengkap.

Saya juga belajar bahwa dalam membuat website, terkadang hasil pertama belum tentu sesuai dengan yang diharapkan. Ada bagian yang harus diperbaiki, baik dari segi tampilan maupun fungsi. Proses mencoba, menemukan kesalahan, memperbaiki, dan mencoba kembali menjadi pengalaman yang sangat berharga bagi saya.`
        }
    };

    function openBlog(id) {
        const blog = blogs[id];
        if (!blog || !modal) return;

        if (image) { image.src = blog.image; image.alt = blog.title; }
        if (meta) meta.textContent = blog.meta;
        if (title) title.textContent = blog.title;
        if (description) description.textContent = blog.description;
        if (text) text.innerText = blog.text; // Menggunakan innerText agar enter/paragraf terbaca rapi

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeBlog() {
        if (!modal) return;
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".blog-btn").forEach(button => {
        button.addEventListener("click", function () {
            openBlog(this.dataset.blog);
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeBlog);
    if (overlay) overlay.addEventListener("click", closeBlog);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal && modal.classList.contains("active")) {
            closeBlog();
        }
    });

});

/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            formStatus.style.display = "block";

            formStatus.textContent =
                "Pesan berhasil disiapkan. Terima kasih sudah menghubungi saya.";

            contactForm.reset();

            setTimeout(() => {

                formStatus.style.display = "none";

            }, 4000);

        }
    );

}




document.addEventListener("DOMContentLoaded", function () {
    // Jalankan animasi Hero langsung saat halaman selesai dimuat
    const heroSection = document.querySelector("#hero, header, .hero-content");
    if (heroSection) {
        heroSection.classList.add("hero-active");
    }

    // Konfigurasi Intersection Observer untuk Scroll Section
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px", // Memicu animasi sedikit lebih awal sebelum elemen sepenuhnya terlihat
        threshold: 0.1 // Hanya butuh 10% elemen terlihat agar transisi yang halus mulai berjalan
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Memberikan sedikit delay via requestAnimationFrame agar rendering GPU lebih lancar
                requestAnimationFrame(() => {
                    entry.target.classList.add("scroll-active");
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Daftarkan semua elemen non-hero untuk di-animasikan saat scroll
    const scrollTargets = document.querySelectorAll(
        "section:not(#hero), .about-info, .about-visual, .skill-category, .project-card, .info-card, .bottom-item"
    );

    scrollTargets.forEach(el => observer.observe(el));
});