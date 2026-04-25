# Security Guidelines

## Sensitive Configuration Files

This project requires sensitive configuration files that should **NEVER** be committed to version control:

- `credentials.json` - Android keystore credentials
- `google-services.json` - Google/Firebase configuration
- `.env` - Environment variables

These files are listed in `.gitignore` and have `.example` versions provided as templates.

### Setup Instructions

1. Copy the example files to create actual configuration files:
   ```bash
   cp .env.example .env
   cp credentials.example.json credentials.json
   cp google-services.example.json google-services.json
   ```

2. Fill in the actual values for your Firebase project:
   - Get Firebase config from: https://console.firebase.google.com
   - Android keystore credentials should be stored securely

3. **Never** commit these files. Verify they are in `.gitignore`.

## Environment Variables

Firebase configuration is loaded from environment variables in `firebase.js`:
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

These should be set in your `.env` file locally and in your CI/CD environment variables.

## Best Practices

- Never hardcode API keys or secrets in source code
- Keep sensitive files out of version control
- Use environment variables for configuration
- Rotate compromised credentials immediately
- Store credentials in secure vaults (GitHub Secrets for CI/CD, etc.)

## If Credentials Are Compromised

If you accidentally commit credentials:
1. Immediately regenerate the credentials in your service (Firebase Console, Android Keystore)
2. Use `git filter-branch` or `git filter-repo` to remove them from history
3. Force push (only if your repo is private and you have access)
4. Notify any team members who may have pulled the compromised code
