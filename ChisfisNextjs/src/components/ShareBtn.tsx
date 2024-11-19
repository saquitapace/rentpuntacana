import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
  EmailIcon,

} from "react-share";

const ShareBtn = ({ text, url, title }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getIconSize = (size) => (window.innerWidth < 640 ? 32 : size);


  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    });
  };

  return (
    <>
      <span
        className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        {text && <span className="hidden sm:block ml-2.5">{text}</span>}
      </span>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/3 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={toggleModal}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-neutral-700 dark:text-neutral-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Share with your friends
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              
              <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={window.innerWidth < 640 ? 32 : 48} round={true} />
              </FacebookShareButton>

              {/* There were some issues so i just skipped the facebooks messenger share option  */}

              {/* <FacebookMessengerShareButton
                appId={appId}
                redirectUri={redirectUri}
                to={recipientId} // Facebook user ID of the recipient
                url={url}
              >
                <FacebookMessengerIcon size={window.innerWidth < 640 ? 32 : 48} round={true} />
              </FacebookMessengerShareButton> */}
              
              
              <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={getIconSize(48)} round={true} />
              </TwitterShareButton>
              
              <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={getIconSize(48)} round={true} />
              </WhatsappShareButton>
              
              <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={getIconSize(48)} round={true} />
              </LinkedinShareButton>
              
              <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={getIconSize(48)} round={true} />
              </TelegramShareButton>
              
              <EmailShareButton url={url} subject={title}>
                <EmailIcon size={getIconSize(48)} round={true} />
              </EmailShareButton>
              <div className="flex flex-col">
              <div>
                {isCopied && <span className="text-sm text-green-500 ml-2">Link copied</span>}
                </div>
              <span
                onClick={copyLinkToClipboard}
                className=" cursor-pointer p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <img 
                  src="/linkIcon.png" 
                  alt="Icon" 
                  width={getIconSize(40)}
                  
                />
                
              </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareBtn;