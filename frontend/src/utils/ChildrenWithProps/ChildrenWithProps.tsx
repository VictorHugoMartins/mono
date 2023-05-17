import React from 'react';

export default function ChildrenWithProps(children: React.ReactNode, props: any) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props });
    }
    return child;
  });

  return childrenWithProps;
} 