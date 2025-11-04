
import React from 'react';
import { Platform, ServiceType } from '../types';
import { Instagram, Youtube, Twitter, Facebook, Telegram, Tiktok, ThumbsUp, UserPlus, Eye, MessageSquare, Users } from './icons';

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 24, className }) => {
  const icons: Record<Platform, React.ElementType> = {
    [Platform.Instagram]: Instagram,
    [Platform.TikTok]: Tiktok,
    [Platform.YouTube]: Youtube,
    [Platform.X]: Twitter,
    [Platform.Facebook]: Facebook,
    [Platform.Telegram]: Telegram,
  };
  const IconComponent = icons[platform];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};

interface ServiceTypeIconProps {
    type: ServiceType;
    size?: number;
    className?: string;
}

export const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ type, size = 20, className }) => {
    const icons: Record<ServiceType, React.ElementType> = {
        [ServiceType.Likes]: ThumbsUp,
        [ServiceType.Followers]: UserPlus,
        [ServiceType.Views]: Eye,
        [ServiceType.Comments]: MessageSquare,
        [ServiceType.Subscribers]: Users,
    };
    const IconComponent = icons[type];
    return IconComponent ? <IconComponent size={size} className={className} /> : null;
}
