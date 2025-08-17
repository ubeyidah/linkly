import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <ThemeSwitcher />
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant={"secondary"}>Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
};

export default page;
