export default function Loading() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-700 rounded"></div>
      <div className="h-40 bg-gray-800 rounded"></div>
      <div className="h-40 bg-gray-800 rounded"></div>
    </div>
  );
}