import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { UserButtonClient } from "./user-button-client";

const DesktopNavbar = async () => {
  const user = await currentUser();
  return (
    <nav className="hidden md:flex items-center gap-4">
      <ThemeSwitcher />
      <Link href={"/"} className={cn(buttonVariants({ variant: "ghost" }))}>
        <HomeIcon className="size-4" />
        <span className="hidden lg:inline">Home</span>
      </Link>
      {user ? (
        <>
          <Link
            href={"/notifications"}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <BellIcon className="size-4" />
            <span className="hidden lg:inline">Notifications</span>
          </Link>
          <Link
            href={`/profile/${
              user.username || user.emailAddresses[0].emailAddress.split("@")[0]
            }`}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <UserIcon className="size-4" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
          <UserButtonClient />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      )}
    </nav>
  );
};

export default DesktopNavbar;
