import { House, RotateCw, ShieldAlert } from "lucide-react";
import { Button } from "./button";

interface ErrorProps {
  message?: string;
  button?: string;
}

export default function Error({ message, button }: ErrorProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <ShieldAlert className="w-16 h-16 text-red-600 mt-4" />
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
      </div>
      <p className="text-gray-700 mt-2">
        {message || "An unexpected error occurred."}
      </p>
      {button === "home" ? (
        <Button
          className="cursor-pointer mt-4"
          variant={"secondary"}
          onClick={() => (window.location.href = "/")}
        >
          <House />
          <span>Go Home</span>
        </Button>
      ) : (
        <Button
          className="cursor-pointer mt-4"
          variant={"secondary"}
          onClick={() => window.location.reload()}
        >
          <RotateCw />
          <span>Try Reloading</span>
        </Button>
      )}
    </div>
  );
}
