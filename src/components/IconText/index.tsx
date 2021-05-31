import type { FC } from 'react';
import React from 'react';
import {  StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

export const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };