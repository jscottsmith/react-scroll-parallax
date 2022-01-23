import React, { useRef, useEffect } from 'react';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    // happens after return
    ref.current = value;
  }, [value]);
  return ref.current;
};

const useUpdate = (update, value) => {
  const previousValue = usePrevious(value);
  return update ? value : previousValue;
};

export const AddonPanel = ({
  active,
  children
}) => {
  return (
    /*#__PURE__*/
    // the transform is to prevent a bug where the content would be invisible
    // the hidden attribute is an valid html element that's both accessible and works to visually hide content
    React.createElement("div", {
      hidden: !active,
      style: {
        transform: 'translateX(0px)'
      }
    }, useUpdate(active, children))
  );
};
AddonPanel.displayName = "AddonPanel";