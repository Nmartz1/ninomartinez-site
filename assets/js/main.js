/**
 * NINO MARTINEZ PORTFOLIO
 * Simple, reliable JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initVideoModal();
    initSmoothScroll();
});

/**
 * Navigation
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * Video Modal with Prev/Next Navigation
 */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    if (!modal || !modalVideo) return;

    // Collect all video IDs from show cards
    const showCards = document.querySelectorAll('.show-card[data-video]');
    const videoIds = [];
    showCards.forEach(function(card) {
        videoIds.push(card.getAttribute('data-video'));
    });
    
    let currentIndex = 0;

    // Click handlers for show cards
    showCards.forEach(function(card, index) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            openModal(videoIds[currentIndex]);
        });
    });

    // Open modal
    function openModal(videoId) {
        modalVideo.src = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&title=0&byline=0&portrait=0';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateNavButtons();
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        modalVideo.src = '';
        document.body.style.overflow = '';
    }

    // Update nav button visibility
    function updateNavButtons() {
        if (modalPrev) {
            modalPrev.style.display = currentIndex > 0 ? 'flex' : 'none';
        }
        if (modalNext) {
            modalNext.style.display = currentIndex < videoIds.length - 1 ? 'flex' : 'none';
        }
    }

    // Previous video
    if (modalPrev) {
        console.log('Setting up prev button');
        modalPrev.addEventListener('click', function(e) {
            console.log('Prev clicked, currentIndex:', currentIndex);
            e.preventDefault();
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                console.log('Going to video:', currentIndex, videoIds[currentIndex]);
                openModal(videoIds[currentIndex]);
            }
        });
    }

    // Next video
    if (modalNext) {
        console.log('Setting up next button');
        modalNext.addEventListener('click', function(e) {
            console.log('Next clicked, currentIndex:', currentIndex);
            e.preventDefault();
            e.stopPropagation();
            if (currentIndex < videoIds.length - 1) {
                currentIndex++;
                console.log('Going to video:', currentIndex, videoIds[currentIndex]);
                openModal(videoIds[currentIndex]);
            }
        });
    }

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            openModal(videoIds[currentIndex]);
        } else if (e.key === 'ArrowRight' && currentIndex < videoIds.length - 1) {
            currentIndex++;
            openModal(videoIds[currentIndex]);
        }
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
}
