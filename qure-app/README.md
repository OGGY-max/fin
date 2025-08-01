# Qure - Trust-Focused Verification App

**Verified by Real People. Trusted by Qure.**

Qure is a modern React Native app that connects buyers with trusted verification agents to authenticate products before purchase. The app features a clean, trust-focused design with a navy blue and orange color scheme.

## Features

### 🔐 Authentication Flow
- **Splash Screen**: Clean branding with the Qure logo and tagline
- **Login/Signup**: Email/password authentication with Google Sign-In option
- **Account Creation**: Seamless onboarding for new users

### 🏠 Home Screen (Buyer View)
- **Agent Discovery**: Browse nearby Qure agents with ratings and experience
- **Smart Search**: Search by location, product category, and agent specialties
- **Quick Booking**: Instant "Book Now" functionality for urgent verifications
- **Floating Action Button**: Easy access to request new verifications

### 📋 Verification Request
- **Product Details**: Title, description, and category selection
- **Photo Upload**: Camera and gallery integration for product images
- **Location Selection**: Choose your verification location
- **Agent Preference**: Optional agent selection for personalized service

### 👤 Agent Profiles
- **Detailed Information**: Experience, ratings, and completion statistics
- **Verification History**: Past work with thumbnails and status indicators
- **Trust Indicators**: Success rates and specialties
- **Direct Booking**: Request verification from specific agents

### 📄 Verification Reports
- **Comprehensive Results**: Detailed agent assessments with photos
- **Trust Badges**: Qure verification certificates
- **Status Tracking**: Verified, Rejected, or Pending states
- **Sharing Options**: Share reports or download as PDF

### 🧭 Bottom Navigation
- **Home** 🏠: Find and browse verification agents
- **My Requests** 📋: Track your verification requests with status filters
- **Agents** 👥: Comprehensive agent directory with search and filtering
- **Profile** 👤: User account management and app settings

## Design System

### Color Palette
- **Primary**: Navy Blue (#0A2D52) - Trust and professionalism
- **Accent**: Bright Orange (#F58025) - Action buttons and highlights
- **Background**: Light Gray (#F4F4F4) - Clean, modern backdrop
- **Supporting**: White, blacks, and grays for optimal contrast

### Typography
- Clean, readable fonts with proper hierarchy
- Bold headings for important information
- Consistent sizing and spacing throughout

### UI Components
- **Cards**: Elevated containers with subtle shadows
- **Buttons**: Orange accent buttons for primary actions
- **Chips**: Rounded filter and category selectors
- **Status Indicators**: Color-coded status with icons

## Technical Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation and routing

### Navigation Structure
- **Stack Navigator**: Main app navigation
- **Bottom Tabs**: Primary screen navigation
- **Modal Screens**: Detailed views and forms

### Key Dependencies
- `@react-navigation/native` - Navigation framework
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/stack` - Stack navigation
- `@expo/vector-icons` - Icon library
- `expo-image-picker` - Camera and gallery access
- `react-native-safe-area-context` - Safe area handling

## Project Structure

```
qure-app/
├── constants/
│   └── theme.ts          # Design system and theme configuration
├── types/
│   └── index.ts          # TypeScript type definitions
├── navigation/
│   └── MainNavigator.tsx # Bottom tab navigation
├── screens/
│   ├── SplashScreen.tsx
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── MyRequestsScreen.tsx
│   ├── AgentsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── AgentProfileScreen.tsx
│   ├── VerificationRequestScreen.tsx
│   └── VerificationReportScreen.tsx
└── App.tsx               # Main application component
```

## Getting Started

### Prerequisites
- Node.js (v16 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Clone and Install**
   ```bash
   cd qure-app
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Run on Device/Simulator**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` to open in web browser

### Development Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser

## Features in Detail

### Trust & Security
- **Verified Agents**: All agents go through Qure's verification process
- **Trust Scores**: User and agent rating systems
- **Secure Communications**: Protected messaging between users and agents
- **Report Authenticity**: Verification codes for each report

### User Experience
- **Intuitive Interface**: Clean, modern design focused on ease of use
- **Quick Actions**: Floating action buttons for common tasks
- **Smart Filtering**: Advanced search and filter options
- **Status Tracking**: Real-time updates on verification progress

### Agent Management
- **Profile System**: Comprehensive agent profiles with stats
- **Specialization Tags**: Category-based expertise indicators
- **Performance Metrics**: Success rates and completion statistics
- **Availability Status**: Real-time agent availability

## Future Enhancements

### Planned Features
- **Real-time Chat**: Direct messaging with agents
- **Video Verification**: Live video calls for product inspection
- **Payment Integration**: Secure payment processing
- **Push Notifications**: Real-time status updates
- **Advanced Analytics**: Detailed reporting and insights
- **Multi-language Support**: Localization for global users

### Technical Improvements
- **Offline Support**: Core functionality without internet
- **Performance Optimization**: Faster loading and smoother animations
- **Advanced Security**: Enhanced authentication and data protection
- **API Integration**: Backend service connectivity

## Contributing

This is a demonstration app showcasing modern React Native development practices with a focus on:
- Clean, maintainable code structure
- Consistent design system implementation
- Type-safe TypeScript usage
- Modern navigation patterns
- Responsive UI components

## License

This project is a demonstration app created for showcasing React Native development capabilities.

---

**Qure** - Building trust through verified connections.
*Verified by Real People. Trusted by Qure.*