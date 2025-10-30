"use client";

import SectionWrapper from "@/components/layout/section-wrapper";
import { Typewriter } from "motion-plus/react";

type HeroTitleProps = {
  topText?: string;
  mainText?: string;
  bottomText?: string;
};

export default function HomeHero({
  topText = "Welcome to",
  mainText = "HelloWorld",
  bottomText = "web studio",
}: HeroTitleProps) {
  return (
    <SectionWrapper className="text-black lowercase flex flex-col justify-center text-start md:text-center min-h-screen py-0 self-center items-center">
      <div className="flex flex-col text-center">
        <h1 className="flex flex-col text-start sm:min-w-md">
          <span className="text-base pl-2 text-neutral-700 sm:text-xl uppercase tracking-tight">
            {topText}
          </span>
          <Typewriter
            as="span"
            className="text-4xl capitalize sm:text-7xl tracking-wide font-semibold"
            cursorStyle={{
              background: "#ff0088",
              width: 3,
            }}
          >
            {mainText}
          </Typewriter>
          <span className="text-base pl-2 text-neutral-700 sm:text-xl uppercase tracking-tight">
            {bottomText}
          </span>
        </h1>
      </div>
    </SectionWrapper>
  );
}
