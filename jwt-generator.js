const crypto = require('crypto');

// ⚠️ SETUP REQUIRED: Replace these placeholder values with your actual Intercom credentials
// Get these from: Intercom Dashboard → Settings → Privacy and Security → Identity Verification

const INTERCOM_SECRET = 'YOUR_INTERCOM_IDENTITY_VERIFICATION_SECRET_HERE';

// User information - replace with your actual user data
const payload = {
  user_id: 'YOUR_USER_ID_HERE',           // Your internal user ID
  email: 'YOUR_EMAIL_HERE',               // User's email address
  iat: Math.floor(Date.now() / 1000)      // Current timestamp (auto-generated)
};

// Simple JWT creation function (no external dependencies required)
function createJWT(payload, secret) {
  // Validate inputs
  if (!secret || secret === 'YOUR_INTERCOM_IDENTITY_VERIFICATION_SECRET_HERE') {
    console.error('❌ Error: Please set your INTERCOM_SECRET first!');
    console.log('📖 Get your secret from: Intercom Dashboard → Settings → Privacy and Security → Identity Verification');
    return null;
  }
  
  if (!payload.user_id || payload.user_id === 'YOUR_USER_ID_HERE') {
    console.error('❌ Error: Please set your user_id in the payload!');
    return null;
  }
  
  if (!payload.email || payload.email === 'YOUR_EMAIL_HERE') {
    console.error('❌ Error: Please set your email in the payload!');
    return null;
  }
  
  // JWT Header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  // Encode header and payload to base64url
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  // Create signature using HMAC SHA256
  const data = encodedHeader + '.' + encodedPayload;
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  
  // Return complete JWT token
  return data + '.' + signature;
}

// Generate the JWT token
console.log('🔐 Intercom JWT Generator for iOS Identity Verification\n');

const token = createJWT(payload, INTERCOM_SECRET);

if (token) {
  console.log('✅ Generated JWT Token:');
  console.log(token);
  console.log('\n📋 Usage in iOS App:');
  console.log('Copy this token and use it as userHash in your ICMUserAttributes:');
  console.log('');
  console.log('let attributes = ICMUserAttributes()');
  console.log('attributes.email = "' + payload.email + '"');
  console.log('attributes.userHash = "' + token + '"');
  console.log('');
  console.log('🔒 This enables Identity Verification for secure user authentication.');
} else {
  console.log('\n📖 Setup Instructions:');
  console.log('1. Replace INTERCOM_SECRET with your Identity Verification secret');
  console.log('2. Replace payload values with your user data');
  console.log('3. Run: node jwt-generator.js');
}
