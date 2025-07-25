'use strict';

/////////////////////////////////////////////////
// BANKIST LOGIN PAGE
/////////////////////////////////////////////////

// Data - Account Storage
let accounts = [];

// Login Page Elements
const loginForm = document.querySelector('.login-form');
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");

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

/////////////////////////////////////////////////
// EVENT HANDLERS

// Initialize
document.addEventListener('DOMContentLoaded', async function () {
    await loadAccounts();
    initMobileNav();
});

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('login-nav-toggle');
    const navMenu = document.getElementById('login-nav-menu');
    const loginNav = document.querySelector('.login-nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile nav when clicking on menu item
        navMenu.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn--back-to-landing')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!loginNav.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === +inputLoginPin.value) {
        // Store current account in sessionStorage for banking page
        sessionStorage.setItem('currentAccount', JSON.stringify(currentAccount));

        // Redirect to banking page
        window.location.href = 'banking.html';
    } else {
        alert('Invalid credentials. Please try again.');
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();
    }
});

// Handle create account link
document.querySelector('.create-account-link').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'index.html#open-account';
});