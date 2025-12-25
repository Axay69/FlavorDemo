# Fix: Cannot find type 'RCTBridgeModule' in scope

## Problem
```
/Users/dreamworld/Desktop/Akshay/ReactNative/FlavourDemo/ios/FlavorModule.swift:11:31: 
Cannot find type 'RCTBridgeModule' in scope
```

## Solution

In React Native 0.81, you **don't need** to conform to `RCTBridgeModule` protocol in Swift files when using `RCT_EXTERN_MODULE` in the Objective-C bridge.

The `FlavorModule.m` file handles the registration via `RCT_EXTERN_MODULE`, so the Swift file just needs to be a simple `NSObject` subclass.

## Fixed Code

The `FlavorModule.swift` has been updated to remove the `RCTBridgeModule` protocol requirement.

### Before (❌ Error):
```swift
import Foundation
import React

@objc(FlavorModule)
class FlavorModule: NSObject, RCTBridgeModule {
  // ...
}
```

### After (✅ Fixed):
```swift
import Foundation

@objc(FlavorModule)
class FlavorModule: NSObject {
  // ...
}
```

## Why This Works

1. **RCT_EXTERN_MODULE** in `FlavorModule.m` automatically registers the module
2. Swift file just needs `@objc(FlavorModule)` annotation
3. Methods need `@objc` to be exposed to Objective-C
4. No need to import React or conform to protocols

## Next Steps

1. **Clean Build:**
   ```bash
   # In Xcode
   Product → Clean Build Folder (Shift + Cmd + K)
   ```

2. **Rebuild:**
   ```bash
   # In Xcode
   Product → Build (Cmd + B)
   ```

3. **Test:**
   ```bash
   npm run ios
   ```

The error should now be resolved! ✅

---

## Alternative: If You Still Get Errors

If you still see import errors, check:

1. **Pods are installed:**
   ```bash
   cd ios
   bundle exec pod install
   ```

2. **Bridging Header (usually not needed in RN 0.81):**
   - Check Build Settings → Objective-C Bridging Header
   - Should be empty or auto-generated

3. **Header Search Paths:**
   - Build Settings → Header Search Paths
   - Should include React Native paths (auto-configured by Pods)

4. **Full Clean:**
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   rm -rf ~/Library/Developer/Xcode/DerivedData/FlavourDemo-*
   bundle exec pod install
   ```

Then rebuild in Xcode.

