"use client"
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserAvatar = () => {
  const { user } = useUser(); 


  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={''} alt="Avatar" />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
