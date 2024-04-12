import React from 'react';

interface Props {
  children: React.ReactNode;
}

function MainButton({ children }: Props) {
  return <button className="">{children}</button>;
}

export default MainButton;
