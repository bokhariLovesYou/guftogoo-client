import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";
import { useAppContext } from "@/context/AppWrapper";

const Avatar = ({ image, size, editable, name, label }) => {
  const { user, handlers, recentlyUploadedImages } = useAppContext();
  const [media, setMedia] = useState(null);
  const [uploadMedia, setUploadMedia] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });

  const handleUploadMedia = () => {
    setUploadMedia((prevState) => ({ ...prevState, isLoading: true }));
    const url = `${process.env.NEXT_PUBLIC_API_URL}/upload`;
    const formData = new FormData();
    Object.entries(media).forEach(([key, value]) => {
      formData.append("files", value);
    });
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setUploadMedia((prevState) => ({
          ...prevState,
          response: res.data.data,
        }));
        console.log(res.data.data);
        handlers.handleSetRecentlyUploadedImages(`avatar`, res.data[0]);
      })
      .then(sleeper(300))
      .then(() => {
        setUploadMedia((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        setUploadMedia((prevState) => ({ ...prevState, isError: true, isLoading: false }));
      });
  };

  useEffect(() => {
    if (!media) return;
    if (!user) return;
    handleUploadMedia();
  }, [media]);

  const clx = `
    ${size === `small` ? `w-10 h-10` : ``}
    ${size === `default` ? `w-12 h-12` : ``}
    ${size === `medium` ? `w-15 h-15` : ``}
    ${size === `large` ? `w-20 h-20` : ``}
    ${size === `extraLarge` ? `w-28 h-28` : ``}
    `;
  return (
    <>
      {editable && (
        <>
          {label && (
            <label htmlFor={name}>
              <span className="text-sm mb-2 block">{label}</span>
            </label>
          )}

          <div className={`${clx} relative`}>
            {uploadMedia.isLoading && (
              <div
                className={`flex flex-col items-center animate-pulse justify-center ${clx} text-gray-700 uppercase bg-gray-200 border rounded-full shadow cursor-pointer`}
              ></div>
            )}
            {!uploadMedia.isLoading && (
              <>
                {image && image.src && !media && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: "100px" }}
                    src={image.src}
                    alt={image.alt}
                    sizes="50vw"
                  />
                )}
                {recentlyUploadedImages.avatar ? (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: "100px" }}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${recentlyUploadedImages.avatar.url}`}
                    alt={recentlyUploadedImages.avatar.alternativeText}
                    sizes="50vw"
                  />
                ) : (
                  <>
                    {user.avatar === null && (
                      <div
                        className={`flex flex-col items-center justify-center ${clx} text-gray-700 uppercase bg-white border rounded-full shadow cursor-pointer`}
                      >
                        <svg
                          className="w-6 h-6 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"></path>
                        </svg>
                        <span className="mt-2 text-[9px] font-semibold leading-normal">
                          Upload Photo
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            <input
              type="file"
              onChange={(event) => {
                setMedia(event.target.files);
              }}
              files={media}
              accept=".png, .jpg, .jpeg"
              className="inset-0 absolute w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </>
      )}
      {!editable && (
        <>
          {image && image.src && (
            <div className={`${clx} relative`}>
              <Image
                layout="fill"
                // placeholder="blur"
                objectFit="cover"
                style={{ borderRadius: "100px" }}
                src={image.src}
                alt={image.alt}
                sizes="50vw"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Avatar;

Avatar.defaultProps = {
  size: `default`,
  image: {
    src: `/images/light.jpeg`,
    alt: ``,
  },
  editable: false,
};
