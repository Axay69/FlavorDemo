#import <React/RCTBridgeModule.h>

/**
 * Objective-C bridge for FlavorModule Swift class
 * This exposes the Swift module to React Native
 * 
 * RCT_EXTERN_MODULE automatically registers the module with React Native
 */
@interface RCT_EXTERN_MODULE(FlavorModule, NSObject)

/**
 * Synchronous method to get the app flavor
 * This is called during app bootstrap to set global.__APP_FLAVOR__
 * 
 * Note: For blocking synchronous methods, React Native will call this
 * directly from the JavaScript thread.
 */
RCT_EXTERN_BLOCKING_SYNCHRONOUS_METHOD(getFlavor)

/**
 * Alternative async method (for testing)
 */
RCT_EXTERN_METHOD(getFlavorAsync:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end

