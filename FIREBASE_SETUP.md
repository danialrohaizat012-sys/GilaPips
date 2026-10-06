# GilaPips Firebase setup
1. Firebase Console > gilapips > Authentication > Get started. Enable Email/Password and Google (select support email).
2. Authentication > Settings > Authorized domains: add danialrohaizat012-sys.github.io (hostname only).
3. Create Cloud Firestore in production mode. Pick database location deliberately; it cannot be changed afterwards.
4. Firestore > Rules: paste firestore.rules and Publish. Do not use test-mode allow-all rules.
5. Test register, verify email, log out/login, Google and reset password on the deployed site.

Only users' own members/{uid} profile can be accessed. No client can set roles or PITIS approval. PITIS entitlement is not integrated yet.
SDK pinned to 12.3.0. Web config is frontend config, not an admin credential. Storage has not been enabled by this change.
