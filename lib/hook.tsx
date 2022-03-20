import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';



// Custom hook to read  auth record and user profile doc
const useUserData = () => {

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<any>(null);
    console.log(user)

  useEffect(() => {
    // turn off realtime subscription
    
    let unsubscribe;
         
        if (user) {
            // const ref = firestore.collection('users').doc(user.uid);
            const ref = doc(getFirestore(), 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
              setUsername(doc.data()?.username);
      
            });
          } else {
            setUsername(null);
          }
      
          return unsubscribe;
        }, [user]);

  return { user, username };
}

export default useUserData;