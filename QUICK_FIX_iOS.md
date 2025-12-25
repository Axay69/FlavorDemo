# 🚨 Quick Fix: FlavorModule Not Found

## Problem
```
WARN  FlavorModule not found. APP_FLAVOR will be undefined.
ERROR  [Error: APP_FLAVOR is not set...]
```

**Root Cause:** Files exist but aren't added to Xcode project, so they're not being compiled.

---

## ✅ Step-by-Step Fix (5 minutes)

### Step 1: Open Xcode
```bash
cd ios
open FlavourDemo.xcworkspace
```
**⚠️ CRITICAL:** Open `.xcworkspace`, NOT `.xcodeproj`

### Step 2: Add Files to Project

1. **In Xcode:**
   - Look at the left sidebar (Project Navigator)
   - Find the **FlavourDemo** folder (blue folder icon)
   - **Right-click** on it
   - Select **"Add Files to 'FlavourDemo'..."**

2. **In the file picker dialog:**
   - Navigate to: `ios/FlavourDemo/` folder
   - Select **BOTH** files:
     - `FlavorModule.swift`
     - `FlavorModule.m`
   - **IMPORTANT:** Hold `Cmd` key to select both at once

3. **Settings (CRITICAL):**
   - ✅ **Copy items if needed** → **UNCHECKED** ❌
   - ✅ **Create groups** → Selected
   - ✅ **Add to targets: FlavourDemo** → **CHECKED** ✅

4. Click **Add**

### Step 3: Verify in Build Phases

1. **Select target:**
   - Click the blue project icon (top of left sidebar)
   - Click **FlavourDemo** project (not folder)
   - Under **TARGETS**, click **FlavourDemo**

2. **Check Compile Sources:**
   - Click **Build Phases** tab (top)
   - Expand **Compile Sources** (click the arrow)
   - You should see:
     - ✅ `AppDelegate.swift`
     - ✅ `FlavorModule.swift` ← **MUST BE HERE**
     - ✅ `FlavorModule.m` ← **MUST BE HERE**

**If files are missing from Compile Sources:**
- Click the **+** button
- Add both `FlavorModule.swift` and `FlavorModule.m`

### Step 4: Clean and Build

1. **Clean:**
   - **Product** → **Clean Build Folder**
   - Or press: `Shift + Cmd + K`

2. **Build:**
   - **Product** → **Build**
   - Or press: `Cmd + B`
   - Wait for "Build Succeeded" ✅

### Step 5: Test

```bash
# From project root
npm run ios
```

**Expected:** No warning about FlavorModule! ✅

---

## 🔍 Verification Commands

### Check files exist:
```bash
ls -la ios/FlavourDemo/FlavorModule.*
```
Should show both `.swift` and `.m` files.

### Check if in Xcode project:
```bash
cd ios
grep -i "FlavorModule" FlavourDemo.xcodeproj/project.pbxproj
```
If empty, files aren't in project (need to add via Xcode).

---

## 🐛 Still Not Working?

### Option 1: Reinstall Pods
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
npm run ios
```

### Option 2: Full Clean
```bash
# Clean Xcode derived data
rm -rf ~/Library/Developer/Xcode/DerivedData/FlavourDemo-*

# Clean Pods
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install

# Clean Metro
cd ..
npm start -- --reset-cache
```

Then rebuild in Xcode.

### Option 3: Verify Module Registration

In Xcode, check:
1. **Build Settings** → Search "Swift"
2. **Swift Compiler - General** → Should have settings
3. **Objective-C Bridging Header** → Should be empty (auto-handled)

---

## ✅ Success Checklist

After following steps:

- [ ] Files visible in Xcode Project Navigator
- [ ] Both files in **Build Phases** → **Compile Sources**
- [ ] Project builds without errors
- [ ] App runs without `FlavorModule not found` warning
- [ ] Flavor value displays in app

---

## 📝 What Happened?

The files `FlavorModule.swift` and `FlavorModule.m` exist in the filesystem but weren't added to the Xcode project. Xcode only compiles files that are:
1. Added to the project
2. Listed in **Compile Sources**
3. Part of the target

Adding them via Xcode fixes all three requirements.

---

**Need more help?** See `ios/FIX_FLAVOR_MODULE.md` for detailed troubleshooting.

