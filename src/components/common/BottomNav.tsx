// src/components/common/BottomNav.tsx
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    135deg,
    rgba(21, 21, 32, 0.98) 0%,
    rgba(30, 30, 46, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  padding: ${({ theme }) => theme.spacing.sm} 0;
  z-index: 100;
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }

  /* Safe area for devices with notches */
  padding-bottom: calc(${({ theme }) => theme.spacing.sm} + env(safe-area-inset-bottom));
`;

const BottomNavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

const BottomNavItem = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-width: 60px;
  position: relative;
  flex: 1;
  max-width: 120px;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   width: ${({ $isActive }) => ($isActive ? '40px' : '0')};
  //   height: 3px;
  //   background: ${({ theme }) => theme.gradients.primary};
  //   border-radius: 0 0 ${({ theme }) => theme.borderRadius.sm} ${({ theme }) => theme.borderRadius.sm};
  //   transition: width 0.3s ease;
  // }

  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   width: ${({ $isActive }) => ($isActive ? '40px' : '0')};
  //   height: ${({ $isActive }) => ($isActive ? '40px' : '0')};
  //   background: ${({ theme }) => theme.colors.primary}15;
  //   border-radius: ${({ theme }) => theme.borderRadius.full};
  //   transition: all 0.3s ease;
  //   z-index: -1;
  // }

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.primary : theme.colors.textLight};
  }
`;

const BottomNavIcon = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }

  ${({ $isActive }) => $isActive && `
    transform: translateY(-2px);
    svg {
      filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
    }
  `}

  ${BottomNavItem}:active & {
    transform: scale(0.9);
  }
`;

const BottomNavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ $isActive, theme }) => 
    $isActive ? theme.fontWeight.semibold : theme.fontWeight.medium};
  white-space: nowrap;
  transition: font-weight 0.3s ease;
`;

interface BottomNavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  links: BottomNavLink[];
}

export const BottomNav = ({ links }: BottomNavProps) => {
  const location = useLocation();

  return (
    <BottomNavContainer>
      <BottomNavContent>
        {links.map((link) => {
          const isActive = location.pathname === link.to || 
            (link.to !== '/' && location.pathname.startsWith(link.to));
          
          return (
            <BottomNavItem
              key={link.to}
              to={link.to}
              $isActive={isActive}
            >
              <BottomNavIcon $isActive={isActive}>{link.icon}</BottomNavIcon>
              <BottomNavLabel $isActive={isActive}>{link.label}</BottomNavLabel>
            </BottomNavItem>
          );
        })}
      </BottomNavContent>
    </BottomNavContainer>
  );
};

