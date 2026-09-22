const collections = [
    {
        id: 'chicago',
        name: 'Chicago',
        localName: 'Chicago',
        note: 'The city turns on after dark',
        photos: [
            {
                src: 'picture/Chicago/ed7d9e014f83fe03a16c5a9f157941fd.jpg',
                title: 'Theatre District After Dark',
                description: 'The theatre marquee, a late bus, and a crowd that has not gone home yet.',
            },
            {
                src: 'picture/Chicago/a5cd8208fdaa304523490ab062cdb836.jpg',
                title: 'Between Buildings',
                description: 'There is always a small piece of sky between buildings.',
            },
            {
                src: 'picture/Chicago/4a6f0b0da8b8aef9baf145b71aedab44.jpg',
                title: 'Warm Windows',
                description: 'Night turns every lit window into a small story.',
            },
            {
                src: 'picture/Chicago/6319f4b96e4ea35b92a1a2a7f32fd83b.jpg',
                title: 'A City in Layers',
                description: 'Buildings, bridges, and people meet on one plane.',
            },
            {
                src: 'picture/Chicago/552aa6dd833e1150059cbe533dca3dd8.jpg',
                title: 'Lakefront Weather',
                description: 'Wind comes off the lake and softens the edge of the city.',
            },
        ],
    },
    {
        id: 'hunan',
        name: 'Hunan',
        localName: 'Hunan',
        note: 'Time moves slower in the mountains',
        photos: [
            {
                src: 'picture/Hunnan/99d6b7b8eb79f78bae5b6d41c310741e.jpg',
                title: 'Mist Over Wulingyuan',
                description: 'Before the morning mist lifts, the peaks seem to rise through paper.',
            },
        ],
    },
    {
        id: 'indonesia',
        name: 'Indonesia',
        localName: 'Indonesia',
        note: 'Volcanoes, sea air, and first light',
        photos: [
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/f534b6f0387027fe4b9366a15e5f37b6.jpg',
                title: 'First Light on Bromo',
                description: 'The sun clears the crater and touches the ash still asleep below.',
            },
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/24d319595703e1153fe13169540cb989.jpg',
                title: 'The Long Way Up',
                description: 'Before climbing, let your eyes and footsteps adjust to the dark.',
            },
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/804c574cf573c889f07f6b8952afb971.jpg',
                title: 'Ash and Blue',
                description: 'A blue hour sky and ash moving in the wind.',
            },
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/978b674412e389907a1065050f30f83e.jpg',
                title: 'Edges of the Crater',
                description: 'The edge of the earth, measured against a standing person.',
            },
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/488262fecb8a8b9df08af15aca55cddd.jpg',
                title: 'Before the Crowd',
                description: 'The valley is still quiet before the crowds arrive.',
            },
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/c8dd2d0c94541268594836675c17ed89.jpg',
                title: 'A Small Horizon',
                description: 'The farther the view, the less urgent the road feels.',
            },
            {
                src: 'picture/%E5%8D%B0%E5%B0%BC/ddf88d12073da56a7da1e2752613fc70.jpg',
                title: 'Volcanic Silence',
                description: 'Silence is not empty. It has color and weight.',
            },
        ],
    },
];

const featureSlides = [
    { ...collections[2].photos[0], region: 'Indonesia', aspect: 'wide' },
    { ...collections[0].photos[0], region: 'Chicago', aspect: 'portrait' },
    { ...collections[1].photos[0], region: 'Hunan', aspect: 'wide' },
];

