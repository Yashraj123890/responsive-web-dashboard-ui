import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { signInWithGoogle } from "../services/authService";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      onLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Sign in with your Google account to continue.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleLogin}>
          Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};
