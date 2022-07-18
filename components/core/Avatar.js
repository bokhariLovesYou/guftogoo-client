import React from "react";
import Image from "next/image";

const Avatar = ({ image, size }) => {
  const clx = `
    ${size === `small` ? `w-10 h-10` : ``}
    ${size === `default` ? `w-12 h-12` : ``}
    ${size === `medium` ? `w-15 h-15` : ``}
    ${size === `large` ? `w-20 h-20` : ``}
    `;
  return (
    <>
      {image.src && (
        <div className={`${clx} relative`}>
          <Image
            layout="fill"
            // placeholder="blur"
            style={{ borderRadius: "100px" }}
            src={image.src}
            alt={image.alt}
            sizes="50vw"
          />
        </div>
      )}
    </>
  );
};

export default Avatar;

Avatar.defaultProps = {
  size: `default`,
  image: {
    src: `/qDAyv6PK_.png`,
    alt: ``,
  },
};
