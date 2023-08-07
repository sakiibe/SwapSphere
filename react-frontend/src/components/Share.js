import React from "react";

function Share() {
  const url = window.location.href; // Get page URL
  const text = "Check out this amazing product!";
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return (
    <div className="mt-4 flex items-center">
      {/* <span className="mr-4 text-base text-black font-medium border-b">
        Share
      </span> */}

      {/* Facebook Share Button */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-facebook-5.svg").default
          }
          alt="Facebook"
          className="w-10 h-10"
        />
      </a>

      {/* Messenger Share Button */}
      <a
        href={`https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=1601543886921602&redirect_uri=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-facebook-messenger-5.svg")
              .default
          }
          alt="Messenger"
          className="w-10 h-10"
        />
      </a>

      {/* Twitter Share Button */}
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-twitter-5.svg").default
          }
          alt="Twitter"
          className="w-10 h-10"
        />
      </a>

      {/* Pinterest Share Button */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${url}&description=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-pinterest-5.svg")
              .default
          }
          alt="Pinterest"
          className="w-10 h-10"
        />
      </a>

      {/* Email Share Button */}
      <a
        href={`mailto:?subject=${text}&body=${text} - ${url}`}
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-gmail-5.svg").default
          }
          alt="Email"
          className="w-10 h-10"
        />
      </a>
    </div>
  );
}

export default Share;
