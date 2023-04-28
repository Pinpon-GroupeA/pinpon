import { User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user?: User) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inUnprotectedGroup = segments[0] === '(unprotected)';

    if (
      // If the user is not signed in and the initial segment is not anything in the unprotected group.
      !user &&
      !inUnprotectedGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inUnprotectedGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments]);
};

export default useProtectedRoute;
