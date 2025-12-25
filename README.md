# FlavourDemo - React Native App with Build Flavors

This project demonstrates how to implement **build flavors** (product flavors) in React Native for both Android and iOS. Flavors allow you to build different variants of your app from the same codebase.

## 🎯 What are Flavors?

Flavors let you create multiple versions of your app:
- **lite** → Free version with ads, basic features
- **full** → Premium version, no ads, all features

Both flavors can be installed simultaneously because they have different application IDs.

---

## 📁 What We Implemented

### JavaScript Side

#### 1. Flavor Configuration (`src/config/flavor.ts`)
- Reads flavor from native module via `global.__APP_FLAVOR__`
- Provides type-safe flavor constants
- Exposes `getAppFlavor()` function

#### 2. Feature Flags (`src/config/features.ts`)
- Central feature map based on flavor
- `FEATURES.videoEditor` - Only in full flavor
- `FEATURES.ads` - Only in lite flavor
- `FEATURES.analytics` - Available in all flavors

#### 3. API Configuration (`src/config/api.ts`)
- Different API endpoints per flavor
- Different API keys and timeouts
- Flavor-specific logging settings

#### 4. Theme Configuration (`src/config/theme.ts`)
- Different color schemes per flavor
- Lite: Green theme (simple, friendly)
- Full: Blue theme (premium, professional)

#### 5. Bootstrap (`index.js`)
- Injects flavor from native module into global scope
- Must run before any imports that use `APP_FLAVOR`

#### 6. Feature Components
- `VideoEditor.tsx` - Only available in full flavor
- `AdBanner.tsx` - Only available in lite flavor
- `FeatureCard.tsx` - Shows available features

---

### Android Side

#### 1. Product Flavors (`android/app/build.gradle`)
```gradle
productFlavors {
    lite {
        dimension "app"
        applicationIdSuffix ".lite"
        resValue "string", "app_name", "FlavourDemo Lite"
        buildConfigField "String", "APP_FLAVOR", "\"lite\""
        buildConfigField "String", "API_BASE_URL", "\"https://api-lite.example.com/v1\""
        buildConfigField "boolean", "FEATURE_VIDEO_EDITOR", "false"
        buildConfigField "boolean", "FEATURE_ADS", "true"
    }
    
    full {
        dimension "app"
        resValue "string", "app_name", "FlavourDemo"
        buildConfigField "String", "APP_FLAVOR", "\"full\""
        buildConfigField "String", "API_BASE_URL", "\"https://api-full.example.com/v1\""
        buildConfigField "boolean", "FEATURE_VIDEO_EDITOR", "true"
        buildConfigField "boolean", "FEATURE_ADS", "false"
    }
}
```

#### 2. Native Module (`FlavorModule.kt`)
- Exposes flavor to JavaScript via `BuildConfig.APP_FLAVOR`
- Registered in `FlavorPackage.kt`
- Added to `MainApplication.kt`

#### 3. Flavor-Specific Resources
- **Lite:** `android/app/src/lite/res/values/colors.xml` and `strings.xml`
- **Full:** `android/app/src/full/res/values/colors.xml` and `strings.xml`
- Each flavor can have different colors, strings, and even app icons

#### 4. Debuggable Variants (`android/app/build.gradle`)
```gradle
react {
    debuggableVariants = ["liteDebug", "fullDebug"]
}
```

---

### iOS Side

#### 1. Native Module
- `FlavorModule.swift` - Swift module to read flavor from Info.plist
- `FlavorModule.m` - Objective-C bridge for React Native
- Uses `RCT_EXTERN_MODULE` for automatic registration

#### 2. Info.plist
- Contains `APP_FLAVOR` key with flavor value
- Different values per build configuration (set via Build Settings)

#### 3. Build Configurations & Schemes
- Create separate build configurations (Debug-Lite, Debug-Full, Release-Lite, Release-Full)
- Create separate schemes (FlavourDemo-Lite, FlavourDemo-Full)
- Each scheme uses its own build configuration
- Set `APP_FLAVOR` value per configuration via User-Defined Settings

