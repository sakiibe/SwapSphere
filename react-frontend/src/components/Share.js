import React from "react";

function Share() {
  const url = window.location.href; // Get page URL
  const text = "Check out this amazing product!";

  return (
    <div className="mt-4 flex items-center">
      <span className="mr-4">Share:</span>

      {/* Facebook Share Button */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-facebook-6.svg").default
          }
          alt="Facebook"
          className="w-5 h-5"
        />
      </a>

      {/* Messenger Share Button */}
      <a
        href={`https://www.facebook.com/dialog/send?link=${url}&app_id=1601543886921602`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <img
          src={
            require("../images/Share-buttons/iconmonstr-facebook-messenger-4.svg")
              .default
          }
          alt="Messenger"
          className="w-5 h-5"
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
            require("../images/Share-buttons/iconmonstr-twitter-4.svg").default
          }
          alt="Twitter"
          className="w-5 h-5"
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
            require("../images/Share-buttons/iconmonstr-pinterest-4.svg")
              .default
          }
          alt="Pinterest"
          className="w-5 h-5"
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
          className="w-5 h-5"
        />
      </a>
    </div>
  );
}

export default Share;
