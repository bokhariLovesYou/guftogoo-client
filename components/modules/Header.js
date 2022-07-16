import React from "react";
import Container from "@/components/layouts/Container";
import Button from "@/components/core/Button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-3 border-b">
      <Container>
        <div className="flex justify-between items-center -m-2">
          <div className="p-2">
            <Link href="/">
              <span className="font-bold text-theme-primary text-xl cursor-pointer">Guftogoo</span>
            </Link>
          </div>
          <div className="p-2">
            <div className="flex -mx-2">
              <div className="px-2">
                <Button destination="/login">Login</Button>
              </div>
              <div className="px-2">
                <Button variant="secondary">Sign up</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
