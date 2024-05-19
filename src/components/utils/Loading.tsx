'use client';

import React from 'react';

type Props = {
  state: boolean;
  children: React.ReactNode;
};

const Loading = ({ state, children }: Props) => {
  if (!state) {
    return <>{children}</>;
  }

  return <></>;
};

export default Loading;
