# 🎟️ Folksical Ticket Scanner

A mobile app built with **React Native (Expo)** for scanning and validating event tickets via QR codes. Built with ❤️ for the **Folksical** community!

---

## 📲 Features

- Scan QR codes using your device's camera.
- Automatically sends scanned ticket data to a backend API.
- Displays response messages in a popup (success, already used, invalid, etc.).
- Custom branding with Folksical logo and UI.
- Built using **Expo** for easy development and deployment.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A physical or emulated device with camera access

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/Event-Ticket-Scanner.git
cd Event-Ticket-Scanner
npm install
npm start
expo start
```

```bash
npm install
npm start
expo start
```
Scan the QR code with the Expo Go app on your phone to test it.

🔐 API Integration
The app makes a POST request to:
```bash
https://api-folksical.hexcode.tk/checkin
```
with the payload:
```bash
{ "ticket_id": "scannedTicketValue" }
```
Headers include:

auth: folksical
Content-Type: application/x-www-form-urlencoded
The API response is parsed and displayed to the user via a popup.

🛠 Build APK
To build the Android APK using EAS (Expo Application Services):
```bash
eas build -p android --profile preview
```
Make sure you’re logged in with:
```bash
eas login
```
You can modify build profiles in eas.json.
📁 Project Structure
App.js: Main application logic and UI
assets/: Contains icons, logos, and splash screens
.gitignore: Properly ignores node_modules, build outputs, etc.
package.json: Lists dependencies like axios, expo-barcode-scanner

📦 Tech Stack
React Native
Expo
Axios
Expo Barcode Scanner
EAS Build

🧪 Future Improvements
Offline ticket scanning support
Admin dashboard for scanned entries
Sound/vibration feedback for scans

🧑‍💻 Developers
Shaun Dsilva / 1DCRYPTER1
Aston Lopes / 1Prototype1

Made in ❤️ for Folksical ✨
