"use client";

import React from "react";

const LiveStatus = () => {
  return (
    <>
      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-sm text-gray-600 mr-15">Live</span>
    </>
  );
};

const OfflineStatus = () => {
  return (
    <>
      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
      <span className="text-sm text-gray-600 mr-15">Offline</span>
    </>
  );
};

type HeaderProps = {
  isLive: boolean;
};

const Header = ({ isLive }: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 ml-2 sm:ml-12 mr-4">
      <div className="mb-3 sm:mb-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
          Thirsty Plant
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Monitor your plant&apos;s moisture levels
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {isLive ? <LiveStatus /> : <OfflineStatus />}
      </div>
    </div>
  );
};

export default Header;
