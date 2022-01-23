import cx from 'classnames';
import React, { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { BgContainer } from '../bg-container';

export const ElementProgress = () => {
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const exited = !entered;
  return (
    <BgContainer>
      <Parallax
        onProgressChange={(progress) => setProgress(progress)}
        onEnter={() => setEntered(true)}
        onExit={() => setEntered(false)}
        className="relative rounded-lg bg-gray-600 bg-opacity-50"
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center border-2 border-gray-400 border-solid bg-gray-600 rounded-lg">
          <p className="text-center font-bold">Parallax Element</p>
        </div>

        <div className="relative flex items-center justify-center h-48 w-48">
          <div
            className={cx('absolute -top-48 text-sm p-sm rounded-md', {
              'bg-green-300': entered,
              'bg-gray-500': !entered,
            })}
          >
            <div>Top entered:</div>
            <div
              className={cx('font-medium text-xl text-center', {
                'text-white': !entered,
              })}
            >
              {entered.toString()}
            </div>
            <div className="absolute left-1/2 top-full border-dotted border-gray-400 border-r-2 h-48" />
          </div>

          <div
            className="absolute flex items-center -left-48 text-sm bg-yellow-300 p-sm rounded-md"
            style={{
              top: `${(progress * 100).toFixed(2)}%`,
              height: 80,
              marginTop: -40,
            }}
          >
            <div>
              <div className="w-full">Progress</div>
              <div className="font-medium text-xl text-right tabular-nums">
                {progress.toFixed(3)}
              </div>
            </div>
            <div
              className="absolute left-full top-1/2 border-dotted border-gray-400 border-b-2 w-48"
              style={{ marginTop: -1 }}
            />
          </div>

          <div
            className={cx('absolute -bottom-48 text-sm p-sm rounded-md', {
              'bg-red-300': exited,
              'bg-gray-500': !exited,
            })}
          >
            <div>Bottom exited:</div>
            <div
              className={cx('font-medium text-xl text-center', {
                'text-white': !exited,
              })}
            >
              {exited.toString()}
            </div>
            <div className="absolute left-1/2 bottom-full border-dotted border-gray-400 border-r-2 h-48" />
          </div>
        </div>
      </Parallax>
    </BgContainer>
  );
};
