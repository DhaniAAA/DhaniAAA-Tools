import { supabase, SUPABASE_URL } from './supabaseClient.js';

const DEFAULT_WEBHOOK = `${SUPABASE_URL}/functions/v1/check-unlockable-capsules`;

export async function triggerUnlockCheck() {
  try {
    const response = await fetch(DEFAULT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ manual: true }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('[notificationService] Failed to trigger unlock check', error);
    throw error;
  }
}

export async function subscribeToRealtimeUnlocks(userId, callback) {
  if (!userId) return () => {};

  const channel = supabase
    .channel('capsule-unlocks')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'capsules',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        if (typeof callback === 'function') {
          callback(payload.new);
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.info('[notificationService] Listening for unlock updates');
      }
    });

  return () => {
    supabase.removeChannel(channel);
  };
}
