import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

interface PasswordDialogProps {
  setPassword: (password: string) => void;
  open?: boolean;
  onClose?: () => void;
}

export default function PasswordDialog({
  setPassword,
  open,
  onClose,
}: PasswordDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Content Not Available!</AlertDialogTitle>
          <AlertDialogDescription>
            Copy righted content is not available. Kindly go to the authorized
            streaming service to watch this content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder="Send feedback..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Close & Send</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
