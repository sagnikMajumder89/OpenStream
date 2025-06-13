import { LoaderCircle } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <LoaderCircle className="animate-spin w-8 h-8 mx-auto mt-20" />
      <p className="text-center text-muted mt-4">Loading...</p>
    </div>
  );
}
