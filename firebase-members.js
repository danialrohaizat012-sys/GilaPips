
const $=id=>document.getElementById(id);const dialog=$('member-dialog');
$('member-open').onclick=()=>{dialog.showModal();document.querySelector('nav').classList.remove('open');};
$('member-close').onclick=()=>dialog.close();
const config={apiKey:"AIzaSyD1DVagJs2Tzfhou-7Yiz3dM-Zz_FAA7HY",authDomain:"gilapips.firebaseapp.com",projectId:"gilapips",storageBucket:"gilapips.firebasestorage.app",messagingSenderId:"1008903422324",appId:"1:1008903422324:web:6174b01279ccb415afac21"};
let auth,db,A,F;const buttons=[...dialog.querySelectorAll('button')].filter(b=>b.id!=='member-close');
const status=t=>$('auth-status').textContent=t;
const errors={"auth/unauthorized-domain":"Domain website belum dibenarkan dalam Firebase Auth.","auth/operation-not-allowed":"Kaedah login ini belum diaktifkan dalam Firebase.","auth/invalid-credential":"Email atau password tidak tepat.","auth/email-already-in-use":"Email ini sudah didaftarkan. Cuba login.","auth/weak-password":"Gunakan password sekurang-kurangnya 8 aksara.","auth/popup-blocked":"Browser menyekat popup Google. Benarkan popup atau guna email.","auth/popup-closed-by-user":"Login Google dibatalkan.","auth/network-request-failed":"Sambungan gagal. Cuba semula.","auth/too-many-requests":"Terlalu banyak percubaan. Cuba semula kemudian."};
async function run(fn){buttons.forEach(b=>b.disabled=true);status('Sila tunggu…');try{await ready;await fn();}catch(e){status(errors[e.code]||'Tindakan belum berjaya. Sila cuba semula atau hubungi Danial.');}finally{buttons.forEach(b=>b.disabled=false);}}
const ready=(async()=>{
 const [app,a,f]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js')]);A=a;F=f;const initialized=app.initializeApp(config);auth=A.getAuth(initialized);db=F.getFirestore(initialized);
 A.onAuthStateChanged(auth,async user=>{
 $('signed-out').hidden=!!user;$('signed-in').hidden=!user;$('member-open').textContent=user?'Akaun Saya':'Daftar / Login';
 if(!user){$('member-info').textContent='';$('profile-status').textContent='';return;}
 $('member-info').textContent=(user.displayName||'Ahli GilaPips')+' · '+user.email;$('verify-email').hidden=user.emailVerified||user.providerData.some(p=>p.providerId==='google.com');$('member-password').value='';
 $('profile-status').textContent='Menyemak profil…';
 try{const ref=F.doc(db,'members',user.uid);const snap=await F.getDoc(ref);if(!snap.exists()){await F.setDoc(ref,{displayName:user.displayName||$('member-name').value.trim()||'Ahli GilaPips',email:user.email,createdAt:F.serverTimestamp(),updatedAt:F.serverTimestamp(),consentVersion:'2026-10-06'});}if(auth.currentUser?.uid===user.uid)$('profile-status').textContent='Profil ahli disimpan.';}
 catch(e){if(auth.currentUser?.uid===user.uid)$('profile-status').textContent='Login berjaya, tetapi profil belum dapat disimpan. Tetapan Firestore perlu disemak.';}
 });
})();ready.catch(()=>{status('Sambungan Firebase gagal dimuatkan. Semak internet dan cuba semula.');});
function credentials(){const email=$('member-email').value.trim(),password=$('member-password').value;if(!$('member-form').reportValidity())throw Error('invalid form');return{email,password};}
$('member-form').onsubmit=e=>{e.preventDefault();run(async()=>{const c=credentials();await A.signInWithEmailAndPassword(auth,c.email,c.password);status('Login berjaya.');});};
$('email-register').onclick=()=>{if(!$('member-consent').checked){status('Sila bersetuju dengan penyimpanan profil untuk mendaftar.');return;}run(async()=>{const c=credentials();const result=await A.createUserWithEmailAndPassword(auth,c.email,c.password);const name=$('member-name').value.trim();if(name)await A.updateProfile(result.user,{displayName:name});$('member-info').textContent=(name||'Ahli GilaPips')+' · '+c.email;status('Akaun berjaya didaftarkan.');try{await A.sendEmailVerification(result.user);status('Akaun didaftarkan. Semak email untuk pengesahan.');}catch{status('Akaun didaftarkan. Anda boleh hantar pengesahan email kemudian.');}});};
$('google-login').onclick=()=>{if(!$('member-consent').checked){status('Sila bersetuju dengan penyimpanan profil untuk teruskan dengan Google.');return;}run(async()=>{await A.signInWithPopup(auth,new A.GoogleAuthProvider());status('Login Google berjaya.');});};
$('reset-password').onclick=()=>run(async()=>{const email=$('member-email').value.trim();if(!email){status('Masukkan email dahulu.');return;}await A.sendPasswordResetEmail(auth,email);status('Jika akaun berkenaan tersedia, arahan reset akan dihantar melalui email.');});
$('verify-email').onclick=()=>run(async()=>{if(auth.currentUser)await A.sendEmailVerification(auth.currentUser);status('Email pengesahan dihantar.');});
$('logout').onclick=()=>run(async()=>{await A.signOut(auth);status('Anda sudah log keluar.');});
