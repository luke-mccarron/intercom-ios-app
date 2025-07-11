//
//  Config.swift
//  Sample-SwiftUI
//
//  Configuration for Intercom SDK
//

import Foundation

struct IntercomConfig {
    /// Intercom App ID (Workspace ID) - set via environment variable INTERCOM_APP_ID
    static let appId = ProcessInfo.processInfo.environment["INTERCOM_APP_ID"] ?? "YOUR_APP_ID_HERE"
    
    /// Intercom iOS API Key - set via environment variable INTERCOM_API_KEY
    static let apiKey = ProcessInfo.processInfo.environment["INTERCOM_API_KEY"] ?? "YOUR_API_KEY_HERE"
    
    /// Check if configuration is valid
    static var isConfigured: Bool {
        return appId != "YOUR_APP_ID_HERE" && apiKey != "YOUR_API_KEY_HERE"
    }
}
