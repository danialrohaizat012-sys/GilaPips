# GilaPips admin

Open `/admin/` on the deployed website and sign in with the owner's Google account. This creates only the Firebase Authentication identity; the admin page does not create a client profile or verification request.

To provision an admin, verify the exact email and UID in Firebase Authentication. In Firestore Console, create `admins/{UID}` with the boolean field `enabled: true`. Do not use the email as the document ID. This grants access to all verification requests and review actions; only provision trusted administrators. Client code cannot create or edit admin roles.

To revoke access, set `enabled: false` in the Console. Firestore rules enforce authorization on each operation. The UI checks access on login and when Semak semula is pressed.

Public learning pages remain accessible without authentication. Membership approval does not yet grant PITIS access. Admin portal lists up to 50 pending requests per load; completed requests leave the pending queue.

Verification: JavaScript syntax checked. Full admin approval/rejection flow requires a provisioned administrator and real or explicitly authorized test requests.