const nav = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('[data-nav]')];
const sections = [...document.querySelectorAll('[data-section]')];
const scrollReadout = document.querySelector('.scroll-readout b');
const menuToggle = document.querySelector('.menu-toggle');
const navLinkContainer = document.querySelector('.nav-links');
const modal = document.querySelector('[data-modal]');
const modalImage = document.querySelector('[data-modal-image]');
const modalRegion = document.querySelector('[data-modal-region]');
const modalIndex = document.querySelector('[data-modal-index]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalDescription = document.querySelector('[data-modal-description]');

function renderCarousel() {
    const stage = document.querySelector('[data-carousel-stage]');
    const total = document.querySelector('[data-carousel-total]');
    total.textContent = String(featureSlides.length).padStart(2, '0');

    stage.innerHTML = featureSlides
        .map(
            (slide, index) => `
                <article class="carousel-slide${index === 0 ? ' is-current' : ''}" data-slide="${index}">
                    <div class="carousel-photo carousel-photo-${slide.aspect}">
                        <img src="${slide.src}" alt="${slide.title}" />
                    </div>
                    <div class="carousel-meta">
                        <p class="carousel-region">${slide.region}</p>
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                </article>
            `,
        )
        .join('');

    let activeSlide = 0;
    const slides = [...stage.querySelectorAll('[data-slide]')];
    const current = document.querySelector('[data-carousel-current]');

    function setSlide(nextIndex) {
        activeSlide = (nextIndex + slides.length) % slides.length;
        slides.forEach((slide, index) => slide.classList.toggle('is-current', index === activeSlide));
        current.textContent = String(activeSlide + 1).padStart(2, '0');
    }

    document.querySelector('[data-carousel="prev"]').addEventListener('click', () => setSlide(activeSlide - 1));
    document.querySelector('[data-carousel="next"]').addEventListener('click', () => setSlide(activeSlide + 1));
}

function renderRegions() {
    const list = document.querySelector('[data-region-list]');

    list.innerHTML = collections
        .map(
            (collection, collectionIndex) => `
                <section class="region-block" aria-labelledby="${collection.id}-title">
                    <div class="region-header">
                        <div>
                            <span class="region-number">${String(collectionIndex + 1).padStart(2, '0')}</span>
                            <h3 id="${collection.id}-title">${collection.localName}<span>${collection.name}</span></h3>
                        </div>
                        <p>${collection.note}<br /><span>${String(collection.photos.length).padStart(2, '0')} frames</span></p>
                    </div>
                    <div class="photo-grid ${collection.photos.length === 1 ? 'photo-grid-single' : ''}">
                        ${collection.photos
                            .map(
                                (photo, photoIndex) => `
                                    <button class="photo-card${photoIndex === 0 ? ' photo-card-featured' : ''}" type="button"
                                        data-photo="${collection.id}-${photoIndex}" aria-label="View ${photo.title}">
                                        <img src="${photo.src}" alt="${photo.title}" loading="${collectionIndex === 0 && photoIndex < 2 ? 'eager' : 'lazy'}" />
                                        <span class="photo-card-overlay">
                                            <span>${String(photoIndex + 1).padStart(2, '0')}</span>
                                            <b>${photo.title}</b>
                                            <i>View photo ↗</i>
                                        </span>
                                    </button>
                                `,
                            )
                            .join('')}
                    </div>
                </section>
            `,
        )
        .join('');

    list.querySelectorAll('[data-photo]').forEach((button) => {
        button.addEventListener('click', () => {
            const [collectionId, photoIndex] = button.dataset.photo.split('-');
            const collection = collections.find((item) => item.id === collectionId);
            openModal(collection, collection.photos[Number(photoIndex)], Number(photoIndex));
        });
    });
}

function openModal(collection, photo, photoIndex) {
    modalImage.src = photo.src;
    modalImage.alt = photo.title;
    modalRegion.textContent = collection.name;
    modalIndex.textContent = `${String(photoIndex + 1).padStart(2, '0')} / ${String(collection.photos.length).padStart(2, '0')}`;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('[data-modal-close]').focus();
}

function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function updateScrollState() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('is-compact', scrollTop > 48);
    scrollReadout.textContent = `${Math.round((scrollTop / Math.max(maxScroll, 1)) * 100)}`.padStart(2, '0');

    const marker = scrollTop + nav.offsetHeight + 30;
    const linkedSections = new Set(navLinks.map((link) => link.dataset.nav));
    let activeSection = sections[0].dataset.section;
    sections.forEach((section) => {
        if (linkedSections.has(section.dataset.section) && marker >= section.offsetTop) {
            activeSection = section.dataset.section;
        }
    });
    if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        activeSection = 'contact';
    }
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === activeSection));
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinkContainer.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function setupCopyButton() {
    const status = document.querySelector('[data-copy-status]');
    document.querySelectorAll('[data-copy]').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const value = event.currentTarget.dataset.copy;
            try {
                await navigator.clipboard.writeText(value);
                if (status) status.textContent = 'WeChat ID copied';
            } catch (error) {
                if (status) status.textContent = `WeChat ID: ${value}`;
            }
            window.setTimeout(() => {
                if (status) status.textContent = '';
            }, 2400);
        });
    });
}

document.querySelectorAll('[data-modal-close]').forEach((control) => control.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});
menuToggle.addEventListener('click', () => {
    const isOpen = navLinkContainer.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});
window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', updateScrollState);

renderCarousel();
renderRegions();
setupSmoothScroll();
setupCopyButton();
updateScrollState();
