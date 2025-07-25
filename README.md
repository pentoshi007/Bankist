# Bankist-Full - Complete Banking Application

A comprehensive banking application that combines a beautiful landing page with full banking functionality, built with pure HTML, CSS, and JavaScript.

## 🚀 Features

### Landing Page
- Beautiful hero section with minimalist design
- Features showcase with real content
- Operations tabs (Transfers, Loans, Account Closing)
- Customer testimonials slider
- Fully responsive design
- Smooth scrolling and animations

### Account Management
- Account creation with form validation
- Automatic username generation
- PIN-based authentication
- Account data persistence

### Banking Features
- Real-time balance calculation
- Transaction history with dates
- Money transfers between accounts
- Loan requests with approval logic
- Account closure functionality
- Transaction sorting
- Auto-logout timer (5 minutes)
- Currency and date formatting

### Data Storage
- **accounts.json**: Default account data
- **localStorage**: New accounts and updates
- **PHP script**: Optional server-side saving

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px and above
- **Tablet**: 900px - 1200px
- **Mobile**: 600px and below

## 🔧 Setup Instructions

### Basic Setup (Client-side only)
1. Open `index.html` in a web browser
2. The app will load default accounts from `accounts.json`
3. New accounts are saved to localStorage

### Advanced Setup (with PHP backend)
1. Place files in a web server directory (XAMPP, WAMP, etc.)
2. Access via `http://localhost/Bankist-full/`
3. New accounts will be saved to `accounts.json` file

## 👤 Demo Accounts

- **Username:** sj | **PIN:** 1111 (Sadeesha Jayaweera)
- **Username:** jd | **PIN:** 2222 (Jessica Davis)

## 🎯 How to Use

### Creating a New Account
1. Click "Open account" on the landing page
2. Fill in all required fields
3. Set initial deposit (minimum €100)
4. Create a 4-digit PIN
5. Your username will be generated automatically

### Logging In
1. Click "Login" in the navigation
2. Enter your username and PIN
3. Access your banking dashboard

### Banking Operations
- **Transfer Money**: Enter recipient username and amount
- **Request Loan**: Must have deposit ≥ 10% of loan amount
- **Close Account**: Confirm with username and PIN
- **Sort Transactions**: Click the sort button

## 📁 File Structure

```
Bankist-full/
├── index.html          # Main HTML file
├── style.css           # Responsive CSS styles
├── script.js           # JavaScript functionality
├── accounts.json       # Default account data
├── save-accounts.php   # Optional PHP backend
├── img/               # Images and assets
├── logo.png           # Bank logo
├── icon.png           # Favicon
└── README.md          # This file
```

## 🔒 Security Features

- PIN-based authentication
- Session timeout (5 minutes)
- Input validation
- XSS protection
- Secure data handling

## 🌟 Technical Highlights

- **Pure JavaScript**: No frameworks or libraries
- **Modern ES6+**: Arrow functions, async/await, destructuring
- **Responsive CSS**: Mobile-first approach
- **Intersection Observer**: For animations and lazy loading
- **Local Storage**: Client-side data persistence
- **JSON handling**: File-based data storage
- **Error handling**: Graceful fallbacks

## 🚀 Future Enhancements

- Real backend integration
- Database storage
- Email notifications
- Two-factor authentication
- Transaction categories
- Spending analytics
- Mobile app version

## 🐛 Troubleshooting

### Common Issues

1. **Login not working**: Check console for errors, ensure accounts.json is accessible
2. **Scrolling issues**: Clear browser cache and reload
3. **Responsive issues**: Test in different browsers
4. **Data not saving**: Check localStorage permissions

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 License

This project is for educational purposes. Feel free to use and modify as needed.

## 👨‍💻 Developer

Created by Aniket Pandey - A comprehensive banking solution for learning modern web development.