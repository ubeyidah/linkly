"use client";

import { UserButton } from "@clerk/nextjs";

export function UserButtonClient() {
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: { userButtonAvatarBox: "w-8 h-8" },
      }}
    />
  );
}
