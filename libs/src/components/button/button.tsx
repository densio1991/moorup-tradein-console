import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  rounded?: boolean;
  block?: boolean;
  color?: string;
  btnType?: 'solid' | 'outline' | 'default' | 'dark';
  size?: 'small' | 'medium' | 'large' | 'full';
}

export const Button = ({
  title,
  className,
  children,
  block = false,
  color = 'secondary',
  btnType = 'solid',
  size = 'medium',
  onClick,
  ...props
}: ButtonProps) => {

  const btnTextColor = 'text-white';
  const btnHoverClass = 'hover:text-secondary hover:bg-transparent';

  let sizeClass;
  let roundedClass;
  switch (size) {
    case 'small':
      sizeClass = 'text-sm font-regular py-1 px-3';
      roundedClass = 'rounded-md';
      break
    case 'large':
      sizeClass = 'text-lg font-semibold py-3 px-8';
      roundedClass = 'rounded-lg';
      break;
    case 'full':
      sizeClass = 'text-lg font-semibold py-3 px-8';
      roundedClass = 'rounded-full';
      break;
    default: // medium
      sizeClass = 'text-md font-medium py-2 px-6';
      roundedClass = 'rounded-md';
      break;
  }

  let btnTypeClass;
  let disabledClass;
  switch (btnType) {
    case 'default':
      btnTypeClass = 'text-gray-700 bg-gray-100 hover:bg-gray-200 ring-gray-200';
      disabledClass = 'disabled:bg-gray-200 disabled:text-gray-400';
      break;
    case 'dark':
      btnTypeClass = 'text-white bg-gray-800 hover:bg-primary-800 ring-gray-800';
      disabledClass = 'disabled:bg-gray-600 disabled:ring-gray-600';
      break;
    case 'outline':
      btnTypeClass = 'text-secondary bg-transparent hover:text-white hover:bg-secondary ring-secondary';
      disabledClass = 'disabled:bg-gray-200 disabled:text-gray-400 disabled:ring-gray-400';
      break;
    default: // solid
      btnTypeClass = `${btnTextColor} ${btnHoverClass} bg-secondary ring-secondary`;
      disabledClass = 'disabled:bg-gray-500 disabled:hover:text-white disabled:ring-gray-500';
      break;
  }

  return (
    <button
      type="button"
      className={classNames(
        'my-1',
        'ring-1',
        'justify-center',
        'transition-all',
        'disabled:cursor-not-allowed',
        'dynamic-btn',
        {'w-full': block},
        sizeClass,
        roundedClass,
        btnTypeClass,
        disabledClass,
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children || title}
    </button>
  );
}
