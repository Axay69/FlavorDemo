package com.flavourdemo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

/**
 * Native module to expose app flavor to React Native JavaScript
 * 
 * The flavor value comes from BuildConfig.APP_FLAVOR which is set
 * in build.gradle based on the selected product flavor.
 */
class FlavorModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "FlavorModule"
    }

    /**
     * Synchronous method to get the app flavor
     * This is called during app bootstrap to set global.__APP_FLAVOR__
     */
    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getFlavor(): String {
        return BuildConfig.APP_FLAVOR
    }

    /**
     * Async method to get the app flavor (alternative approach)
     */
    @ReactMethod
    fun getFlavorAsync(promise: Promise) {
        promise.resolve(BuildConfig.APP_FLAVOR)
    }
}

