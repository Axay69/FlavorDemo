# FlavourDemo - React Native App with Build Flavors

This project demonstrates how to implement **build flavors** (product flavors) in React Native for both Android and iOS. Flavors allow you to build different variants of your app from the same codebase.

## 🎯 What are Flavors?

Flavors let you create multiple versions of your app:
- **lite** → Free version with ads, basic features
- **full** → Premium version, no ads, all features

Both flavors can be installed simultaneously because they have different application IDs.

---

## 📁 Project Structure

```
FlavourDemo/
├── src/
│   ├── config/
│   │   ├── flavor.ts          # Flavor configuration (uses react-native-config)
│   │   ├── features.ts        # Feature flags
│   │   ├── api.ts             # API configuration
│   │   └── theme.ts           # Theme configuration
│   └── components/
│       ├── VideoEditor.tsx    # Full flavor only
│       ├── AdBanner.tsx       # Lite flavor only
│       └── FeatureCard.tsx    # Feature display
├── android/                   # Android-specific files
├── ios/                       # iOS-specific files
├── .env.lite                  # Lite flavor environment variables
├── .env.full                  # Full flavor environment variables
└── .env                       # Active environment (copied by build scripts)
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20
- React Native development environment
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

```bash
# Install dependencies
npm install

# iOS: Install CocoaPods
cd ios
bundle install
bundle exec pod install
cd ..
```

---

## 🤖 Android Setup

### What We Implemented

1. **Product Flavors** (`android/app/build.gradle`)
   - `lite` - Application ID: `com.flavourdemo.lite`
   - `full` - Application ID: `com.flavourdemo`

2. **Native Module** (`FlavorModule.kt`)
   - Exposes flavor to JavaScript via `BuildConfig.APP_FLAVOR`

3. **Flavor-Specific Resources**
   - `android/app/src/lite/res/` - Lite resources
   - `android/app/src/full/res/` - Full resources

### How to Run Android Flavors

#### Method 1: Using NPM Scripts (Easiest)

```bash
# Run Lite flavor
npm run android:lite

# Run Full flavor
npm run android:full

# Build APK only
npm run android:build:lite
npm run android:build:full
```

#### Method 2: Using Android Studio

1. **Open project in Android Studio:**
   ```bash
   # Open the android folder
   open android
   ```

2. **Open Build Variants window:**
   - **View** → **Tool Windows** → **Build Variants**
   - Or click **Build Variants** tab at bottom-left

3. **Select variant:**
   - Find `app` module
   - Click dropdown next to "Active Build Variant"
   - Choose:
     - `liteDebug` - Lite flavor, Debug build
     - `liteRelease` - Lite flavor, Release build
     - `fullDebug` - Full flavor, Debug build
     - `fullRelease` - Full flavor, Release build

4. **Run:**
   - Click **Run** button (green play icon) or press `Shift + F10`

#### Method 3: Using Gradle Directly

```bash
cd android

# Install on connected device
./gradlew installLiteDebug
./gradlew installFullDebug

# Build APK only
./gradlew assembleLiteDebug
./gradlew assembleFullDebug
```

#### Method 4: Specify Device/Emulator

```bash
# Install on specific emulator
ANDROID_SERIAL=emulator-5554 ./gradlew installLiteDebug

# Install on physical device
ANDROID_SERIAL=192.168.29.248:5555 ./gradlew installLiteDebug
```

#### Method 5: Using React Native CLI

```bash
npx react-native run-android --mode=liteDebug
npx react-native run-android --mode=fullDebug
```

### Android Configuration Details

**File:** `android/app/build.gradle`

```gradle
productFlavors {
    lite {
        dimension "app"
        applicationIdSuffix ".lite"
        resValue "string", "app_name", "FlavourDemo Lite"
        buildConfigField "String", "APP_FLAVOR", "\"lite\""
    }
    
    full {
        dimension "app"
        resValue "string", "app_name", "FlavourDemo"
        buildConfigField "String", "APP_FLAVOR", "\"full\""
    }
}
```

### Android Troubleshooting

**Build Variants Not Showing:**
1. **Sync Gradle:** `File` → `Sync Project with Gradle Files`
2. **Invalidate Caches:** `File` → `Invalidate Caches...` → `Invalidate and Restart`
3. **Check build.gradle:** Ensure `flavorDimensions` and `productFlavors` are defined

**Flavor Not Detected:**
1. Check `FlavorModule` is registered in `MainApplication.kt`
2. Verify `BuildConfig.APP_FLAVOR` is set in `build.gradle`
3. Clean build: `cd android && ./gradlew clean`

---

## 🍎 iOS Setup

### What We Implemented

1. **react-native-config** Integration
   - Uses `.env.lite` and `.env.full` files
   - Pre-action scripts copy correct `.env` file before build

2. **Build Configurations**
   - `Debug-Lite`, `Debug-Full`
   - `Release-Lite`, `Release-Full`

3. **Schemes**
   - `FlavourDemo-Lite` - Uses Lite configurations
   - `FlavourDemo-Full` - Uses Full configurations

### How to Run iOS Flavors

#### Method 1: Using NPM Scripts (Easiest)

```bash
# Run Lite flavor
npm run ios:lite

