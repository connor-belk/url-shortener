import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/50 z-50 flex flex-col items-center justify-center gap-10">
      <div className="animate-pulse h-10 w-28 rounded-full bg-slate-300/80 flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
