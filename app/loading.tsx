"use client";

import React from "react";

const loading = () => {
  return (
    <div className="bg-dark-1 flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="w-20 h-20 rounded-full border-l border-t border-primary-500 animate-spin" />
    </div>
  );
};

export default loading;
