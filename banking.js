'use strict';

/////////////////////////////////////////////////
// BANKIST BANKING APP
/////////////////////////////////////////////////

// Data - Account Storage
let accounts = [];
let currentAccount;

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

const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// FUNCTIONS

// Load accounts from localStorage
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
            alert('Session expired. Redirecting to home page.');
            window.location.href = 'index.html';
        }

        time--;
    };

    let time = 300; // 5 minutes
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};

/////////////////////////////////////////////////
// EVENT HANDLERS

let timer;

// Mobile Navigation for Banking Page
const initMobileNav = function () {
    const navToggle = document.getElementById('app-nav-toggle');
    const navMenu = document.getElementById('app-nav-menu');
    const appNav = document.querySelector('.app-nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile nav when clicking on menu item
        navMenu.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn--logout')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!appNav.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', async function () {
    await loadAccounts();
    initMobileNav();

    // Check if user is logged in
    const storedAccount = sessionStorage.getItem('currentAccount');
    if (!storedAccount) {
        alert('Please login first.');
        window.location.href = 'login.html';
        return;
    }

    const accountData = JSON.parse(storedAccount);
    currentAccount = accounts.find(acc => acc.username === accountData.username);

    if (!currentAccount) {
        alert('Account not found. Please login again.');
        window.location.href = 'login.html';
        return;
    }

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]
        }`;
    containerApp.style.opacity = 100;

    // Create current date and time
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

    // Start timer
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
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

        alert('Account closed successfully.');
        sessionStorage.removeItem('currentAccount');
        window.location.href = 'index.html';
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