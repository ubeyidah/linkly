import React, { Suspense } from "react";
import Wrapper from "./wrapper";
import Image from "next/image";
import Link from "next/link";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import { syncUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  if (user) await syncUser(); // TODO: use webhooks for production
  return (
    <header className="border-b py-3 bg-gradient-to-tl from-card/50 via-card/5 to-card/50 border-card backdrop-blur-3xl sticky top-0 z-30">
      <Wrapper className="flex justify-between items-center gap-4">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={32} height={32} />
        </Link>

        <div>
          <Suspense fallback="loading...">
            <DesktopNavbar />
          </Suspense>
          <Suspense fallback="loading...">
            <MobileNavbar />
          </Suspense>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
