# Fix FlavorModule Not Found Error

## Problem
`FlavorModule not found` error means the native module files aren't being compiled by Xcode.

## Quick Fix Steps

### Step 1: Verify Files Exist
```bash
# From project root
ls -la ios/FlavourDemo/FlavorModule.*
```

You should see:
- `FlavorModule.swift`
- `FlavorModule.m`

### Step 2: Open Xcode Project
```bash
cd ios
open FlavourDemo.xcworkspace
```

**IMPORTANT:** Always open `.xcworkspace`, NOT `.xcodeproj`

### Step 3: Add Files to Xcode Project

1. **In Xcode Project Navigator (left sidebar):**
   - Find the `FlavourDemo` folder (blue folder icon)
   - Right-click on it
   - Select **"Add Files to 'FlavourDemo'..."**

2. **In the file picker:**
   - Navigate to: `ios/FlavourDemo/`
   - Select BOTH files:
     - ✅ `FlavorModule.swift`
     - ✅ `FlavorModule.m`
   
3. **Important settings:**
   - ✅ **Copy items if needed** → **UNCHECKED** (files already in correct location)
   - ✅ **Create groups** → Selected
   - ✅ **Add to targets: FlavourDemo** → **CHECKED**

4. Click **Add**

### Step 4: Verify Files Are in Compile Sources

1. **Select FlavourDemo target:**
   - Click on the blue project icon (top of navigator)
   - Select **FlavourDemo** project
   - Select **FlavourDemo** target (under TARGETS)

2. **Go to Build Phases:**
   - Click **Build Phases** tab
   - Expand **Compile Sources**

3. **Verify both files are listed:**
   - ✅ `FlavorModule.swift`
   - ✅ `FlavorModule.m`
   - ✅ `AppDelegate.swift` (should already be there)

**If files are missing:**
- Click the **+** button in Compile Sources
- Add `FlavorModule.swift` and `FlavorModule.m`

### Step 5: Clean and Rebuild

1. **Clean Build Folder:**
   - **Product** → **Clean Build Folder** (or press `Shift + Cmd + K`)

2. **Rebuild:**
   - **Product** → **Build** (or press `Cmd + B`)
   - Wait for build to complete (check for errors)

### Step 6: Test

```bash
# From project root
npm run ios
# or
npx react-native run-ios
```

You should now see the flavor value instead of the error!

---

## Alternative: Manual Verification via Terminal

If you want to verify the files are in the project file:

```bash
cd ios
grep -A 5 "FlavorModule" FlavourDemo.xcodeproj/project.pbxproj
```

You should see references to both files. If not, they need to be added via Xcode.

---

## If Still Not Working

### Check Swift Bridging
1. Select **FlavourDemo** target
2. Go to **Build Settings**
3. Search for "Objective-C Bridging Header"
4. It should be empty (React Native 0.81+ handles this automatically)

### Check Module Name
The module name must match exactly:
- Swift class: `@objc(FlavorModule)` ✅
- Objective-C bridge: `RCT_EXTERN_MODULE(FlavorModule, NSObject)` ✅
- JavaScript: `NativeModules.FlavorModule` ✅

### Reinstall Pods (if needed)
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
```

### Full Clean
```bash
cd ios
# Clean Xcode
rm -rf ~/Library/Developer/Xcode/DerivedData/FlavourDemo-*

# Clean Pods
rm -rf Pods Podfile.lock
bundle exec pod install

# Clean Metro
cd ..
npm start -- --reset-cache
```

Then rebuild in Xcode.

---

## Verification Checklist

After following steps above:

- [ ] Files exist in `ios/FlavourDemo/` directory
- [ ] Files are visible in Xcode Project Navigator
- [ ] Both files are in **Build Phases** → **Compile Sources**
- [ ] Project builds without errors (`Cmd + B`)
- [ ] App runs and `FlavorModule` is found (no warning in console)
- [ ] Flavor value is displayed in app

---

## Expected Result

After fixing, you should see:
```
LOG  Running "FlavourDemo" with {"rootTag":11,"initialProps":null,"fabric":true}
```

**NO** warning about `FlavorModule not found`.

The app should display the flavor correctly!

