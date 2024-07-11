import React from 'react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../Components/Avatar/AvatarUtils';

interface CustomAvatarProps {
  name: string;
  src?: string;
  size?: number;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ name, src, size = 50 }) => {
  const avatarProps = src ? { src } : stringAvatar(name);
  return <Avatar {...avatarProps} style={{ width: size, height: size }} />;
};

export default CustomAvatar;
