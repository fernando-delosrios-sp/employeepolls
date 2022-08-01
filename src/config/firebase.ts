// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useDispatch } from "react-redux";

import {
	GoogleAuthProvider,
	EmailAuthProvider,
	UserCredential,
	GithubAuthProvider,
	getRedirectResult,
	sendSignInLinkToEmail,
	onAuthStateChanged,
	getAuth,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: "AIzaSyBiyAd10cPUoKmMxuaC_0mqHOUyima3fNA",
	authDomain: "udacity-c0a5c.firebaseapp.com",
	projectId: "udacity-c0a5c",
	storageBucket: "udacity-c0a5c.appspot.com",
	messagingSenderId: "892804046640",
	appId: "1:892804046640:web:eff0a1be43942de4f872f5",
	clientId:
		"900659013344-9u8sph9kctie5ofksvvsgcl83vd0r13o.apps.googleusercontent.com",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
// getRedirectResult(auth).then((auth: UserCredential | null) => {
// 	console.log("grr", auth);
// });

const handleFirebaseSignIn = (
	authResult: UserCredential,
	redirectUrl: string
): boolean => {
	try {
		return true;
	} catch (error) {
		console.log("Something went wrong processing login");
		return false;
	}
};

export const uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: (
			authResult: UserCredential,
			redirectUrl: string
		) => {
			console.log("user", JSON.stringify(authResult.user));
			return true;
		},
		signInFailure: (error: firebaseui.auth.AuthUIError) => {
			console.log("error", error.message);
		},
	},
	signInSuccessUrl: "/",
	signInOptions: [
		{
			provider: GoogleAuthProvider.PROVIDER_ID,
			scopes: ["openid", "email", "profile"],
			customParameters: {
				prompt: "select_account",
			},
		},
		{
			provider: GithubAuthProvider.PROVIDER_ID,
			scopes: ["read:user"],
		},
		{
			provider: EmailAuthProvider.PROVIDER_ID,
			// signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
		},
	],
};

const actionCodeSettings = {
	url: "http://localhost:3000/leaderboard",
	// This must be true.
	handleCodeInApp: true,
	dynamicLinkDomain: "localhost",
};

export const AuthUI = firebaseui.auth.AuthUI;
export { onAuthStateChanged };
export type { UserCredential };
