export const DebugQuery = <T,> ({ data, isLoading = false }: { data: T, isLoading?: boolean }) => {
  return <div>
    {isLoading && <p>Loading...</p>}
    {!isLoading && data && <pre>
      {JSON.stringify(data, null, 2)}
    </pre>}
  </div>;
};
