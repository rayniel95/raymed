export async function filterPromises<T>(promises: Promise<T>[]): Promise<{
    resolved: T[];
    rejected: Error[] | null[];
  }> {
    return Promise.allSettled(promises)
      .then(results => {
        const resolved: T[] = [];
        const rejected: Error[] = [];
  
        results.forEach(result => {
          if (result.status === 'fulfilled') {
            resolved.push(result.value);
          } else if (result.status === 'rejected') {
            rejected.push(result.reason as Error);
          }
        });
  
        return { resolved, rejected };
      });
  }
  