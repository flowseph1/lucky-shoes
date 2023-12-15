import React from "react";

const Logo = () => {
  return (
    <div className="relative mr-16 flex items-center">
      <div className="logo-shadow animate-flicker font-madi text-[4rem] text-logo -rotate-12">
        Lucky
      </div>

      <div className="absolute logo-shadow animate-flicker font-madi text-[3rem] text-logo-secondary -rotate-12 left-[3rem] top-[3rem]">
        Shoes
      </div>
      {/* <div className="logo-shadow2 font-candy text-sm text-logo-secondary"> HN</div> */}
    </div>
  );
};

export default Logo;
