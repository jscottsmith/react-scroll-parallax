import React from 'react';
import { PropsWithChildren } from 'react';

export const BgContainer = (props: PropsWithChildren<{}>) => {
  return (
    <div className="relative my-2xl bg-gray-900 px-lg py-96 w-full rounded-md px-bg text-black overflow-hidden">
      {/* <div className="h-screen" /> */}
      <div className="flex flex-row items-center justify-evenly w-full">
        {props.children}
      </div>
      {/* <div className="h-screen" /> */}
    </div>
  );
};
