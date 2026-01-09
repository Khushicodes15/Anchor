export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      <div className="h-20 bg-white rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-40 bg-white rounded-2xl" />
        <div className="h-40 bg-white rounded-2xl" />
        <div className="h-40 bg-white rounded-2xl" />
      </div>
    </div>
  );
}