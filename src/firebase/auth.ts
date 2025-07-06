import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    type User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './config';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
}

export const convertFirebaseUser = (user: User): AuthUser => ({
    id: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    photoURL: user.photoURL || undefined
});

export const registerWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string
): Promise<AuthUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    const authUser = convertFirebaseUser(userCredential.user);

    await setDoc(doc(db, 'users', authUser.id), {
        name: authUser.name,
        email: authUser.email,
        createdAt: new Date().toISOString(),
        photoURL: authUser.photoURL
    });

    return authUser;
};

export const loginWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<AuthUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return convertFirebaseUser(userCredential.user);
};

export const loginWithGoogle = async (): Promise<AuthUser> => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const authUser = convertFirebaseUser(userCredential.user);

    const userDoc = await getDoc(doc(db, 'users', authUser.id));

    if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', authUser.id), {
            name: authUser.name,
            email: authUser.email,
            createdAt: new Date().toISOString(),
            photoURL: authUser.photoURL
        });
    }

    return authUser;
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};