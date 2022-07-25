import React from "react";
import Container from "@/components/layouts/Container";
import Button from "@/components/core/Button";

const EditorTopbar = () => {
  return (
    <div className="py-2 border-b bg-white text-sm">
      <Container>
        <div className="flex -mx-2 justify-between">
          <div className="px-2">
            <div className="flex -mx-2">
              <div className="px-2">
                <Button pageRefresh destination="/drafts" variant="transparent">
                  Back
                </Button>
              </div>
              <div className="px-2">
                <Button withoutDestination variant="transparent">
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="flex -mx-2">
              <div className="px-2">
                <Button withoutDestination variant="ghost">
                  Preview
                </Button>
              </div>
              <div className="px-2">
                <Button
                  withoutDestination
                  variant="primary"
                  className="border border-theme-primary"
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditorTopbar;
