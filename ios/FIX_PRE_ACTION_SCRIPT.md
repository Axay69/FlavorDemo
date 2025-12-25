# Fix: Pre-Action Script Path Error

## Problem
```
cp: /../.env.full: No such file or directory
```

The `${PROJECT_DIR}` variable is not being resolved correctly in the pre-action script.

## Solution: Use Correct Path

### Option 1: Use SRCROOT (Recommended)

In Xcode pre-action scripts, use `${SRCROOT}` instead of `${PROJECT_DIR}`:

**For FlavourDemo-Lite Scheme:**
```bash
cp "${SRCROOT}/../.env.lite" "${SRCROOT}/../.env"
```

**For FlavourDemo-Full Scheme:**
```bash
cp "${SRCROOT}/../.env.full" "${SRCROOT}/../.env"
```

### Option 2: Use Absolute Path (Alternative)

If `${SRCROOT}` doesn't work, use the workspace path:

**For FlavourDemo-Lite:**
```bash
cp "${WORKSPACE_PATH}/../.env.lite" "${WORKSPACE_PATH}/../.env"
```

**For FlavourDemo-Full:**
```bash
cp "${WORKSPACE_PATH}/../.env.full" "${WORKSPACE_PATH}/../.env"
```

### Option 3: Use cd Command (Most Reliable)

**For FlavourDemo-Lite:**
```bash
cd "${SRCROOT}/.." && cp .env.lite .env
```

**For FlavourDemo-Full:**
```bash
cd "${SRCROOT}/.." && cp .env.full .env
```

## How to Fix in Xcode

1. **Product** → **Scheme** → **Edit Scheme**
2. Select **FlavourDemo-Full** scheme
3. Select **Build** (left sidebar)
4. Under **Pre-actions**, find your script
5. **Replace the script** with one of the options above
6. ✅ **IMPORTANT:** Check **"Provide build settings from"** → Select **FlavourDemo**
7. Click **Close**

## Verify Script Works

Add echo to test:

```bash
echo "SRCROOT: ${SRCROOT}"
echo "Copying .env.full to .env"
cp "${SRCROOT}/../.env.full" "${SRCROOT}/../.env"
echo "Done!"
```

This will show you what path is being used.

## Quick Fix Scripts

### FlavourDemo-Lite Pre-Action:
```bash
cd "${SRCROOT}/.." && cp .env.lite .env && echo "Copied .env.lite to .env"
```

### FlavourDemo-Full Pre-Action:
```bash
cd "${SRCROOT}/.." && cp .env.full .env && echo "Copied .env.full to .env"
```

---

**After fixing, rebuild and the error should be gone!**

