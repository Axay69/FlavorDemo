# iOS Flavor Setup Guide

Complete step-by-step guide to set up flavors in iOS.

## Prerequisites

- Xcode installed
- CocoaPods dependencies installed (`bundle exec pod install`)

---

## Step 1: Open Project in Xcode

```bash
cd ios
open FlavourDemo.xcworkspace
```

**Important:** Always open the `.xcworkspace` file, not the `.xcodeproj` file.

---

## Step 2: Add Native Module Files to Xcode Project

The `FlavorModule.swift` and `FlavorModule.m` files should already exist. Verify they're added to the Xcode project:

1. In Xcode, check the Project Navigator (left sidebar)
2. Find the `FlavourDemo` folder
3. Verify these files exist:
   - `FlavorModule.swift`
   - `FlavorModule.m`

**If files are missing from Xcode (but exist in Finder):**

1. Right-click on the `FlavourDemo` folder in Xcode
2. Select **Add Files to "FlavourDemo"...**
3. Navigate to `ios/FlavourDemo/`
4. Select both `FlavorModule.swift` and `FlavorModule.m`
5. Ensure:
   - ✅ **Copy items if needed** is **UNCHECKED**
   - ✅ **Create groups** is selected
   - ✅ **FlavourDemo** target is **CHECKED**
6. Click **Add**

---

## Step 3: Create Build Configurations

1. In Xcode, click on the **FlavourDemo** project (blue icon at top of navigator)
2. Select the **FlavourDemo** project (not the target) in the main editor
3. Click on the **Info** tab
4. Under **Configurations**, you'll see:
   - Debug
   - Release

5. **Create Debug-Lite:**
   - Click the **+** button below configurations
   - Select **Duplicate "Debug" Configuration**
   - Name it: `Debug-Lite`

6. **Create Debug-Full:**
   - Click the **+** button again
   - Select **Duplicate "Debug" Configuration**
   - Name it: `Debug-Full`

7. **Create Release-Lite:**
   - Click the **+** button
   - Select **Duplicate "Release" Configuration**
   - Name it: `Release-Lite`

8. **Create Release-Full:**
   - Click the **+** button
   - Select **Duplicate "Release" Configuration**
   - Name it: `Release-Full`

You should now have 6 configurations:
- Debug (original)
- Debug-Lite
- Debug-Full
- Release (original)
- Release-Lite
- Release-Full

---

## Step 4: Set Info.plist Values per Configuration

### Method 1: Using Build Settings (Recommended)

1. Select the **FlavourDemo** project
2. Select the **FlavourDemo** target
3. Go to **Build Settings** tab
4. Search for "Info.plist"
5. Find **Info.plist Preprocessor Prefix File** or scroll to **User-Defined Settings**

6. **Add User-Defined Setting:**
   - Click **+** → **Add User-Defined Setting**
   - Name: `APP_FLAVOR`
   - Set values per configuration:
     - **Debug-Lite**: `lite`
     - **Debug-Full**: `full`
     - **Release-Lite**: `lite`
     - **Release-Full**: `full`

### Method 2: Using Info.plist Directly (Alternative)

1. Select **Info.plist** in the navigator
2. Right-click on the `APP_FLAVOR` value
3. Select **Show in File Inspector**
4. In the right panel, you can set different values per configuration

**Note:** The current Info.plist has `APP_FLAVOR` = `full` as default. For proper flavor support, use Method 1 above.

---

## Step 5: Create Schemes

1. Go to **Product** → **Scheme** → **Manage Schemes...**
2. Find the **FlavourDemo** scheme
3. Click **Duplicate** (or select it and press `Cmd + D`)
4. Name it: `FlavourDemo-Lite`
5. Click **Duplicate** again
6. Name it: `FlavourDemo-Full`
7. Ensure both schemes are marked as **Shared** (checkbox checked)

---

## Step 6: Configure Schemes

### For FlavourDemo-Lite Scheme:

1. Select **FlavourDemo-Lite** scheme
2. Click **Edit...** (or press `Cmd + <`)
3. In the left sidebar, select **Run**
4. Under **Build Configuration**, select **Debug-Lite**
5. Select **Test** in the left sidebar
6. Under **Build Configuration**, select **Debug-Lite**
7. Select **Profile** in the left sidebar
8. Under **Build Configuration**, select **Release-Lite**
9. Select **Analyze** in the left sidebar
10. Under **Build Configuration**, select **Debug-Lite**
11. Select **Archive** in the left sidebar
12. Under **Build Configuration**, select **Release-Lite**
13. Click **Close**

### For FlavourDemo-Full Scheme:

