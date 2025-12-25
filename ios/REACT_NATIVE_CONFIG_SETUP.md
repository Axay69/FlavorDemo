# React Native Config Setup for iOS Flavors

Complete step-by-step guide following the Medium article approach.

## ✅ Step 1: Install Dependencies (Already Done)

- ✅ `react-native-config` is installed
- ✅ Podfile updated with `react-native-config/Extension`

## ✅ Step 2: Create Environment Files (Already Done)

Created:
- `.env.lite` - Lite flavor variables
- `.env.full` - Full flavor variables
- `.env` - Default (will be copied by Xcode pre-action)

## 📋 Step 3: Install Pods

**YOU NEED TO RUN THIS:**

```bash
cd ios
bundle exec pod install
cd ..
```

## 📋 Step 4: Create Build Configurations in Xcode

**YOU NEED TO DO THIS IN XCODE:**

1. **Open Xcode:**
   ```bash
   cd ios
   open FlavourDemo.xcworkspace
   ```

2. **Create Build Configurations:**
   - Click **FlavourDemo** project (blue icon, top of navigator)
   - Select **FlavourDemo** project (not target)
   - Click **Info** tab
   - Under **Configurations**, you'll see:
     - Debug
     - Release
   
   - Click **+** button below configurations
   - Select **Duplicate "Debug" Configuration**
   - Name it: `Debug-Lite`
   
   - Click **+** again
   - Select **Duplicate "Debug" Configuration**
   - Name it: `Debug-Full`
   
   - Click **+** again
   - Select **Duplicate "Release" Configuration**
   - Name it: `Release-Lite`
   
   - Click **+** again
   - Select **Duplicate "Release" Configuration**
   - Name it: `Release-Full`

   **You should now have 6 configurations:**
   - Debug
   - Debug-Lite
   - Debug-Full
   - Release
   - Release-Lite
   - Release-Full

## 📋 Step 5: Update Podfile Configuration Mapping

**I'LL DO THIS FOR YOU** - Update Podfile to map configurations:

```ruby
project 'FlavourDemo',
  'Debug' => :debug,
  'Release' => :release,
  'Debug-Lite' => :debug,
  'Release-Lite' => :release,
  'Debug-Full' => :debug,
  'Release-Full' => :release
```

## 📋 Step 6: Create Schemes

**YOU NEED TO DO THIS IN XCODE:**

1. **Product** → **Scheme** → **Manage Schemes...**

2. **Create FlavourDemo-Lite:**
   - Find **FlavourDemo** scheme
   - Click **Duplicate** (or press `Cmd + D`)
   - Name it: `FlavourDemo-Lite`
   - ✅ Check **Shared** checkbox

3. **Create FlavourDemo-Full:**
   - Click **Duplicate** again
   - Name it: `FlavourDemo-Full`
   - ✅ Check **Shared** checkbox

## 📋 Step 7: Configure Schemes

**YOU NEED TO DO THIS IN XCODE:**

### For FlavourDemo-Lite Scheme:

1. Select **FlavourDemo-Lite** scheme
2. Click **Edit...** (or press `Cmd + <`)
3. In left sidebar, select **Build** (under Build section)
4. Click **+** under **Pre-actions**
5. Select **New Run Script Action**
6. In the script box, paste:
   ```bash
   cd "${SRCROOT}/.." && cp .env.lite .env && echo "✅ Copied .env.lite to .env"
   ```
7. ✅ Check **Provide build settings from**: `FlavourDemo`
8. In left sidebar, select **Run**
9. Under **Build Configuration**, select: `Debug-Lite`
10. In left sidebar, select **Archive**
11. Under **Build Configuration**, select: `Release-Lite`
12. Click **Close**

### For FlavourDemo-Full Scheme:

1. Select **FlavourDemo-Full** scheme
2. Click **Edit...**
3. In left sidebar, select **Build**
4. Click **+** under **Pre-actions**
5. Select **New Run Script Action**
6. In the script box, paste:
   ```bash
   cd "${SRCROOT}/.." && cp .env.full .env && echo "✅ Copied .env.full to .env"
   ```
7. ✅ Check **Provide build settings from**: `FlavourDemo`
8. In left sidebar, select **Run**
9. Under **Build Configuration**, select: `Debug-Full`
10. In left sidebar, select **Archive**
11. Under **Build Configuration**, select: `Release-Full`
12. Click **Close**

## 📋 Step 8: Update Info.plist (Optional - for app name)

**YOU CAN DO THIS:**

1. Select **Info.plist** in Project Navigator
2. Change `CFBundleDisplayName` to use config variable:
   - Or keep it as static value per flavor

## ✅ Step 9: Code Updated (Already Done)

- ✅ `index.js` updated to use `react-native-config`
- ✅ Reads `APP_FLAVOR` from Config

## 📋 Step 10: Test

**YOU NEED TO RUN:**

```bash
# Run Lite flavor
npm run ios:lite
# or
npx react-native run-ios --scheme FlavourDemo-Lite

# Run Full flavor
npm run ios:full
# or
npx react-native run-ios --scheme FlavourDemo-Full
```

## 🔍 Verification

After running, check console:
- Should see: `[Config] APP_FLAVOR: lite` or `[Config] APP_FLAVOR: full`
- Should see: `[Config] APP_NAME: FlavourDemo Lite` or `FlavourDemo`

## 🐛 Troubleshooting

### Pod Install Fails
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
```

### Environment Variables Not Loading
1. Check `.env` file exists in project root
2. Verify pre-action script copied correct file
3. Check scheme is using correct build configuration
4. Clean build folder and rebuild

### Wrong Flavor Value
1. Check which scheme is selected
2. Verify pre-action script is correct
3. Check `.env.lite` and `.env.full` files exist
4. Verify `.env` file has correct content after build

---

## 📝 Summary of What You Need to Do

1. ✅ Run `bundle exec pod install` in ios folder
2. ✅ Create 4 build configurations in Xcode (Debug-Lite, Debug-Full, Release-Lite, Release-Full)
3. ✅ Create 2 schemes (FlavourDemo-Lite, FlavourDemo-Full)
4. ✅ Add pre-action scripts to each scheme
5. ✅ Configure schemes to use correct build configurations
6. ✅ Test with `npm run ios:lite` and `npm run ios:full`

---

**Everything else is already set up!** 🎉

