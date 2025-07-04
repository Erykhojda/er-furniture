// firebase/auth.ts
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

// Konwersja Firebase User na nasz AuthUser
export const convertFirebaseUser = (user: User): AuthUser => ({
    id: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    photoURL: user.photoURL || undefined
});

// Rejestracja z email/password
export const registerWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string
): Promise<AuthUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    const authUser = convertFirebaseUser(userCredential.user);

    // Zapisz dodatkowe dane użytkownika w Firestore
    await setDoc(doc(db, 'users', authUser.id), {
        name: authUser.name,
        email: authUser.email,
        createdAt: new Date().toISOString(),
        photoURL: authUser.photoURL
    });

    return authUser;
};

// Logowanie z email/password
export const loginWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<AuthUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return convertFirebaseUser(userCredential.user);
};

// Logowanie z Google
export const loginWithGoogle = async (): Promise<AuthUser> => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const authUser = convertFirebaseUser(userCredential.user);

    // Sprawdź czy użytkownik już istnieje w Firestore
    const userDoc = await getDoc(doc(db, 'users', authUser.id));

    if (!userDoc.exists()) {
        // Jeśli nie istnieje, utwórz nowy dokument
        await setDoc(doc(db, 'users', authUser.id), {
            name: authUser.name,
            email: authUser.email,
            createdAt: new Date().toISOString(),
            photoURL: authUser.photoURL
        });
    }

    return authUser;
};

// Wylogowanie
export const logout = async (): Promise<void> => {
    await signOut(auth);
};