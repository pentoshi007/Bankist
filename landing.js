'use strict';

/////////////////////////////////////////////////
// BANKIST LANDING PAGE
/////////////////////////////////////////////////

// Data - Account Storage
let accounts = [];

// Landing Page Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Success Modal Elements
const successModal = document.querySelector('.success-modal');
const successOverlay = document.querySelector('.success-overlay');
const btnCloseSuccess = document.querySelector('.btn--close-success');
const btnLoginNow = document.querySelector('.btn--login-now');
const newUsernameSpan = document.querySelector('#newUsername');
const displayPinSpan = document.querySelector('#displayPin');

/////////////////////////////////////////////////
// FUNCTIONS

// Load accounts from JSON file
const loadAccounts = async function () {
    try {
        const storedAccounts = localStorage.getItem('bankistAccounts');
        if (storedAccounts) {
            accounts = JSON.parse(storedAccounts);
        } else {
            const response = await fetch('./accounts.json');
            if (response.ok) {
                accounts = await response.json();
            } else {
                accounts = [
                    {
                        owner: "Sadeesha Jayaweera",
                        movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
                        interestRate: 1.2,
                        pin: 1111,
                        movementsDates: [
                            "2019-11-18T21:31:17.178Z",
                            "2019-12-23T07:42:02.383Z",
                            "2020-01-28T09:15:04.904Z",
                            "2020-04-01T10:17:24.185Z",
                            "2020-05-08T14:11:59.604Z",
                            "2020-07-26T17:01:17.194Z",
                            "2020-07-28T23:36:17.929Z",
                            "2020-08-01T10:51:36.790Z",
                        ],
                        currency: "EUR",
                        locale: "pt-PT",
                        username: "sj"
                    },
                    {
                        owner: "Jessica Davis",
                        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
                        interestRate: 1.5,
                        pin: 2222,
                        movementsDates: [
                            "2019-11-01T13:15:33.035Z",
                            "2019-11-30T09:48:16.867Z",
                            "2019-12-25T06:04:23.907Z",
                            "2020-01-25T14:18:46.235Z",
                            "2020-02-05T16:33:06.386Z",
                            "2020-04-10T14:43:26.374Z",
                            "2020-06-25T18:49:59.371Z",
                            "2020-07-26T12:01:20.894Z",
                        ],
                        currency: "USD",
                        locale: "en-US",
                        username: "jd"
                    }
                ];
            }
        }
        createUsernames(accounts);
    } catch (error) {
        console.error('Error loading accounts:', error);
        accounts = [
            {
                owner: "Sadeesha Jayaweera",
                movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
                interestRate: 1.2,
                pin: 1111,
                movementsDates: [
                    "2019-11-18T21:31:17.178Z",
                    "2019-12-23T07:42:02.383Z",
                    "2020-01-28T09:15:04.904Z",
                    "2020-04-01T10:17:24.185Z",
                    "2020-05-08T14:11:59.604Z",
                    "2020-07-26T17:01:17.194Z",
                    "2020-07-28T23:36:17.929Z",
                    "2020-08-01T10:51:36.790Z",
                ],
                currency: "EUR",
                locale: "pt-PT",
                username: "sj"
            },
            {
                owner: "Jessica Davis",
                movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
                interestRate: 1.5,
                pin: 2222,
                movementsDates: [
                    "2019-11-01T13:15:33.035Z",
                    "2019-11-30T09:48:16.867Z",
                    "2019-12-25T06:04:23.907Z",
                    "2020-01-25T14:18:46.235Z",
                    "2020-02-05T16:33:06.386Z",
                    "2020-04-10T14:43:26.374Z",
                    "2020-06-25T18:49:59.371Z",
                    "2020-07-26T12:01:20.894Z",
                ],
                currency: "USD",
                locale: "en-US",
                username: "jd"
            }
        ];
        createUsernames(accounts);
    }
};

// Save accounts to localStorage
const saveAccounts = function () {
    localStorage.setItem('bankistAccounts', JSON.stringify(accounts));
    console.log('Accounts saved to localStorage:', accounts);
};

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        if (!acc.username) {
            acc.username = acc.owner
                .toLowerCase()
                .split(" ")
                .map((name) => name[0])
                .join("");
        }
    });
};

// Account Creation Function
const createAccount = function (firstName, lastName, email, phone, initialDeposit, pin) {
    const fullName = `${firstName} ${lastName}`;
    const username = (firstName.charAt(0) + lastName.charAt(0)).toLowerCase();

    let finalUsername = username;
    let counter = 1;
    while (accounts.find(acc => acc.username === finalUsername)) {
        finalUsername = username + counter;
        counter++;
    }

    const newAccount = {
        owner: fullName,
        movements: [initialDeposit],
        interestRate: 1.2,
        pin: parseInt(pin),
        movementsDates: [new Date().toISOString()],
        currency: "EUR",
        locale: "en-US",
        username: finalUsername,
        email: email,
        phone: phone
    };

    accounts.push(newAccount);
    saveAccounts();

    return newAccount;
};

/////////////////////////////////////////////////
// EVENT HANDLERS

// Initialize
document.addEventListener('DOMContentLoaded', async function () {
    await loadAccounts();
    initMobileNav();
});

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when clicking on a link
        navLinks.addEventListener('click', function (e) {
            if (e.target.classList.contains('nav__link')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Landing Page Modal
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Success Modal
const openSuccessModal = function () {
    successModal.classList.remove('hidden');
    successOverlay.classList.remove('hidden');
};

const closeSuccessModal = function () {
    successModal.classList.add('hidden');
    successOverlay.classList.add('hidden');
};

btnCloseSuccess.addEventListener('click', closeSuccessModal);
successOverlay.addEventListener('click', closeSuccessModal);

btnLoginNow.addEventListener('click', function () {
    closeSuccessModal();
    window.location.href = 'login.html';
});

// Account Creation Form
document.querySelector('.modal__form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const initialDeposit = parseFloat(document.querySelector('#initialDeposit').value);
    const pin = document.querySelector('#newPin').value;

    if (firstName && lastName && email && phone && initialDeposit >= 100 && pin.length === 4) {
        const newAccount = createAccount(firstName, lastName, email, phone, initialDeposit, pin);

        newUsernameSpan.textContent = newAccount.username;
        displayPinSpan.textContent = newAccount.pin;

        closeModal();
        openSuccessModal();

        this.reset();
    } else {
        alert('Please fill all fields correctly. Initial deposit must be at least €100 and PIN must be 4 digits.');
    }
});

// Landing Page Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Navigation links
document.querySelector('.nav__links').addEventListener('click', function (e) {
    if (e.target.classList.contains('nav__link')) {
        const href = e.target.getAttribute('href');

        // Only prevent default for internal anchor links
        if (href && href.startsWith('#') && href !== '#' && href.length > 1) {
            e.preventDefault();
            try {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.log('Invalid selector:', href);
            }
        }
        // For external links (like login.html), let the default behavior happen
    }
});

// Tabbed Component
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Menu Fade Animation
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();