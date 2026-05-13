import React from 'react';

export const IntroLogo = () => {
  return (
    <header className="w-full">
      <div className="mt-xl mb-2xl flex flex-row items-center ">
        <img
          src="/img/logo.png"
          className="block mx-auto w-16 sm:w-20 md:w-24"
        />
        <h1 className="ml-lg w-full text-3xl sm:text-4xl md:text-5xl mb-0">
          React Scroll Parallax
        </h1>
      </div>
    </header>
  );
};
