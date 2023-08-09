import React from "react";

const RightSidebar = () => {
  return (
    <div className="hidden xl:block sticky top-0 right-0 z-10 w-fit h-screen bg-dark-2 text-light-1 pt-24 pb-5 border-l border-l-dark-4 overflow-y-auto">
      <div className="h-full grid grid-cols-1 gap-12 px-8">
        <div className="flex flex-col gap-7">
          <h3 className="text-light-1 font-medium">Suggested Communities</h3>

          <div className="w-[300px]">bbb</div>
        </div>

        <div className="flex flex-col gap-7">
          <h3 className="text-light-1 font-medium">Similar Minds</h3>

          <div className="w-[300px]">bbb</div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
