import React from "react";
import Container from "@/components/layouts/Container";
import Button from "@/components/core/Button";

const EditorTopbar = ({ handleSave, unsavedChanges, savingLoading }) => {
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
                <div className="flex -mx-2 items-center">
                  <div className="px-2">
                    <Button
                      isLoading={savingLoading}
                      onClick={handleSave}
                      withoutDestination
                      variant="transparent"
                    >
                      Save
                    </Button>
                  </div>
                  <div className="px-2">
                    {savingLoading && <span className="text-sm">Saving...</span>}
                    {unsavedChanges > 0 && !savingLoading && (
                      <span className="text-sm">Unsaved Changes</span>
                    )}
                    {unsavedChanges === 0 && !savingLoading && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm flex pl-1">Saved</span>
                      </div>
                    )}
                  </div>
                </div>
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
