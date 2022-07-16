import React from "react";
import Container from "@/components/layouts/Container";
import Button from "@/components/core/Button";

const Header = () => {
  return (
    <header className="py-3 border-b">
      <Container>
        <div className="flex justify-between items-center -m-2">
          <div className="p-2">
            <span className="font-bold text-theme-primary text-xl">Guftogoo</span>
          </div>
          <div className="p-2">
            <div className="flex -mx-2">
              <div className="px-2">
                <Button>Login</Button>
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
