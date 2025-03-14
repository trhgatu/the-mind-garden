import React from 'react';
import { Loader2 } from 'lucide-react';
import styled from 'styled-components';

export interface I_LoadingProps {
  full?: boolean;
  block?: boolean;
  className?: string;
  color?: 'blue' | 'purple' | 'green' | 'red' | 'gray';
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse' | 'book';
  text?: string;
}

interface BookSpinnerProps {
  size: 'small' | 'medium' | 'large';
  color: 'blue' | 'purple' | 'green' | 'red' | 'gray';
}

interface SpinnerDivProps {
  color: BookSpinnerProps['color'];
}

const BookSpinner = styled.div<BookSpinnerProps>`
  .spinner {
    position: relative;
    width: ${(props: BookSpinnerProps) => props.size === 'small' ? '20px' : props.size === 'medium' ? '33.6px' : '48px'};
    height: ${(props: BookSpinnerProps) => props.size === 'small' ? '20px' : props.size === 'medium' ? '33.6px' : '48px'};
    perspective: ${(props: BookSpinnerProps) => props.size === 'small' ? '40px' : props.size === 'medium' ? '67.2px' : '96px'};
  }

  .spinner div {
    width: 100%;
    height: 100%;
    background: ${(props: SpinnerDivProps) => {
      switch (props.color) {
        case 'blue': return '#3B82F6';
        case 'purple': return '#8B5CF6';
        case 'green': return '#10B981';
        case 'red': return '#EF4444';
        case 'gray': return '#6B7280';
        default: return '#3B82F6';
      }
    }};
    position: absolute;
    left: 50%;
    transform-origin: left;
    animation: spinner-16s03x 2s infinite;
  }

  .spinner div:nth-child(1) {
    animation-delay: 0.15s;
  }

  .spinner div:nth-child(2) {
    animation-delay: 0.3s;
  }

  .spinner div:nth-child(3) {
    animation-delay: 0.45s;
  }

  .spinner div:nth-child(4) {
    animation-delay: 0.6s;
  }

  .spinner div:nth-child(5) {
    animation-delay: 0.75s;
  }

  @keyframes spinner-16s03x {
    0% {
      transform: rotateY(0deg);
    }
    50%, 80% {
      transform: rotateY(-180deg);
    }
    90%, 100% {
      opacity: 0;
      transform: rotateY(-180deg);
    }
  }
`;

export function Loading({
  full = false,
  block = false,
  className = '',
  color = 'blue',
  size = 'medium',
  variant = 'spinner',
  text,
  ...rest
}: I_LoadingProps) {
  const sizeClasses = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  const colorClasses = {
    background: 'text-background',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    green: 'text-green-500',
    red: 'text-red-500',
    gray: 'text-gray-500',
  };

  const renderSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <Loader2
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        {...rest}
      />
      {text && <p className={`mt-2 text-sm font-medium ${colorClasses[color]}`}>{text}</p>}
    </div>
  );

  const renderDots = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="flex space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-full ${colorClasses[color]} animate-bounce`}
            style={{
              width: size === 'small' ? '0.5rem' : size === 'medium' ? '0.75rem' : '1rem',
              height: size === 'small' ? '0.5rem' : size === 'medium' ? '0.75rem' : '1rem',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
      {text && <p className={`mt-2 text-sm font-medium ${colorClasses[color]}`}>{text}</p>}
    </div>
  );

  const renderPulse = () => (
    <div className="flex flex-col items-center justify-center">
      <div className={`${colorClasses[color]} animate-pulse flex flex-col items-center`}>
        <div
          className={`${sizeClasses[size]} rounded-full border-4 ${colorClasses[color]} border-opacity-25`}
          style={{
            borderTopColor: 'currentColor',
            borderRadius: '50%'
          }}
        />
      </div>
      {text && <p className={`mt-2 text-sm font-medium ${colorClasses[color]}`}>{text}</p>}
    </div>
  );

  const renderBook = () => (
    <div className="flex flex-col items-center justify-center">
      <BookSpinner color={color} size={size}>
        <div className="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </BookSpinner>
      {text && <p className={`mt-2 text-sm font-medium ${colorClasses[color]}`}>{text}</p>}
    </div>
  );

  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'book':
        return renderBook();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  if (full) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-80 z-50">
        {renderLoading()}
      </div>
    );
  } else if (block) {
    return (
      <div className={`w-full py-8 flex items-center justify-center ${className}`}>
        {renderLoading()}
      </div>
    );
  } else {
    return renderLoading();
  }
}