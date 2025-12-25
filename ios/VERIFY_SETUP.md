# iOS Setup Verification Checklist

Use this checklist to verify your iOS flavor setup is complete.

## ✅ Pre-Setup Verification

- [ ] Xcode is installed and up to date
- [ ] CocoaPods dependencies are installed (`bundle exec pod install`)
- [ ] Project opens in Xcode without errors

## ✅ File Verification

- [ ] `FlavorModule.swift` exists in `ios/FlavourDemo/`
- [ ] `FlavorModule.m` exists in `ios/FlavourDemo/`
- [ ] Both files are visible in Xcode Project Navigator
- [ ] Both files are added to **Build Phases** → **Compile Sources**

**To check Compile Sources:**
1. Select **FlavourDemo** target
2. Go to **Build Phases** tab
3. Expand **Compile Sources**
4. Verify both `FlavorModule.swift` and `FlavorModule.m` are listed

## ✅ Build Configurations

- [ ] 6 build configurations exist:
  - [ ] Debug (original)
  - [ ] Debug-Lite
  - [ ] Debug-Full
  - [ ] Release (original)
  - [ ] Release-Lite
  - [ ] Release-Full

**To verify:**
1. Project → Info → Configurations
2. Count should be 6

## ✅ APP_FLAVOR Setting

- [ ] User-Defined Setting `APP_FLAVOR` exists
- [ ] Debug-Lite has value: `lite`
- [ ] Debug-Full has value: `full`
- [ ] Release-Lite has value: `lite`
- [ ] Release-Full has value: `full`

**To verify:**
1. Select **FlavourDemo** target
2. Go to **Build Settings**
3. Search for "APP_FLAVOR" or "User-Defined"
4. Expand to see all configurations

## ✅ Schemes

- [ ] `FlavourDemo-Lite` scheme exists
- [ ] `FlavourDemo-Full` scheme exists
- [ ] Both schemes are marked as **Shared**

**To verify:**
1. Product → Scheme → Manage Schemes
2. Both schemes should be listed
3. "Shared" checkbox should be checked

## ✅ Scheme Configuration

### FlavourDemo-Lite Scheme:
- [ ] Run → Build Configuration: `Debug-Lite`
- [ ] Test → Build Configuration: `Debug-Lite`
- [ ] Profile → Build Configuration: `Release-Lite`
- [ ] Analyze → Build Configuration: `Debug-Lite`
- [ ] Archive → Build Configuration: `Release-Lite`

### FlavourDemo-Full Scheme:
- [ ] Run → Build Configuration: `Debug-Full`
- [ ] Test → Build Configuration: `Debug-Full`
- [ ] Profile → Build Configuration: `Release-Full`
- [ ] Analyze → Build Configuration: `Debug-Full`
- [ ] Archive → Build Configuration: `Release-Full`

**To verify:**
1. Product → Scheme → Edit Scheme
2. Check each action's Build Configuration

## ✅ Build Test

- [ ] Project builds without errors (`Cmd + B`)
- [ ] Clean build succeeds (Product → Clean Build Folder)
- [ ] Both schemes can be selected from dropdown

## ✅ Runtime Test

- [ ] Lite flavor builds and runs
- [ ] Full flavor builds and runs
- [ ] Flavor is detected in JavaScript (`console.log` shows correct value)
- [ ] App displays correct theme/features per flavor

**To test:**
```bash
# Test Lite
npx react-native run-ios --scheme FlavourDemo-Lite

# Test Full
npx react-native run-ios --scheme FlavourDemo-Full
```

## 🐛 Common Issues

### Files Not in Xcode
**Symptom:** Files exist in Finder but not in Xcode

**Fix:**
1. Right-click FlavourDemo folder → Add Files
2. Select both FlavorModule files
3. Ensure target is checked

### Module Not Found
**Symptom:** `FlavorModule not found` in console

**Fix:**
1. Clean build folder (`Shift + Cmd + K`)
2. Verify files in Compile Sources
3. Rebuild (`Cmd + B`)

### Wrong Flavor Value
**Symptom:** App shows wrong flavor

**Fix:**
1. Check scheme's build configuration
2. Verify APP_FLAVOR value for that configuration
3. Clean and rebuild

---

**All checked?** Your iOS flavor setup is complete! 🎉

