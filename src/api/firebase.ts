import { FirebaseApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { signInWithEmailAndPassword, User, Auth, getAuth } from "firebase/auth";

export type TFirebaseError = {
  error: boolean;
  errorCode?: string;
  errorMsg?: string;
};

export type TStatus = {
  createdAt: number;
  email: string;
  emailVerified: boolean;
  expires: number;
  expired: boolean;
  uid: string;
  lastName: string;
  firstName: string;
};

export type TSignInWithEmailAndPassword = {
  user: User & { accessToken?: string };
};

type TMonitorAuthStateFcn = (authState: boolean, errorCode?: string) => void;

export const fb = {
  signInWithEmailAndPassword: (
    app: FirebaseApp,
    email: string,
    password: string
  ) => {
    return new Promise<TSignInWithEmailAndPassword>((resolve, reject) => {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve({ user: userCredential.user });
        })
        .catch((error) => {
          reject({
            error: true,
            errorCode: error.code,
            errorMsg: error.message,
          });
        });
    });
  },

  monitorAuthStateFcn: (app: FirebaseApp, cb: TMonitorAuthStateFcn) => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      if (user) {
        cb(true);
      } else {
        cb(false, "auth/no-user");
      }
    });
  },

  getUserStatus: (app: FirebaseApp, uid: string) => {
    return new Promise<TStatus | null>(async (resolve, reject) => {
      const db = getDatabase(app);
      const dbRef = ref(db, `users/${uid}`);
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const status = snapshot.val();
          resolve(status);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject({ error: true, errorCode: "user-status-fetch-error" });
      }
    });
  },
};

export default fb;
