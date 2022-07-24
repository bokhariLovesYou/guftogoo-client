import React, { Fragment } from "react";
import Avatar from "@/components/core/Avatar";
import { Menu, Transition } from "@headlessui/react";
import { useAppContext } from "@/context/AppWrapper";

const ProfileMenu = () => {
  const { handlers, user } = useAppContext();
  let avatarImage;
  if (user.avatar) {
    avatarImage = {
      src: `${process.env.NEXT_PUBLIC_MEDIA_URL}${user.avatar.url}`,
      alt: user.avatar.alternativeText,
    };
  }
  return (
    <>
      {user && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="">
            <Avatar size="small" image={avatarImage} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 mb-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-gray-100 " : ""
                      } group flex w-full items-center rounded-md px-2 py-3 text-sm text-left relative`}
                    >
                      <a href={`/users/${user.username}`} className="absolute inset-0"></a>
                      <div className="Timeline__Card__Header">
                        <div className="flex -mx-1 items-center">
                          <div className="px-1">
                            <div className="mr-1">
                              <Avatar image={avatarImage} />
                            </div>
                          </div>
                          <div className="px-1">
                            <div className="mb-1 truncate w-32">
                              <span className="font-bold text-theme-heading">
                                {user?.firstName} {user?.lastName}
                              </span>
                            </div>
                            <div className="truncate w-32">
                              <span>{user?.username}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-theme-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm relative`}
                    >
                      <DraftsIcon />
                      <a href={`/drafts`} className="absolute inset-0"></a>
                      My Drafts
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-theme-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm relative`}
                    >
                      <a href={`/settings`} className="absolute inset-0"></a>
                      <SettingsIcon />
                      Account settings
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1 mt-1 border-t">
                <Menu.Item onClick={() => handlers.handleLogout()}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-theme-primary text-white" : "text-red-500"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <LogoutIcon />
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
};

const DraftsIcon = () => {
  return (
    <svg className="w-6 h-6 mr-2 fill-current dark:text-zp-white" css="" viewBox="0 0 384 512">
      <path
        fill="currentColor"
        d="M365.3 125.3 258.8 18.8C246.7 6.742 230.5 0 213.5 0H64C28.65 0 0 28.65 0 64l.006 384c0 35.35 28.65 64 64 64H320c35.35 0 64-28.65 64-64V170.5c0-17-6.7-33.2-18.7-45.2zM224 34.08c4.477 1.566 8.666 3.846 12.12 7.299l106.5 106.5c3.48 3.421 5.78 7.621 7.28 12.121H240c-8.8 0-16-7.2-16-16V34.08zM352 448c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h128v112c0 26.5 21.5 48 48 48h112v256zM96.82 360.1a15.883 15.883 0 0 0-4.342 8.113l-12.16 60.79c-2.217 11.11 7.574 20.91 18.69 18.68l60.79-12.15a15.867 15.867 0 0 0 8.109-4.344l122.2-122.2c7.559-7.555 12.82-17.37 13.76-28.02 1.158-13.14-3.432-25.7-12.62-34.88l-8.172-8.176c-7.559-7.559-17.37-12.83-28.01-13.78-13.14-1.172-25.7 3.414-34.89 12.59L96.82 360.1zm51.98 45.2-32.72 6.539 6.543-32.71 86.22-86.23 26.18 26.18L148.8 405.3zm93.8-146.1c4.652-4.645 12.19-4.652 16.84.004l9.338 9.336c4.641 4.64 4.668 12.18-.004 16.84l-11.22 11.22-26.18-26.18L242.6 259.2z"
      ></path>
    </svg>
  );
};

const SettingsIcon = () => {
  return (
    <svg className="w-6 h-6 mr-2 fill-current dark:text-zp-white" css="" viewBox="0 0 496 512">
      <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"></path>
    </svg>
  );
};

const LogoutIcon = () => {
  return (
    <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 512 512">
      <path d="M48 64h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48zm279 19.5l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l132 131.4H172c-6.6 0-12 5.4-12 12v10c0 6.6 5.4 12 12 12h279.9L320 404.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l164.5-164c4.7-4.7 4.7-12.3 0-17L344 83.5c-4.7-4.7-12.3-4.7-17 0z"></path>
    </svg>
  );
};

export default ProfileMenu;
