import Foundation

/**
 * Native module to expose app flavor to React Native JavaScript
 * 
 * The flavor value comes from Info.plist APP_FLAVOR key which is set
 * based on the selected build configuration/scheme.
 * 
 * Note: This module is registered via RCT_EXTERN_MODULE in FlavorModule.m
 * We don't need to conform to RCTBridgeModule protocol in Swift.
 */
@objc(FlavorModule)
class FlavorModule: NSObject {
  
  /**
   * Required: Main queue setup
   * This is called by React Native to determine if module needs main queue
   */
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  /**
   * Synchronous method to get the app flavor
   * This is called during app bootstrap to set global.__APP_FLAVOR__
   */
  @objc
  func getFlavor() -> String {
    let flavor = Bundle.main.object(forInfoDictionaryKey: "APP_FLAVOR") as? String ?? "unknown"
    print("[FlavorModule] getFlavor() called, returning: \(flavor)")
    return flavor
  }
  
  /**
   * Async method for testing (alternative approach)
   */
  @objc
  func getFlavorAsync(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let flavor = Bundle.main.object(forInfoDictionaryKey: "APP_FLAVOR") as? String ?? "unknown"
    print("[FlavorModule] getFlavorAsync() called, returning: \(flavor)")
    resolve(flavor)
  }
}

