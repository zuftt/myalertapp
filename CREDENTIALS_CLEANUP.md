# ⚠️ CRITICAL: Exposed Credentials in Git History

## Issue
Your `credentials.json` and `google-services.json` files containing sensitive API keys and Android keystore credentials were previously committed to git history (commits from Jan 2025).

## Immediate Actions Required

### 1. Regenerate All Credentials (URGENT)
Your exposed credentials are:
- Firebase API keys (multiple)
- Android keystore password and keys
- Project IDs and other Firebase configuration

**Regenerate immediately:**
- [Firebase Console](https://console.firebase.google.com) - Create new web API key
- Android keystore - Generate new keystore
- Update all references in `credentials.json` and `google-services.json`

### 2. Clean Git History
To remove these files from git history, use one of these methods:

**Option A: Using git-filter-repo (Recommended)**
```bash
# Install git-filter-repo if needed
pip install git-filter-repo

# Remove sensitive files from all history
git filter-repo --invert-paths --path credentials.json --path google-services.json --path firebase.js
```

**Option B: Using BFG Repo-Cleaner**
```bash
# Download BFG Repo-Cleaner from https://rtyley.github.io/bfg-repo-cleaner/
bfg --delete-files credentials.json --delete-files google-services.json
```

### 3. Force Push (Only if private repo)
If your repository is private and only accessible to trusted team members:
```bash
git push origin --force-with-lease
```

**WARNING:** Force pushing rewrites history. Only do this if:
- Repository is private
- All team members are aware
- You're the sole contributor or have team agreement

### 4. Verify Changes
```bash
# Verify files are removed from history
git log --all --full-history -- credentials.json google-services.json

# Should show: "fatal: your current branch 'master' does not have any commits yet"
```

## Prevention Going Forward

✅ Files are now in `.gitignore`
✅ `.env.example`, `credentials.example.json`, `google-services.example.json` created
✅ `firebase.js` updated to use environment variables
✅ `SECURITY.md` documentation added

## Team Communication

Notify team members to:
1. Pull the latest code with cleaned history
2. Use new credentials from updated `.env` files
3. Never commit sensitive files

---

**Status:** Git history has been scrubbed of `credentials.json`, `google-services.json`, and prior `firebase.js` blobs; `firebase.js` is restored using env vars only and was force-pushed to GitHub. **You still must rotate/regenerate keys in Firebase Console and Android keystore** (section 1) — history cleanup does not invalidate already-leaked secrets.
