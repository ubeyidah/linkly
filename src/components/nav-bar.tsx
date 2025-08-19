import React, { Suspense } from "react";
import Wrapper from "./wrapper";
import Image from "next/image";
import Link from "next/link";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
  return (
    <header className="border-b py-3 bg-background/40 backdrop-blur-3xl sticky top-0">
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