**📖 Detailed iOS setup: See [ios/IOS_FLAVOR_SETUP.md](./ios/IOS_FLAVOR_SETUP.md)**

---

## 🚀 How to Run Different Variants

### Method 1: Using NPM Scripts (JavaScript/Node)

```bash
# Install and run lite debug variant
npm run android:lite

# Install and run full debug variant
npm run android:full

# Build APK only (without installing)
npm run android:build:lite
npm run android:build:full
```

**Available scripts in `package.json`:**
- `npm run android:lite` - Installs lite debug variant
- `npm run android:full` - Installs full debug variant
- `npm run android:lite:release` - Installs lite release variant
- `npm run android:full:release` - Installs full release variant

---

### Method 2: Using Android Studio

1. **Open project in Android Studio**
   ```bash
   # Open the android folder
   open android
   ```

2. **Open Build Variants window**
   - Go to: **View** → **Tool Windows** → **Build Variants**
   - Or click the **Build Variants** tab at the bottom-left

3. **Select variant**
   - Find the `app` module
   - Click dropdown next to "Active Build Variant"
   - Choose:
     - `liteDebug` - Lite flavor, Debug build
     - `liteRelease` - Lite flavor, Release build
     - `fullDebug` - Full flavor, Debug build
     - `fullRelease` - Full flavor, Release build

4. **Run**
   - Click **Run** button (green play icon) or press `Shift + F10`

---

### Method 3: Using Gradle Directly (Command Line)

#### Basic Commands
```bash
cd android

# Install variants (builds and installs on connected device)
./gradlew installLiteDebug
./gradlew installFullDebug
./gradlew installLiteRelease
./gradlew installFullRelease

# Build APK only (without installing)
./gradlew assembleLiteDebug
./gradlew assembleFullDebug
./gradlew assembleLiteRelease
./gradlew assembleFullRelease
```

#### Specify Device/Emulator
```bash
# Install on specific emulator
ANDROID_SERIAL=emulator-5554 ./gradlew installLiteDebug

# Install on physical device (via ADB)
ANDROID_SERIAL=192.168.29.248:5555 ./gradlew installLiteDebug

# Or use -Pandroid.injected.testOnly=false flag
./gradlew installLiteDebug -Pandroid.injected.testOnly=false
```

#### From Project Root
```bash
# From project root directory
cd android && ./gradlew installLiteDebug && cd ..
```

---

### Method 4: Using React Native CLI

```bash
# Run with specific variant
npx react-native run-android --mode=liteDebug
npx react-native run-android --mode=fullDebug

# Or using the mode flag
npx react-native run-android --mode=liteDebug
npx react-native run-android --mode=fullDebug
```

**Note:** The `--mode` flag specifies the build variant (flavor + buildType).

---

### Method 5: iOS

#### Using React Native CLI
```bash
# Build Lite flavor
npx react-native run-ios --scheme FlavourDemo-Lite

# Build Full flavor
npx react-native run-ios --scheme FlavourDemo-Full
```

#### Using NPM Scripts
```bash
npm run ios:lite
npm run ios:full
```

#### Using Xcode
1. Open `ios/FlavourDemo.xcworkspace` in Xcode
2. Select scheme from dropdown (top-left): **FlavourDemo-Lite** or **FlavourDemo-Full**
3. Click **Run** (or press `Cmd + R`)

**📖 Complete iOS setup instructions: See [ios/IOS_FLAVOR_SETUP.md](./ios/IOS_FLAVOR_SETUP.md)**

---

## 📦 Project Structure

