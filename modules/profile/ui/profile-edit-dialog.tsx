import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileEditForm from "./profile-edit-form";
import { User } from "@/types";

interface ProfileEditDialogProps {
  targetUser: User;
  setOpen: any;
}

export default function ProfileEditDialog({
  targetUser,
  setOpen,
}: ProfileEditDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Profile</DialogTitle>
      </DialogHeader>

      <ProfileEditForm targetUser={targetUser} setOpen={setOpen} />
    </DialogContent>
  );
}
