# How to Run Lite vs Full Flavors in iOS

## Current Status
- ✅ Module code is ready
- ⚠️ Module needs to be registered (see FIX_MODULE_REGISTRATION.md first)
- 📋 Need to set up build configurations and schemes

## Quick Setup Guide

### Step 1: Fix Module Registration First

**Before setting up flavors, make sure FlavorModule works!**

Follow: `ios/FIX_MODULE_REGISTRATION.md`

You should see in console:
```
[FlavorModule] Flavor value: full
```

**NOT:**
```
WARN [FlavorModule] Module not found
```

---

### Step 2: Create Build Configurations

1. **Open Xcode:**
   ```bash
   cd ios
   open FlavourDemo.xcworkspace
   ```

2. **Create Configurations:**
   - Click **FlavourDemo** project (blue icon)
   - Select **FlavourDemo** project (not target)
   - **Info** tab
   - Under **Configurations**, click **+**
   - **Duplicate "Debug" Configuration** → Name: `Debug-Lite`
   - **Duplicate "Debug" Configuration** → Name: `Debug-Full`
   - **Duplicate "Release" Configuration** → Name: `Release-Lite`
   - **Duplicate "Release" Configuration** → Name: `Release-Full`

   You should have 6 configurations total.

### Step 3: Set APP_FLAVOR per Configuration

1. **Select FlavourDemo target**
2. **Build Settings** tab
3. **Search:** "User-Defined" or click **+** → **Add User-Defined Setting**
4. **Name:** `APP_FLAVOR`
5. **Set values:**
   - **Debug-Lite**: `lite`
   - **Debug-Full**: `full`
   - **Release-Lite**: `lite`
   - **Release-Full**: `full`

### Step 4: Update Info.plist to Use Build Setting

**Option A: Use Build Setting (Recommended)**

1. **Select Info.plist** in Project Navigator
2. **Right-click** on `APP_FLAVOR` value
3. **Show in File Inspector**
4. Change value to: `$(APP_FLAVOR)`

This will use the build setting value per configuration.

**Option B: Manual per Configuration**

Keep current value in Info.plist, but you'll need to manually change it when switching flavors (not recommended).

### Step 5: Create Schemes

1. **Product** → **Scheme** → **Manage Schemes...**
2. **Duplicate** FlavourDemo scheme → Name: `FlavourDemo-Lite`
3. **Duplicate** FlavourDemo scheme → Name: `FlavourDemo-Full`
4. ✅ Check **Shared** for both

### Step 6: Configure Schemes

#### FlavourDemo-Lite:
1. **Edit Scheme** (or `Cmd + <`)
2. **Run** → **Build Configuration**: `Debug-Lite`
3. **Test** → **Build Configuration**: `Debug-Lite`
4. **Profile** → **Build Configuration**: `Release-Lite`
5. **Archive** → **Build Configuration**: `Release-Lite`

#### FlavourDemo-Full:
1. **Edit Scheme**
2. **Run** → **Build Configuration**: `Debug-Full`
3. **Test** → **Build Configuration**: `Debug-Full`
4. **Profile** → **Build Configuration**: `Release-Full`
5. **Archive** → **Build Configuration**: `Release-Full`

### Step 7: Test

#### Using Xcode:
1. Select scheme: **FlavourDemo-Lite** or **FlavourDemo-Full**
2. Click **Run** (`Cmd + R`)

#### Using CLI:
```bash
# Run Lite
npm run ios:lite
# or
npx react-native run-ios --scheme FlavourDemo-Lite

# Run Full
npm run ios:full
# or
npx react-native run-ios --scheme FlavourDemo-Full
```

### Step 8: Verify

Check console output:
- **Lite:** Should show `[FlavorModule] Flavor value: lite`
- **Full:** Should show `[FlavorModule] Flavor value: full`

---

## Troubleshooting

### Module Still Not Found

1. **Check Build Phases:**
   - FlavorModule.swift and FlavorModule.m must be in **Compile Sources**

2. **Clean and Rebuild:**
   ```bash
   # In Xcode
   Product → Clean Build Folder
   Product → Build
   ```

3. **Reinstall Pods:**
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   bundle exec pod install
   ```

### Wrong Flavor Value

1. **Check Build Configuration:**
   - Verify scheme is using correct configuration
   - Check APP_FLAVOR user-defined setting has correct value

2. **Check Info.plist:**
   - Should use `$(APP_FLAVOR)` to read from build setting
   - Or manually set per configuration

### Both Flavors Show Same Value

- Check APP_FLAVOR user-defined setting has different values per configuration
- Verify Info.plist uses `$(APP_FLAVOR)` variable
- Clean and rebuild

---

## Quick Reference

| Action | Command |
|--------|---------|
| **Run Lite** | `npm run ios:lite` |
| **Run Full** | `npm run ios:full` |
| **Select Scheme in Xcode** | Dropdown (top-left) |
| **Edit Scheme** | Product → Scheme → Edit Scheme |

---

**Remember:** Fix module registration first, then set up flavors!

