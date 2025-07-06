import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from './config';

interface NewsletterSubscriber {
    email: string;
    subscribedAt: Timestamp;
    isActive: boolean;
    language?: string;
}

interface NewsletterSubscriberInput {
    email: string;
    subscribedAt: ReturnType<typeof serverTimestamp>;
    isActive: boolean;
    language?: string;
}

const COLLECTION_NAME = 'newsletter_subscribers';

export const subscribeToNewsletter = async (
    email: string,
    language: string = 'pl'
): Promise<{ success: boolean; message: string; alreadyExists?: boolean }> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('email', '==', email.toLowerCase().trim())
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return {
                success: false,
                message: 'Ten adres email jest już zapisany do newslettera!',
                alreadyExists: true
            };
        }

        const subscriberData: NewsletterSubscriberInput = {
            email: email.toLowerCase().trim(),
            subscribedAt: serverTimestamp(),
            isActive: true,
            language
        };

        await addDoc(collection(db, COLLECTION_NAME), subscriberData);

        console.log('Newsletter subscription added:', email);

        return {
            success: true,
            message: 'Dziękujemy za subskrypcję! Sprawdź swoją skrzynkę email.'
        };

    } catch (error) {
        console.error('Error subscribing to newsletter:', error);

        return {
            success: false,
            message: 'Wystąpił błąd podczas zapisywania. Spróbuj ponownie.'
        };
    }
};

export const getAllSubscribers = async (): Promise<NewsletterSubscriber[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as NewsletterSubscriber & { id: string }));
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return [];
    }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('email', '==', email.toLowerCase().trim())
        );

        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
};

export const unsubscribeFromNewsletter = async (email: string): Promise<boolean> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('email', '==', email.toLowerCase().trim())
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0];
            await updateDoc(docRef.ref, { isActive: false });
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return false;
    }
};