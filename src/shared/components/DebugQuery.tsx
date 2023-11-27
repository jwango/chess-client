export const DebugQuery = <T,> ({ data, isLoading = false }: { data: T, isLoading?: boolean }) => {
  return <div className="max-h-[300px] overflow-y-auto">
    {isLoading && <p>Loading...</p>}
    {!isLoading && data && <pre>
      {JSON.stringify(data, null, 2)}
    </pre>}
  </div>;
};
