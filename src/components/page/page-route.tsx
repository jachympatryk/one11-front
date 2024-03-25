import React from 'react';

type PageRouteProps = {
    element: React.ReactElement;
};

export const PageRoute: React.FC<PageRouteProps> = ({ element }) => element;
