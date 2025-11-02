import { Loader2 } from 'lucide-react';

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <Loader2 className="h-11 w-11 animate-spin text-gray-500" />
    </div>
  );
}