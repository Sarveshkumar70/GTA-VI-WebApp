import React, { useState } from "react";
import IMAGES from "./assets/images/images";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";

function App() {
  const [toggle, setToggle] = useState(false);

  // loading screen animation 
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.in",
      transformOrigin: "50% %50",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        // removes svg
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setToggle(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(()=>{
    const mainElement = document.querySelector(".main");
    mainElement?.addEventListener("mousemove",function (e) {
      const xMove =( e.clientX / window.innerWidth - 0.5 ) * 40;
      // console.log(xMove);
      gsap.to(".main .text",{
        x:`${xMove*0.4}%`
      });
      gsap.to(".sky",{
        x:xMove 
      });
      gsap.to(".bg",{
        x:xMove * 1.7
      });
    })

  },[toggle]);



  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href={IMAGES.BG_IMG}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {toggle && (
        <div className="main w-full ">
          <div className="relative landing w-full h-screen bg-black">
            {/* navbar */}
            <div className="absolute top-0 left-0 w-full px-10 py-10 flex justify-between items-center z-30">
              <div className="text-5xl text-white  hover:text-amber-100 hover:cursor-pointer transition-colors duration-700 ease-in-out">
                VI
              </div>
              <div className="flex flex-col gap-2 cursor-pointer group">
                <div className="bg-white w-8 h-2 group-hover:bg-amber-100 transition-colors duration-700 ease-in-out"></div>
                <div className="bg-white w-8 h-2 group-hover:bg-amber-100 transition-colors duration-700 ease-in-out"></div>
              </div>
            </div>
            {/* Imgs */}
            <div className="imgDiv relative w-full h-screen overflow-hidden">
              <img
                className="absolute bg scale-105 top-0 left-0  w-full h-full object-fill z-10"
                src={IMAGES.BG_IMG}
                alt="bg-img"
              />
              <img
                className="absolute sky scale-[1.5] top-0 left-0  w-full h-full object-fill"
                src={IMAGES.SKY_BG_IMG}
                alt="sky-bg-img"
              />
              {/* gta text */}
              <div className="text absolute flex flex-col gap-5 top-8 left-[50%] -translate-x-[50%] text-white z-20 opacity-85 " >
                <h2 className="text-8xl -ml-20" >Grand</h2>
                <h2 className="text-8xl ml-20" >Theft</h2>
                <h2 className="text-8xl -ml-20" >Auto</h2>
              </div>
              <img
                className="absolute w-[30%] -bottom-[20%] left-1/2 transform -translate-x-1/2 z-20 "
                src={IMAGES.GIRL_IMG}
                alt="Lucia-img"
              />
            </div>
            {/* bottom bar */}
            <div className="absolute  bottom-0 left-0 flex justify-between items-center gap-5 w-full px-10 py-6 z-30 bg-gradient-to-t from-black to-transparent ">
              <div className="flex gap-5">
                <div className="bg-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-amber-100 cursor-pointer">
                  <i className="ri-arrow-down-line"></i>
                </div>
                <h3 className="text-2xl text-white hover:text-amber-100 transition-colors duration-700 ease-in-out">
                  Scroll Down
                </h3>
              </div>
                <img
                  className="w-[16%]"
                  src={IMAGES.CONSOLE_IMG}
                  alt="ps5 and Xbox"
                />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
