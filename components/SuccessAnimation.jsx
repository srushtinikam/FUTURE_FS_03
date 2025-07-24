// components/SuccessAnimation.jsx

import React from "react";
import dynamic from "next/dynamic";
import successAnimation from "@/components/animations/success.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SuccessAnimation = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <Lottie
        animationData={successAnimation}
        loop={false}
        autoplay={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default SuccessAnimation;
