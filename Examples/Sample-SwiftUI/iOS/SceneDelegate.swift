//
//  SceneDelegate.swift
//  Sample-SwiftUI (iOS)
//
//  Created by Michael McNamara on 07/09/2020.
//

import UIKit
import Intercom

let INTERCOM_APP_ID = IntercomConfig.appId  // Configuration via environment variables
let INTERCOM_API_KEY = IntercomConfig.apiKey// Configuration via environment variables
let emailKey = "luke.mccarron@intercom.io"

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let _ = (scene as? UIWindowScene) else { return }
        
        // Setup Intercom
        Intercom.setApiKey(INTERCOM_API_KEY, forAppId: INTERCOM_APP_ID)
        Intercom.setLauncherVisible(true)
        
        #if DEBUG
        Intercom.enableLogging()
        #endif
        
        let defaults = UserDefaults.standard
        if let email = defaults.string(forKey: emailKey) {
            let attributes = ICMUserAttributes()
            attributes.email = email
            Intercom.loginUser(with: attributes) { result in
                switch result {
                case .success: print("Successfully logged in \(email)")
                case .failure(let error): print("Error logging in: \(error.localizedDescription)")
                }
            }
        }
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        //Register for push notifications
        //For more info, see: https://developers.intercom.com/installing-intercom/docs/ios-push-notifications
        
        let center = UNUserNotificationCenter.current()
        // Request permission to display alerts and play sounds.
        center.requestAuthorization(options: [.alert, .sound, .badge]) { (granted, error) in
            // Enable or disable features based on authorization.
        }
        UIApplication.shared.registerForRemoteNotifications()
    }}
