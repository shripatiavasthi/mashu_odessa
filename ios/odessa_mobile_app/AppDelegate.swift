import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore
import AppAuth

@main
class AppDelegate: UIResponder, UIApplicationDelegate, RNAppAuthAuthorizationFlowManager {
  var window: UIWindow?
  @objc var authorizationFlowManagerDelegate: RNAppAuthAuthorizationFlowManagerDelegate?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "odessa_mobile_app",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  // 🔑 REQUIRED for OAuth redirect (Microsoft Login)
  func application(
    _ application: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
  ) -> Bool {
    if let delegate = authorizationFlowManagerDelegate,
       delegate.resumeExternalUserAgentFlow(with: url) {
      return true
    }
    return RCTLinkingManager.application(application, open: url, options: options)
  }

  func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    if let delegate = authorizationFlowManagerDelegate,
       let url = userActivity.webpageURL,
       delegate.resumeExternalUserAgentFlow(with: url) {
      return true
    }
    return RCTLinkingManager.application(
      application,
      continue: userActivity,
      restorationHandler: restorationHandler
    )
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