# Run Full flavor
npm run ios:full
```

#### Method 2: Using Xcode

1. **Open project:**
   ```bash
   cd ios
   open FlavourDemo.xcworkspace
   ```

2. **Select scheme:**
   - Top-left dropdown: Select **FlavourDemo-Lite** or **FlavourDemo-Full**

3. **Run:**
   - Click **Run** button or press `Cmd + R`

#### Method 3: Using React Native CLI

```bash
npx react-native run-ios --scheme FlavourDemo-Lite
npx react-native run-ios --scheme FlavourDemo-Full
```

### iOS Setup Steps (One-Time Configuration)

#### Step 1: Install Pods

```bash
cd ios
bundle exec pod install
cd ..
```

#### Step 2: Create Build Configurations

1. **Open Xcode:**
   ```bash
   cd ios
   open FlavourDemo.xcworkspace
   ```

2. **Create configurations:**
   - Click **FlavourDemo** project (blue icon)
   - Select **FlavourDemo** project (not target)
   - **Info** tab
   - Under **Configurations**, click **+**
   - **Duplicate "Debug" Configuration** → Name: `Debug-Lite`
   - **Duplicate "Debug" Configuration** → Name: `Debug-Full`
   - **Duplicate "Release" Configuration** → Name: `Release-Lite`
   - **Duplicate "Release" Configuration** → Name: `Release-Full`

   **You should have 6 configurations total.**

#### Step 3: Create Schemes

1. **Product** → **Scheme** → **Manage Schemes...**
2. **Duplicate** FlavourDemo → Name: `FlavourDemo-Lite`
3. **Duplicate** FlavourDemo → Name: `FlavourDemo-Full`
4. ✅ Check **Shared** for both

#### Step 4: Add Pre-Action Scripts

**For FlavourDemo-Lite Scheme:**

1. **Product** → **Scheme** → **Edit Scheme**
2. Select **Build** (left sidebar)
3. Click **+** under **Pre-actions**
4. Select **New Run Script Action**
5. Paste this script:
   ```bash
   cd "${SRCROOT}/.." && cp .env.lite .env && echo "✅ Copied .env.lite to .env"
   ```
6. ✅ **CRITICAL:** Check **"Provide build settings from"** → Select **FlavourDemo**
7. Select **Run** → Build Configuration: `Debug-Lite`
8. Select **Archive** → Build Configuration: `Release-Lite`
9. Click **Close**

**For FlavourDemo-Full Scheme:**

1. **Product** → **Scheme** → **Edit Scheme**
2. Select **Build** (left sidebar)
3. Click **+** under **Pre-actions**
4. Select **New Run Script Action**
5. Paste this script:
   ```bash
   cd "${SRCROOT}/.." && cp .env.full .env && echo "✅ Copied .env.full to .env"
   ```
6. ✅ **CRITICAL:** Check **"Provide build settings from"** → Select **FlavourDemo**
7. Select **Run** → Build Configuration: `Debug-Full`
8. Select **Archive** → Build Configuration: `Release-Full`
9. Click **Close**

### iOS Configuration Details

**Podfile** (`ios/Podfile`):
```ruby
# Map build configurations
project 'FlavourDemo',
  'Debug' => :debug,
  'Release' => :release,
  'Debug-Lite' => :debug,
  'Release-Lite' => :release,
  'Debug-Full' => :debug,
  'Release-Full' => :release

target 'FlavourDemo' do
  # React Native Config
  pod 'react-native-config/Extension', :path => '../node_modules/react-native-config'
