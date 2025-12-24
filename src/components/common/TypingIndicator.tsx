// src/components/common/TypingIndicator.tsx
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 60%, 100% {
    opacity: 1;
  }
  30% {
    opacity: 0.4;
  }
`;

const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
`;

const TypingDots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: ${pulse} 1.4s infinite;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

interface TypingIndicatorProps {
  userName: string;
}

export const TypingIndicator = ({ userName }: TypingIndicatorProps) => {
  return (
    <TypingIndicatorContainer>
      <span>{userName} is typing</span>
      <TypingDots>
        <Dot />
        <Dot />
        <Dot />
      </TypingDots>
    </TypingIndicatorContainer>
  );
};