```
FlavourDemo/
├── src/
│   ├── config/
│   │   ├── flavor.ts          # Flavor constant
│   │   ├── features.ts        # Feature flags
│   │   ├── api.ts             # API configuration
│   │   └── theme.ts           # Theme configuration
│   ├── components/
│   │   ├── VideoEditor.tsx    # Full flavor only
│   │   ├── AdBanner.tsx       # Lite flavor only
│   │   └── FeatureCard.tsx    # Feature display
│   └── types/
│       └── global.d.ts       # TypeScript declarations
├── android/
│   └── app/
│       ├── build.gradle       # Product flavors definition
│       ├── src/
│       │   ├── main/          # Common resources
│       │   ├── lite/          # Lite flavor resources
│       │   └── full/          # Full flavor resources
│       └── src/main/java/com/flavourdemo/
│           ├── FlavorModule.kt
│           └── FlavorPackage.kt
├── ios/
│   └── FlavourDemo/
│       ├── FlavorModule.swift
│       ├── FlavorModule.m
│       └── Info.plist
└── index.js                    # Bootstrap flavor injection
```

---

## 🔍 Verify Flavors

### Check App Name
- **Lite:** Shows "FlavourDemo Lite" on device
- **Full:** Shows "FlavourDemo" on device

### Check Application ID
- **Lite:** `com.flavourdemo.lite`
- **Full:** `com.flavourdemo`

### Check in App
- Open the app and look at the header
- Lite shows green theme with "LITE" badge
- Full shows blue theme with "FULL" badge
- Different features are available per flavor

---

## 🛠 Troubleshooting

### Android: Build Variants Not Showing
1. **Sync Gradle:** `File` → `Sync Project with Gradle Files`
2. **Invalidate Caches:** `File` → `Invalidate Caches...` → `Invalidate and Restart`
3. **Check build.gradle:** Ensure `flavorDimensions` and `productFlavors` are defined

### Android: Flavor Not Detected
1. Check `index.js` - flavor should be set before imports
2. Verify `FlavorModule` is registered in `MainApplication.kt`
3. Check `BuildConfig.APP_FLAVOR` is set in `build.gradle`

### iOS: FlavorModule Not Found ⚠️
**Error:** `WARN FlavorModule not found. APP_FLAVOR will be undefined.`

**Quick Fix:**
1. Open `ios/FlavourDemo.xcworkspace` in Xcode
2. Right-click **FlavourDemo** folder → **Add Files to 'FlavourDemo'...**
3. Select `FlavorModule.swift` and `FlavorModule.m`
4. Ensure **Add to targets: FlavourDemo** is checked
5. Verify in **Build Phases** → **Compile Sources** (both files listed)
6. Clean build folder (`Shift + Cmd + K`) and rebuild

**📖 Detailed fix:** See [QUICK_FIX_iOS.md](./QUICK_FIX_iOS.md)

### React Native CLI Mode Flag Not Working
- Use `--mode` flag: `npx react-native run-android --mode=liteDebug`
- Or use Gradle directly: `cd android && ./gradlew installLiteDebug`

---

## 📝 Quick Reference

| Method | Command |
|--------|---------|
| **NPM Script** | `npm run android:lite` |
| **Android Studio** | View → Build Variants → Select variant → Run |
| **Gradle** | `./gradlew installLiteDebug` |
| **Gradle (specific device)** | `ANDROID_SERIAL=emulator-5554 ./gradlew installLiteDebug` |
| **React Native CLI** | `npx react-native run-android --mode=liteDebug` |

---

## 🎯 Available Variants

| Variant | App ID | App Name | Features |
|---------|--------|----------|----------|
| `liteDebug` | `com.flavourdemo.lite` | FlavourDemo Lite | Ads, Basic features |
| `liteRelease` | `com.flavourdemo.lite` | FlavourDemo Lite | Ads, Basic features (optimized) |
| `fullDebug` | `com.flavourdemo` | FlavourDemo | Video Editor, All features |
| `fullRelease` | `com.flavourdemo` | FlavourDemo | Video Editor, All features (optimized) |

---

## 📚 Additional Notes

- Both flavors can be installed simultaneously (different app IDs)
- Flavor-specific resources are in `android/app/src/{flavor}/res/`
- Build config fields are accessible via `BuildConfig` in native code
- Feature flags are centralized in `src/config/features.ts`
- API configuration is flavor-specific in `src/config/api.ts`

---

**Built with React Native 0.81.4**
