# React Native Template

This repository provides a ready-to-use React Native template with Firebase and Google Maps integration. It is designed for users to learn how to compile the app and build an actual APK.

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/neonexxa/rn-template3.git
cd https://github.com/neonexxa/rn-template3.git
npm install
```

### 2. Set Up Firebase

To enable Firebase services, insert your own `google-services.json` file into the Android app directory:

```
/android/app/google-services.json
```

You can generate this file from the Firebase Console: [Firebase Console](https://console.firebase.google.com/).

### 3. Configure Google Maps API Key

Add your Google Maps API key in the `AndroidManifest.xml` file:

```
/android/app/src/main/AndroidManifest.xml
```

Locate the following line and replace `YOUR_API_KEY` with your actual key:

```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY" />
```

Obtain your API key from the Google Cloud Console: [Google Cloud Console](https://console.cloud.google.com/).

## Running the App on an Emulator or Device

Before building the APK, verify that your configurations are correct by running the app on an emulator or a physical device.

### 1. Start the Metro Bundler

```sh
npx react-native start
```

### 2. Run the App

Ensure that your device or emulator is connected and recognized using:

```sh
adb devices
```

Then, run the app:

```sh
npx react-native run-android
```

If the app launches successfully and Firebase & Google Maps work as expected, you can proceed to build the APK.

## Building the APK

Once all configurations are in place, you can proceed to build the APK.

### 1. Build the APK

```sh
cd android
./gradlew assembleRelease
```

The generated APK can be found in:
```
/android/app/build/outputs/apk/release/
```

## Additional Notes
- Make sure you have Java, Android SDK, and React Native CLI installed.
- The template is pre-configured with Firebase and Google Maps, so minimal setup is needed.
- Follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide for additional dependencies.

---

Now you're ready to explore and learn React Native development with this template! 🚀