end
```

**Environment Files:**
- `.env.lite` - Lite flavor variables
- `.env.full` - Full flavor variables
- `.env` - Active file (copied by pre-action scripts)

### iOS Troubleshooting

**Pre-Action Script Error:**
- Error: `cp: /../.env.full: No such file or directory`
- **Fix:** Ensure **"Provide build settings from"** is set to **FlavourDemo** in the script settings
- Use `${SRCROOT}` instead of `${PROJECT_DIR}`

**Config Values Not Loading:**
1. Check `.env` file exists in project root after build
2. Verify pre-action script copied correct file
3. Check scheme is using correct build configuration
4. Clean build folder and rebuild

**Module Not Found:**
1. Run `bundle exec pod install` in ios folder
2. Clean build folder: `Product` → `Clean Build Folder`
3. Rebuild: `Product` → `Build`

---

## 📦 Available Variants

| Platform | Variant | App ID | App Name | Command |
|----------|---------|--------|----------|---------|
| **Android** | `liteDebug` | `com.flavourdemo.lite` | FlavourDemo Lite | `npm run android:lite` |
| **Android** | `fullDebug` | `com.flavourdemo` | FlavourDemo | `npm run android:full` |
| **iOS** | `Debug-Lite` | `org.reactjs.native.example.FlavourDemo` | FlavourDemo Lite | `npm run ios:lite` |
| **iOS** | `Debug-Full` | `org.reactjs.native.example.FlavourDemo` | FlavourDemo | `npm run ios:full` |

---

## 🔍 Verification

### Check Flavor in App

After running, check console logs:

**Lite:**
```
[Config] APP_FLAVOR: lite
[Config] APP_NAME: FlavourDemo Lite
```

**Full:**
```
[Config] APP_FLAVOR: full
[Config] APP_NAME: FlavourDemo
```

### Check App Name

- **Android Lite:** Shows "FlavourDemo Lite" on device
- **Android Full:** Shows "FlavourDemo" on device
- **iOS:** Check app name in home screen

### Check Application ID

- **Android Lite:** `com.flavourdemo.lite`
- **Android Full:** `com.flavourdemo`
- **iOS:** Both use same bundle ID (can be changed per scheme if needed)

---

## 📝 NPM Scripts Reference

### Android Scripts

```bash
npm run android              # Run default Android build
npm run android:lite        # Install and run lite debug variant
npm run android:full        # Install and run full debug variant
npm run android:lite:release   # Install lite release variant
npm run android:full:release   # Install full release variant
npm run android:build:lite  # Build lite APK only
npm run android:build:full  # Build full APK only
```

### iOS Scripts

```bash
npm run ios                 # Run default iOS build
npm run ios:lite            # Run lite flavor
npm run ios:full            # Run full flavor
```

---

## 🎛 Feature Flags

Feature flags are managed in `src/config/features.ts`:

```typescript
import { FEATURES, isFeatureEnabled } from './src/config/features';

// Check if feature is enabled
if (isFeatureEnabled('videoEditor')) {
  // Load video editor
}
```

Available features:
- `videoEditor` - Only in full flavor
- `ads` - Only in lite flavor
- `analytics` - Available in all flavors
- `premiumFeatures` - Only in full flavor

---

## 🔧 Configuration Files

### Environment Variables

**`.env.lite`:**
```
APP_FLAVOR=lite
APP_NAME=FlavourDemo Lite
API_BASE_URL=https://api-lite.example.com/v1
ENABLE_ADS=true
ENABLE_VIDEO_EDITOR=false
```

**`.env.full`:**
```
APP_FLAVOR=full
APP_NAME=FlavourDemo
API_BASE_URL=https://api-full.example.com/v1
ENABLE_ADS=false
ENABLE_VIDEO_EDITOR=true
```

### Android Build Config

**`android/app/build.gradle`:**
- Defines product flavors
- Sets `BuildConfig.APP_FLAVOR`
- Configures application IDs and app names

### iOS Podfile

**`ios/Podfile`:**
- Maps build configurations
- Includes `react-native-config/Extension`

---

## 🐛 Common Issues

### Android

**Build Variants Not Showing:**
- Sync Gradle files
- Invalidate caches
- Check `flavorDimensions` is defined

**Both Flavors Show Same Value:**
- Check `BuildConfig.APP_FLAVOR` is set correctly
- Verify flavor is selected in Build Variants

### iOS

**Pre-Action Script Fails:**
- Ensure "Provide build settings from" is set to **FlavourDemo**
- Use `${SRCROOT}` in script path
- Check `.env.lite` and `.env.full` files exist

**Wrong Flavor Value:**
- Check which scheme is selected
- Verify pre-action script copied correct `.env` file
- Check build configuration matches scheme

**Config Values Not Loading:**
- Run `pod install` after changes
- Clean build folder
- Verify `.env` file exists after build

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev)
- [Android Product Flavors](https://developer.android.com/studio/build/build-variants)
- [react-native-config](https://github.com/lugg/react-native-config)
- [iOS Build Configurations](https://developer.apple.com/documentation/xcode/adding-a-build-configuration-file-to-your-project)

---

## 🎯 Quick Reference

### Android Commands

| Action | Command |
|--------|---------|
| Run Lite | `npm run android:lite` |
| Run Full | `npm run android:full` |
| Build Variants | View → Build Variants in Android Studio |
| Gradle Install | `cd android && ./gradlew installLiteDebug` |
| Specific Device | `ANDROID_SERIAL=emulator-5554 ./gradlew installLiteDebug` |

### iOS Commands

| Action | Command |
|--------|---------|
| Run Lite | `npm run ios:lite` |
| Run Full | `npm run ios:full` |
| Select Scheme | Dropdown in Xcode (top-left) |
| Edit Scheme | Product → Scheme → Edit Scheme |
| Install Pods | `cd ios && bundle exec pod install` |

---

**Built with React Native 0.81.4**
