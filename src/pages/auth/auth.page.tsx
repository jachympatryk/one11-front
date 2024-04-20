import { createClient, Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { syncUserWithBackend } from '../../server/user/user.server.ts';

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL as string,
  import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY as string
);

export const AuthPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const updateSessionAndSyncUser = async (session: Session | null) => {
      setSession(session);
      if (session?.user) {
        try {
          await syncUserWithBackend({
            auth_id: session.user.id,
            email: session.user.email as string,
          });
        } catch (error) {
          console.error('error:', error);
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSessionAndSyncUser(session).then();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      updateSessionAndSyncUser(session).then();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        theme="dark"
        providers={['email']}
        appearance={{ theme: ThemeSupa }}
      />
    );
  } else {
    navigate('/app');
  }
};
