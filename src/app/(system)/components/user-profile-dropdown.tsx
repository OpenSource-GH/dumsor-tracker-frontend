"use client";
import { signOut } from "@/app/actions/auth.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "boring-avatars";
import Link from "next/link";
import { toast } from "sonner";

export default function UserProfileDropdown() {

  const handleSignOut = async () => {
    const res = await signOut();
    if (res && res.error == "Failure to sign out") {
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-2">
            <Avatar
              size={30}
              name="Client"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-[90]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/settings`}>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialogTrigger className="w-full relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
            <DropdownMenuItem>
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogPortal>
        <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will log you out.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut}>
                  Continue
                </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
