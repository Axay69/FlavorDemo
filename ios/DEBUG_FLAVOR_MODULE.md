# Debug: APP_FLAVOR Not Set

## Current Status
- ✅ Files are in correct location
- ✅ Module code looks correct
- ❌ Flavor value not being retrieved

## Debugging Steps

### Step 1: Check Console Logs

When you run the app, check the console for:
- `[FlavorModule] getFlavor() called, returning: ...`
- `[FlavorModule] Flavor value: ...`

This will tell us if:
1. The module is being called
2. What value it's returning

### Step 2: Verify Info.plist

The Info.plist has:
```xml
<key>APP_FLAVOR</key>
<string>full</string>
```

**Check in Xcode:**
1. Select `Info.plist` in Project Navigator
2. Verify `APP_FLAVOR` key exists
3. Value should be `full` (or `lite` for lite flavor)

### Step 3: Test Module Registration

Add this to your `App.tsx` temporarily:

```typescript
import { NativeModules } from 'react-native';

console.log('Available modules:', Object.keys(NativeModules));
console.log('FlavorModule:', NativeModules.FlavorModule);
if (NativeModules.FlavorModule) {
  console.log('getFlavor result:', NativeModules.FlavorModule.getFlavor());
}
```

### Step 4: Check Build Settings

In Xcode:
1. Select **FlavourDemo** target
2. **Build Settings** → Search "Info.plist"
3. Verify **Info.plist File** path is correct: `FlavourDemo/Info.plist`

### Step 5: Clean and Rebuild

```bash
# In Xcode
Product → Clean Build Folder (Shift + Cmd + K)
Product → Build (Cmd + B)
```

### Step 6: Test Async Method

If sync method doesn't work, try async:

```javascript
// In index.js, temporarily replace:
NativeModules.FlavorModule.getFlavorAsync()
  .then(flavor => {
    console.log('Flavor from async:', flavor);
    globalThis.__APP_FLAVOR__ = flavor;
  })
  .catch(err => {
    console.error('Error getting flavor:', err);
    globalThis.__APP_FLAVOR__ = 'full'; // Fallback
  });
```

## Common Issues

### Issue 1: Module Not Registered
**Symptom:** `NativeModules.FlavorModule` is `undefined`

**Fix:**
1. Verify files are in **Build Phases** → **Compile Sources**
2. Clean and rebuild
3. Check for build errors

### Issue 2: Method Not Found
**Symptom:** `getFlavor is not a function`

**Fix:**
1. Check `FlavorModule.m` has `RCT_EXTERN_BLOCKING_SYNCHRONOUS_METHOD(getFlavor)`
2. Verify Swift method has `@objc` annotation
3. Clean and rebuild

### Issue 3: Returns "unknown"
**Symptom:** Method returns "unknown"

**Fix:**
1. Check Info.plist has `APP_FLAVOR` key
2. Verify key spelling (case-sensitive)
3. Check value is not empty
4. Rebuild app (Info.plist changes require rebuild)

### Issue 4: Returns Empty String
**Symptom:** Method returns empty string or null

**Fix:**
1. Check Info.plist value is set correctly
2. Verify you're reading from correct Info.plist
3. Check if using build configurations (need to set per config)

## Quick Test

Add this to `App.tsx` to test:

```typescript
import { NativeModules } from 'react-native';

useEffect(() => {
  console.log('=== FLAVOR DEBUG ===');
  console.log('NativeModules keys:', Object.keys(NativeModules));
  console.log('FlavorModule exists:', !!NativeModules.FlavorModule);
  if (NativeModules.FlavorModule) {
    try {
      const flavor = NativeModules.FlavorModule.getFlavor();
      console.log('Flavor value:', flavor);
      console.log('Flavor type:', typeof flavor);
    } catch (e) {
      console.error('Error calling getFlavor:', e);
    }
  }
  console.log('Global APP_FLAVOR:', globalThis.__APP_FLAVOR__);
}, []);
```

## Expected Output

If everything works:
```
[FlavorModule] getFlavor() called, returning: full
[FlavorModule] Flavor value: full
```

If not working:
```
[FlavorModule] getFlavor() called, returning: unknown
[FlavorModule] Flavor is "unknown" or empty...
```

---

**After debugging, share the console output to identify the exact issue!**

