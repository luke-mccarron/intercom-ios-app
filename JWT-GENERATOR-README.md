# 🔐 JWT Generator for Intercom Identity Verification

This Node.js script generates JWT tokens for Intercom's Identity Verification feature, which adds an extra layer of security to your iOS app by ensuring users can only access their own conversations.

## 🚀 Quick Start

### 1. Setup Your Credentials
Edit `jwt-generator.js` and replace the placeholder values:

```javascript
// Replace with your actual Intercom Identity Verification secret
const INTERCOM_SECRET = 'YOUR_INTERCOM_IDENTITY_VERIFICATION_SECRET_HERE';

// Replace with your user data
const payload = {
  user_id: 'YOUR_USER_ID_HERE',     // Your internal user ID
  email: 'YOUR_EMAIL_HERE',         // User's email address
  iat: Math.floor(Date.now() / 1000) // Auto-generated timestamp
};
```

### 2. Get Your Identity Verification Secret
1. Go to your [Intercom Dashboard](https://app.intercom.com)
2. **Settings** → **Privacy and Security** → **Identity Verification**
3. **Enable Identity Verification** if not already enabled
4. **Copy your Identity Verification Secret**

### 3. Generate JWT Token
```bash
node jwt-generator.js
```

### 4. Use in Your iOS App
Copy the generated token and use it in your iOS app:

```swift
let attributes = ICMUserAttributes()
attributes.email = "user@example.com"
attributes.userHash = "your_generated_jwt_token_here"

Intercom.loginUser(with: attributes) { result in
    switch result {
    case .success: print("Successfully logged in with JWT verification")
    case .failure(let error): print("Error: \(error.localizedDescription)")
    }
}
```

## 🛡️ Security Features

- ✅ **No external dependencies** - Uses only Node.js built-in crypto module
- ✅ **Input validation** - Checks for placeholder values
- ✅ **Safe for version control** - No hardcoded secrets
- ✅ **HMAC SHA256 signing** - Industry standard JWT signing

## 📖 What is Identity Verification?

Identity Verification ensures that:
- Users can only see their own conversations
- Prevents user impersonation
- Adds cryptographic proof of user identity
- Required for high-security applications

## 🔧 Integration with Sample Apps

After generating your JWT token, you can use it in any of the example projects:

- **Sample-SwiftUI**: Add to `SceneDelegate.swift` login function
- **Sample-Swift-UISceneDelegate**: Add to login flow
- **Sample-ObjC**: Add to `ITCAppDelegate.m`

## 🚨 Important Security Notes

1. **Never commit your actual secret** to version control
2. **Regenerate tokens periodically** for enhanced security
3. **Use HTTPS** for all API communications
4. **Validate tokens server-side** in production applications
5. **Keep your Identity Verification secret secure**

## 📚 Additional Resources

- [Intercom Identity Verification Documentation](https://developers.intercom.com/installing-intercom/docs/identity-verification)
- [JWT.io - JWT Debugger](https://jwt.io/)
- [Intercom iOS SDK Documentation](https://developers.intercom.com/installing-intercom/docs/ios-installation)
