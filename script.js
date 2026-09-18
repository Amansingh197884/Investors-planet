document.addEventListener('DOMContentLoaded', () => {

    const heroSwiper = new Swiper('.heroSwiper', {
        loop: true,
        effect: 'fade',
        crossFade: true,
        speed: 950,
        autoplay: {
            delay: 5500,
            disableOnInteraction: false,
        },
        on: {
            slideChangeTransitionStart() {
                const currentSlide = this.slides[this.activeIndex];
                if (!currentSlide) return;

                const animatedItems = currentSlide.querySelectorAll('.animate__animated');
                animatedItems.forEach(el => {
                    el.classList.remove('animate__fadeInUp');
                    void el.offsetWidth;
                    el.classList.add('animate__fadeInUp');
                });
            },
            slideChangeTransitionEnd() {
                this.slides.forEach((slide, index) => {
                    if (index !== this.activeIndex) {
                        const oldItems = slide.querySelectorAll('.animate__animated');
                        oldItems.forEach(el => el.classList.remove('animate__fadeInUp'));
                    }
                });
            }
        }
    });

    const menuToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function toggleMobileMenu(isOpen) {
        if (!mobileDrawer || !drawerOverlay) return;
        mobileDrawer.classList.toggle('open', isOpen);
        drawerOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (menuToggle) menuToggle.addEventListener('click', () => toggleMobileMenu(true));
    if (drawerClose) drawerClose.addEventListener('click', () => toggleMobileMenu(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleMobileMenu(false));

    const topNavbar = document.getElementById('topNavbar');
    const floatingCallBtn = document.getElementById('floatingCallBtn');
    const heroSection = document.getElementById('heroSection');

    function updateScrollState() {
        const scrollPos = window.scrollY || window.pageYOffset;

        if (topNavbar) {
            if (scrollPos > 30) {
                topNavbar.classList.add('scrolled');
            } else {
                topNavbar.classList.remove('scrolled');
            }
        }

        if (floatingCallBtn && heroSection) {
            const heroThreshold = heroSection.offsetHeight - 100;
            if (scrollPos > heroThreshold) {
                floatingCallBtn.classList.add('visible');
            } else {
                floatingCallBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const revealItems = entry.target.querySelectorAll('.scroll-reveal');

                revealItems.forEach((item, index) => {
                    setTimeout(() => {
                        const animationType = item.dataset.animation || 'animate__fadeInUp';
                        item.style.visibility = 'visible';
                        item.classList.add('animate__animated', animationType);
                    }, index * 95);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    const observedSections = [
        'about',
        'exploreCategories',
        'mostSellingProjects',
        'marketedProjects',
        'realEstateBlogs',
        'featuredLandmark',
        'siteFooter',
        'enquiryLocationSection'
    ];

    observedSections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            scrollObserver.observe(sectionElement);
        }
    });

    const allSections = document.querySelectorAll('section, header.about-page-banner, header.career-page-banner, header.testimonials-page-banner, header.contact-page-banner, header.commercial-page-banner, header.residential-page-banner, header.property-detail-page-banner');
    allSections.forEach(sec => {
        scrollObserver.observe(sec);
    });

    new Swiper('.projectCategorySlider', {
        slidesPerView: 1.15,
        spaceBetween: 18,
        speed: 800,
        resistanceRatio: 0.85,
        touchRatio: 1.1,
        navigation: {
            nextEl: '.project-next-btn',
            prevEl: '.project-prev-btn',
            disabledClass: 'swiper-button-disabled',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1300: {
                slidesPerView: 4,
                spaceBetween: 24,
            }
        }
    });

    new Swiper('.devShowcaseSwiper', {
        slidesPerView: 1.15,
        slidesPerGroup: 1,
        spaceBetween: 18,
        speed: 850,
        resistanceRatio: 0.85,
        touchRatio: 1.1,
        navigation: {
            nextEl: '.dev-next-btn',
            prevEl: '.dev-prev-btn',
            disabledClass: 'swiper-button-disabled',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 18,
            },
            768: {
                slidesPerView: 3,
                slidesPerGroup: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 3,
                spaceBetween: 22,
            },
            1400: {
                slidesPerView: 5,
                slidesPerGroup: 4,
                spaceBetween: 24,
            }
        }
    });

    document.querySelectorAll('.dev-luxury-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.closest('.dev-view-prop-btn')) {
                this.classList.toggle('active');
            }
        });
    });

    new Swiper('.partnersSwiper', {
        slidesPerView: 2,
        spaceBetween: 16,
        speed: 800,
        loop: true,
        loopAdditionalSlides: 4,
        watchSlidesProgress: true,
        autoplay: {
            delay: 2200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: '.partners-btn-next',
            prevEl: '.partners-btn-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 3,
                spaceBetween: 18,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 22,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 24,
            }
        }
    });

    new Swiper('.journalBlogsSwiper', {
        slidesPerView: 1.15,
        spaceBetween: 18,
        speed: 800,
        watchOverflow: true,
        navigation: {
            nextEl: '.journal-btn-next',
            prevEl: '.journal-btn-prev',
            disabledClass: 'swiper-button-disabled',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 26,
            }
        }
    });

    const landmarkModal = document.getElementById('landmarkVideoModal');
    const landmarkIframe = document.getElementById('landmarkIframe');
    const youtubeVideoUrl = "https://www.youtube.com/embed/Rlj3gzHr7QU?autoplay=1&rel=0&modestbranding=1";

    if (landmarkModal && landmarkIframe) {
        landmarkModal.addEventListener('show.bs.modal', () => {
            landmarkIframe.setAttribute('src', youtubeVideoUrl);
        });

        landmarkModal.addEventListener('hide.bs.modal', () => {
            landmarkIframe.setAttribute('src', '');
        });
    }

    new Swiper('.aboutTeamSwiper', {
        slidesPerView: 1.15,
        spaceBetween: 18,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 22,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 24,
            }
        }
    });

    new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 800,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.testimonial-next-btn',
            prevEl: '.testimonial-prev-btn',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 30,
            }
        }
    });

    new Swiper('.commercialGridSwiper', {
        slidesPerView: 1.15,
        spaceBetween: 18,
        speed: 850,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.comm-grid-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 28,
            }
        }
    });

});