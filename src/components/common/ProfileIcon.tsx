import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileIconLink = styled(Link)<{ $hasImage?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $hasImage, theme }) => $hasImage ? 'transparent' : theme.gradients.primary};
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primaryLight};
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
    position: relative;
    z-index: 1;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  position: relative;
  z-index: 1;
`;

const AvatarInitials = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  position: relative;
  z-index: 1;
`;

const ProfileIconSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const getInitials = (name: string): string => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface ProfileIconProps {
  to: string;
  title?: string;
  avatarUrl?: string;
  userName?: string;
}

export const ProfileIcon = ({ to, title = 'View Profile', avatarUrl, userName }: ProfileIconProps) => {
  return (
    <ProfileIconLink to={to} title={title} $hasImage={!!avatarUrl}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={userName || 'Profile'} />
      ) : userName ? (
        <AvatarInitials>{getInitials(userName)}</AvatarInitials>
      ) : (
        <ProfileIconSvg />
      )}
    </ProfileIconLink>
  );
};

