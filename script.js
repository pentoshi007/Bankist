'use strict';

/////////////////////////////////////////////////
// BANKIST APP - FULL VERSION
/////////////////////////////////////////////////

// Data - Account Storage
let accounts = [];

// Page Elements
const landingPage = document.querySelector('#landing-page');
const loginPage = document.querySelector('#login-page');
const bankingApp = document.querySelector('#banking-app');

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
const loginLink = document.querySelector('#login-link');

// Login Page Elements
const btnBackToLanding = document.querySelector('.btn--back-to-landing');
const loginForm = document.querySelector('.login-form');

// Banking App Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnLogout = document.querySelector(".btn--logout");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

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
        // First try to load from localStorage (for new accounts)
        const storedAccounts = localStorage.getItem('bankistAccounts');
        if (storedAccounts) {
            const localAccounts = JSON.parse(storedAccounts);
            accounts = localAccounts;
        } else {
            // Load default accounts from JSON file
            const response = await fetch('./accounts.json');
            if (response.ok) {
                accounts = await response.json();
            } else {
                // Fallback data if JSON file can't be loaded
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
        // Use fallback data
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

// Save accounts to localStorage and update JSON file
const saveAccounts = function () {
    localStorage.setItem('bankistAccounts', JSON.stringify(accounts));

    // In a real application, you would send this data to a server
    // For demo purposes, we'll just log it
    console.log('Accounts saved to localStorage:', accounts);

    // Create downloadable JSON file
    const dataStr = JSON.stringify(accounts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    // You can uncomment the following lines to auto-download the updated JSON
    // const url = URL.createObjectURL(dataBlob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'accounts.json';
    // link.click();
    // URL.revokeObjectURL(url);
};

// Page Navigation Functions
const showLandingPage = function () {
    landingPage.classList.remove('hidden');
    loginPage.classList.add('hidden');
    bankingApp.classList.add('hidden');
};

const showLoginPage = function () {
    landingPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    bankingApp.classList.add('hidden');
};

const showBankingApp = function () {
    landingPage.classList.add('hidden');
    loginPage.classList.add('hidden');
    bankingApp.classList.remove('hidden');
};

// Utility Functions
const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value);
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

// Banking Functions
const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = "";

    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.locale);

        const formattedMov = formatCur(mov, acc.locale, acc.currency);

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
            } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const updateUI = function (acc) {
    displayMovements(acc);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        labelTimer.textContent = `${min}:${sec}`;

        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = "Log in to get started";
            containerApp.style.opacity = 0;
            showLandingPage();
        }

        time--;
    };

    let time = 300; // 5 minutes
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};

// Account Creation Function
const createAccount = function (firstName, lastName, email, phone, initialDeposit, pin) {
    const fullName = `${firstName} ${lastName}`;
    const username = (firstName.charAt(0) + lastName.charAt(0)).toLowerCase();

    // Check if username already exists
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
    showLandingPage();
});

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
    showLoginPage();
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

        // Show success modal
        newUsernameSpan.textContent = newAccount.username;
        displayPinSpan.textContent = newAccount.pin;

        closeModal();
        openSuccessModal();

        // Reset form
        this.reset();
    } else {
        alert('Please fill all fields correctly. Initial deposit must be at least €100 and PIN must be 4 digits.');
    }
});

// Navigation
loginLink.addEventListener('click', function (e) {
    e.preventDefault();
    showLoginPage();
});

btnBackToLanding.addEventListener('click', function () {
    showLandingPage();
});

btnLogout.addEventListener('click', function () {
    containerApp.style.opacity = 0;
    showLandingPage();
    if (timer) clearInterval(timer);
});

// Landing Page Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Fixed navigation links
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#' && href.length > 1) {
            try {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.log('Invalid selector:', href);
            }
        }
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

/////////////////////////////////////////////////
// BANKING APP FUNCTIONALITY

let currentAccount, timer;

// Login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === +inputLoginPin.value) {
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]
            }`;
        containerApp.style.opacity = 100;

        const now = new Date();
        const options = {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
        };

        labelDate.textContent = new Intl.DateTimeFormat(
            currentAccount.locale,
            options
        ).format(now);

        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        updateUI(currentAccount);
        showBankingApp();
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Transfer Money
btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = "";

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
        saveAccounts();

        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
    } else {
        alert('Invalid transfer. Please check the amount and recipient.');
    }
});

// Request Loan
btnLoan.addEventListener("click", function (e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        setTimeout(function () {
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());

            updateUI(currentAccount);
            saveAccounts();

            if (timer) clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);
    } else {
        alert('Loan request denied. You need a deposit of at least 10% of the loan amount.');
    }
    inputLoanAmount.value = "";
});

// Close Account
btnClose.addEventListener("click", function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        +inputClosePin.value === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );

        accounts.splice(index, 1);
        saveAccounts();

        containerApp.style.opacity = 0;
        showLandingPage();
    } else {
        alert('Invalid credentials for account closure.');
    }

    inputCloseUsername.value = inputClosePin.value = "";
});

// Sort Movements
let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});