1. Select **FlavourDemo-Full** scheme
2. Click **Edit...**
3. In the left sidebar, select **Run**
4. Under **Build Configuration**, select **Debug-Full**
5. Select **Test** → **Build Configuration**: `Debug-Full`
6. Select **Profile** → **Build Configuration**: `Release-Full`
7. Select **Analyze** → **Build Configuration**: `Debug-Full`
8. Select **Archive** → **Build Configuration**: `Release-Full`
9. Click **Close**

---

## Step 7: Set Bundle Identifier per Flavor (Optional)

To allow both flavors to be installed simultaneously:

1. Select **FlavourDemo** project → **FlavourDemo** target
2. Go to **Build Settings** tab
3. Search for "Product Bundle Identifier"
4. Expand it to show all configurations
5. Set:
   - **Debug-Lite** / **Release-Lite**: `com.flavourdemo.lite`
   - **Debug-Full** / **Release-Full**: `com.flavourdemo`

---

## Step 8: Set Display Name per Flavor (Optional)

1. In **Build Settings**, search for "Product Name" or "CFBundleDisplayName"
2. Or edit Info.plist and set `CFBundleDisplayName` per configuration:
   - **Lite**: `FlavourDemo Lite`
   - **Full**: `FlavourDemo`

---

## Step 9: Verify Native Module

1. Select **FlavourDemo** target
2. Go to **Build Phases** tab
3. Expand **Compile Sources**
4. Verify both files are listed:
   - `FlavorModule.swift`
   - `FlavorModule.m`

If missing, add them:
1. Click **+** in Compile Sources
2. Add both files

---

## Step 10: Build and Test

### Using Xcode:

1. Select scheme from dropdown (top-left): **FlavourDemo-Lite** or **FlavourDemo-Full**
2. Click **Run** (or press `Cmd + R`)

### Using React Native CLI:

```bash
# Build Lite flavor
npx react-native run-ios --scheme FlavourDemo-Lite

# Build Full flavor
npx react-native run-ios --scheme FlavourDemo-Full
```

### Using NPM Scripts:

```bash
npm run ios:lite
npm run ios:full
```

---

## Verification Checklist

- [ ] FlavorModule.swift and FlavorModule.m are in Xcode project
- [ ] Both files are in Compile Sources
- [ ] 6 build configurations created (Debug, Debug-Lite, Debug-Full, Release, Release-Lite, Release-Full)
- [ ] APP_FLAVOR user-defined setting created with correct values per configuration
- [ ] Two schemes created (FlavourDemo-Lite, FlavourDemo-Full)
- [ ] Schemes configured to use correct build configurations
- [ ] Schemes are marked as Shared
- [ ] App builds and runs with correct flavor

---

## Troubleshooting

### Module Not Found Error

**Error:** `FlavorModule not found` in JavaScript console

**Solution:**
1. Clean build folder: **Product** → **Clean Build Folder** (`Shift + Cmd + K`)
2. Verify files are in Compile Sources (Build Phases)
3. Rebuild: **Product** → **Build** (`Cmd + B`)

### Wrong Flavor Value

**Issue:** App shows wrong flavor

**Solution:**
1. Verify scheme is using correct build configuration
2. Check APP_FLAVOR value in Build Settings for that configuration
3. Clean and rebuild

### Build Configuration Not Found

**Issue:** Xcode can't find build configuration

**Solution:**
1. Go to **Project** → **Info** → **Configurations**
2. Ensure all 6 configurations exist
3. Ensure schemes point to correct configurations

### Files Not Compiling

**Issue:** Swift/Objective-C files not compiling

**Solution:**
1. Check **Build Settings** → **Swift Compiler - General**
2. Verify **Objective-C Bridging Header** is set (if needed)
3. For React Native 0.81+, bridging header is usually not needed

---

## Quick Reference

| Action | Location |
|--------|----------|
| **Create Build Configurations** | Project → Info → Configurations |
| **Create Schemes** | Product → Scheme → Manage Schemes |
| **Edit Scheme** | Product → Scheme → Edit Scheme |
| **Set APP_FLAVOR** | Build Settings → User-Defined Settings |
| **Select Scheme** | Top-left dropdown in Xcode |
| **Clean Build** | Product → Clean Build Folder (`Shift + Cmd + K`) |

---

## Next Steps

After setup is complete:
1. Test both flavors build and run correctly
2. Verify flavor is detected in JavaScript (`console.log(APP_FLAVOR)`)
3. Test feature flags work correctly
4. Build release versions for distribution

---

For more details, see the main [README.md](../README.md).

