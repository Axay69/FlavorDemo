# Fix: FlavorModule Not Found in iOS

## Problem
```
WARN  [FlavorModule] Module not found. Using default flavor.
```

The module exists but isn't being registered with React Native.

## Solution: Ensure Module is Properly Registered

### Step 1: Verify Files Are in Xcode Project

1. **Open Xcode:**
   ```bash
   cd ios
   open FlavourDemo.xcworkspace
   ```

2. **Check Project Navigator:**
   - Look for `FlavorModule.swift` in `FlavourDemo` folder
   - Look for `FlavorModule.m` in `FlavourDemo` folder
   - If missing (red/missing), they need to be added

3. **If Files Are Missing:**
   - Right-click `FlavourDemo` folder → **Add Files to 'FlavourDemo'...**
   - Select both `FlavorModule.swift` and `FlavorModule.m`
   - ✅ **Add to targets: FlavourDemo** must be CHECKED
   - Click **Add**

### Step 2: Verify in Build Phases

1. **Select FlavourDemo target**
2. **Build Phases** tab
3. **Expand Compile Sources**
4. **Must see:**
   - ✅ `FlavorModule.swift`
   - ✅ `FlavorModule.m`
   - ✅ `AppDelegate.swift`

**If missing:** Click **+** and add them

### Step 3: Clean and Rebuild

```bash
# In Xcode
Product → Clean Build Folder (Shift + Cmd + K)
Product → Build (Cmd + B)
```

### Step 4: Verify Module Registration

The `RCT_EXTERN_MODULE` macro should auto-register, but let's verify:

1. **Check FlavorModule.m** has:
   ```objc
   @interface RCT_EXTERN_MODULE(FlavorModule, NSObject)
   RCT_EXTERN_BLOCKING_SYNCHRONOUS_METHOD(getFlavor)
   @end
   ```

2. **Check FlavorModule.swift** has:
   ```swift
   @objc(FlavorModule)
   class FlavorModule: NSObject {
     @objc func getFlavor() -> String { ... }
   }
   ```

### Step 5: Test

```bash
npm run ios
```

Check console - should see:
```
[FlavorModule] getFlavor() called, returning: full
[FlavorModule] Flavor value: full
```

**NOT:**
```
WARN [FlavorModule] Module not found
```

---

## If Still Not Working

### Option 1: Reinstall Pods
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
npm run ios
```

### Option 2: Check Bridging Header
In Xcode → Build Settings → Search "Bridging Header"
- Should be empty (auto-handled in RN 0.81)
- Or should point to correct header if custom

### Option 3: Full Clean
```bash
# Clean Xcode
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

---

## Next: Set Up Lite/Full Flavors

Once module works, set up flavors:

1. **Create Build Configurations** (see IOS_FLAVOR_SETUP.md)
2. **Create Schemes** (FlavourDemo-Lite, FlavourDemo-Full)
3. **Set APP_FLAVOR per configuration**

Then you can run:
```bash
npm run ios:lite
npm run ios:full
```

