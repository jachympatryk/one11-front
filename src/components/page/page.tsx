import React, { ReactNode } from 'react';

type PageComponentProps = {
  children: ReactNode;
};

export const PageComponent: React.FC<PageComponentProps> = ({ children }) => {
  return <>{children}</>;
};
