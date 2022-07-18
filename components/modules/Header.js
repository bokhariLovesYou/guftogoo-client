import React, { useEffect } from "react";
import Container from "@/components/wrappers/Container";
import Button from "@/components/core/Button";
import Link from "next/link";
import ProfileMenu from "@/components/modules/ProfileMenu";
import { useAppContext } from "@/context/AppWrapper";

const Header = () => {
  const { handlers, user } = useAppContext();
  useEffect(() => {
    handlers.checkLogin();
  }, []);
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
            {user.isLoading ? (
              <div className="animate-pulse">
                <div className="w-48 bg-white h-10 rounded"></div>
              </div>
            ) : (
              <>
                {user.isLoggedIn && <ProfileMenu />}
                {!user.isLoggedIn && (
                  <div className="flex -mx-2">
                    <div className="px-2">
                      <Button destination="/login">Login</Button>
                    </div>
                    <div className="px-2">
                      <Button destination="/create-account" variant="secondary">
                        Sign up
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
