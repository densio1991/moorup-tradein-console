/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';
import { isImageUrl } from '../../helpers';

const StyledInputContainer = styled.div<{ error?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.error ? '0px' : '20px')};
  width: 100%;
`;

const StyledInputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: inherit;
`;

const StyledInputField = styled.input<{ error?: boolean }>`
  padding: 10px;
  border: 1px solid ${(props) => (props.error ? '#f44336' : '#ccc')};
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  padding-right: 30px; /* Added padding for the icon */

  &:focus,:hover {
    border-color: #01463a;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
`;

const HoverImage = styled.img<{ positionX: number; positionY: number }>`
  position: fixed;
  top: ${(props) => props.positionY}px;
  left: ${(props) => props.positionX}px;
  z-index: 1;
  margin-top: 10px;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  cursor: pointer;
  color: #ccc;

  :hover {
    color: #01463a;
  }
`;

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  name: string;
  enableHoverImage?: boolean;
  value: any;
}

export function StyledInput({
  label,
  type,
  placeholder,
  error,
  errorMessage,
  name,
  enableHoverImage,
  value,
  onBlur,
  ...inputProps
}: StyledInputProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleHover = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsHovered(true);
    setPositionX(e.clientX);
    setPositionY(e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageError = () => {
    setIsValidImage(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate image URL
  useEffect(() => {
    const validateImageUrl = async () => {
      if (enableHoverImage && value) {
        const isValid = await isImageUrl(value);
        setIsValidImage(isValid);
      }
    };
    validateImageUrl();
  }, [enableHoverImage, value]);

  return (
    <StyledInputContainer error={error}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInputField
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        onMouseEnter={(enableHoverImage && !isEmpty(value)) ? handleHover : undefined}
        onMouseMove={(enableHoverImage && !isEmpty(value)) ? handleHover : undefined}
        onMouseLeave={(enableHoverImage && !isEmpty(value)) ? handleMouseLeave : undefined}
        value={value}
        {...inputProps}
      />
      {type === 'password' && (
        <EyeIcon onClick={toggleShowPassword}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </EyeIcon>
      )}
      {(error || (enableHoverImage && isHovered && !isValidImage)) && (
        <ErrorMessage>
          {(enableHoverImage &&
            isHovered &&
            !isValidImage &&
            !isEmpty(value) &&
            'Invalid image url.') ||
            errorMessage}
        </ErrorMessage>
      )}
      {enableHoverImage && isHovered && isValidImage && !isEmpty(value) && (
        <HoverImage
          src={value}
          alt="Hovered Image"
          positionX={positionX}
          positionY={positionY}
          onError={handleImageError}
        />
      )}
    </StyledInputContainer>
  );
}
