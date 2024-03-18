import { useState } from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { StyledIcon } from '../styled';

interface CopyToClipboardButtonProps {
  textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  textToCopy,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copiedText = (
    <span className="absolute z-10 left-5 bg-gray-600 py-0.5 px-2 rounded-md text-white ml-1 text-xs">Copied!</span>
  );

  const copyIcon = (
    <div className="flex items-center relative px-1">
      <StyledIcon icon={faCopy} color='#666666' />
      {isCopied && copiedText}
    </div>
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button onClick={copyToClipboard} aria-label="copy">
      {copyIcon}
    </button>
  );
};

export { CopyToClipboardButton };
