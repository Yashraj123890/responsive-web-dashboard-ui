Build a web app called *SmartClaim AI* for automated insurance claim processing.

🎯 Goal:
Enable three user types — *User (patient), **Hospital, and **Insurance Company* — each with their own dashboard to upload, view, and verify insurance claims using AI.

---

🏗 Core Architecture:
- Framework: React or Next.js (with Tailwind CSS for UI)
- Backend: Firebase (Authentication, Firestore, Storage)
- Deployment: Firebase Hosting
- Integration hooks for future Cloud Run (OCR, NLP, ML)

---

🧑‍💼 Roles and Dashboards:

1️⃣ *User Dashboard (Patient)*
   - Register/Login (Firebase Auth)
   - Upload insurance documents (bills, discharge summaries, prescriptions)
   - Files are uploaded to Firebase Storage → /uploads/users/{userid}/
   - After upload, show a progress indicator “Analyzing your claim…”
   - Display claim details pulled from Firestore:
     - Extracted text summary
     - Key fields: Name, Policy ID, Amount, Date, Hospital Name
     - AI prediction result: “Approved / Review Needed”
   - Option to view past claims in a table with status and upload date.

2️⃣ *Hospital Dashboard*
   - Login via Firebase Auth with “hospital” role
   - View claims submitted by patients for their hospital
   - Approve, reject, or request clarification
   - Can upload supporting medical records
   - Updates reflected in Firestore (Claim Status field)

3️⃣ *Insurance Dashboard*
   - Login via Firebase Auth with “insurer” role
   - View all verified hospital claims
   - Filter by hospital, claim type, or policy ID
   - Approve and finalize payouts
   - Dashboard graphs: claims processed, approval rate, total payout

---

⚙ Firebase Integration:
- Authentication with 3 roles (user, hospital, insurance)
- Firestore collections:
  - claims: stores all claim data
  - users: profile info + role
- Storage buckets for uploads
- Realtime updates on claim status

---

🎨 UI Design:
- Minimal clean dashboard (white background, accent color #0078FF)
- Role-based side navigation:
  - “My Claims” for users
  - “Verify Claims” for hospitals
  - “Analytics” for insurers
- Responsive for desktop and mobile

---

🧩 Backend placeholders (for Cloud Run integration later):
- analyzeClaim(fileUrl) → triggers AI pipeline (OCR, NLP, XGBoost)
- When claim analysis is complete, results auto-populate Firestore.

---

📦 Output:
Generate a functional multi-role Firebase web app with:
- Auth + role management
- Separate dashboards for User, Hospital, and Insurance
- File upload → Storage → Firestore linkage
- Placeholder API calls for OCR and AI results
