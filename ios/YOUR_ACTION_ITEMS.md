# ✅ Your Action Items - React Native Config Setup

## 🚨 CRITICAL: Run These Commands First

```bash
# 1. Install pods (REQUIRED)
cd ios
bundle exec pod install
cd ..
```

## 📋 Then Do These Steps in Xcode

### Step 1: Create Build Configurations

1. Open Xcode:
   ```bash
   cd ios
   open FlavourDemo.xcworkspace
   ```

2. Create 4 new configurations:
   - Project → Info → Configurations
   - Duplicate Debug → `Debug-Lite`
   - Duplicate Debug → `Debug-Full`
   - Duplicate Release → `Release-Lite`
   - Duplicate Release → `Release-Full`

### Step 2: Create Schemes

1. Product → Scheme → Manage Schemes
2. Duplicate FlavourDemo → `FlavourDemo-Lite`
3. Duplicate FlavourDemo → `FlavourDemo-Full`
4. ✅ Check "Shared" for both

### Step 3: Add Pre-Action Scripts

#### For FlavourDemo-Lite Scheme:

1. Product → Scheme → Edit Scheme
2. Select **Build** (left sidebar)
3. Click **+** under **Pre-actions**
4. Select **New Run Script Action**
5. Paste this script:
   ```bash
   cd "${SRCROOT}/.." && cp .env.lite .env && echo "✅ Copied .env.lite to .env"
   ```
6. ✅ **CRITICAL:** Check **"Provide build settings from"** → Select **FlavourDemo**
7. Select **Run** (left sidebar) → Build Configuration: `Debug-Lite`
8. Select **Archive** (left sidebar) → Build Configuration: `Release-Lite`
9. Click **Close**

#### For FlavourDemo-Full Scheme:

1. Product → Scheme → Edit Scheme
2. Select **Build** (left sidebar)
3. Click **+** under **Pre-actions**
4. Select **New Run Script Action**
5. Paste this script:
   ```bash
   cd "${SRCROOT}/.." && cp .env.full .env && echo "✅ Copied .env.full to .env"
   ```
6. ✅ **CRITICAL:** Check **"Provide build settings from"** → Select **FlavourDemo**
7. Select **Run** (left sidebar) → Build Configuration: `Debug-Full`
8. Select **Archive** (left sidebar) → Build Configuration: `Release-Full`
9. Click **Close**

## ✅ Test

```bash
# Test Lite
npm run ios:lite

# Test Full
npm run ios:full
```

## 🔍 Expected Console Output

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

---

## ✅ What's Already Done For You

- ✅ `react-native-config` installed
- ✅ Podfile updated with `react-native-config/Extension`
- ✅ Podfile has configuration mapping
- ✅ `.env.lite` file created
- ✅ `.env.full` file created
- ✅ `.env` file created
- ✅ `index.js` updated to use react-native-config
- ✅ `src/config/flavor.ts` updated
- ✅ `src/config/api.ts` updated
- ✅ `src/config/features.ts` updated

---

## 📝 Quick Checklist

- [ ] Run `bundle exec pod install` in ios folder
- [ ] Create 4 build configurations in Xcode
- [ ] Create 2 schemes in Xcode
- [ ] Add pre-action scripts to both schemes
- [ ] Configure schemes to use correct build configurations
- [ ] Test with `npm run ios:lite` and `npm run ios:full`

---

**That's it! Follow these steps and you're done!** 🎉

