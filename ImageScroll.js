import React from "react";

// Define a context with all images from the 'companies' folder
const companyImagesContext = require.context(
  "../../assets/images/companies",
  false,
  /\.(png|jpe?g|svg)$/
);

// Get an array of company image file names
const companyImageFileNames = companyImagesContext.keys();

// Import and display company images dynamically
const ImageScroll = () => {
  return (
    <div
      x-data="{}"
      x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <ul
        x-ref="logos"
        className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
      >
        {companyImageFileNames.map((fileName, index) => {
          const imagePath = companyImagesContext(fileName);
          return (
            <li key={index}>
              <img
                className="w-fit aspect-[3/0] object-contain 2xl:w-auto brightness-0 invert"
                src={imagePath}
                alt={`Company Image ${index + 1}`}
              />
            </li>
          );
        })}
      </ul>
      <ul
        x-ref="logos"
        className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {companyImageFileNames.map((fileName, index) => {
          const imagePath = companyImagesContext(fileName);
          return (
            <li key={index}>
              <img
                className="w-fit aspect-[3/0] object-contain 2xl:w-auto brightness-0 invert"
                src={imagePath}
                alt={`Company Image ${index + 1}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageScroll;
