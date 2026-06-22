import * as api from '@/api';
import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function useApi() {
  const [status, setStatus] = useState('idle');
  const { getAccessToken } = useAuth();

  const wrappedMethods = useMemo(() => {
    const apiEntries: [string, any][] = Object.entries(api);
    const methods: Record<string, Function> = {
      getStatus: () => status,
      isLoading: () => status === 'loading',
    };

    for (const [, module] of apiEntries) {
      for (const [methodName, method] of Object.entries(module) as [string, (...a: any[]) => any][]) {
        methods[methodName] = async (...args: any[]) => {
          setStatus('loading');
          try {
            const result = await method(...args, getAccessToken()); // live token, read per-call
            setStatus('success');
            return result;
          } catch (error) {
            setStatus('error');
            throw error;
          }
        };
      }
    }
    return methods;
  }, [getAccessToken]);

  return wrappedMethods;
}