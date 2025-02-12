import React from "react";
// import { useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-btn";
import useEmblaCarousel from "embla-carousel-react";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="max-w-[48rem] m-auto [--slide-height:19rem] [--slide-spacing:1rem] [--slide-size:100%]  relative space-y-5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-[calc(--slide-spacing)*-1]">
          {/* {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))} */}
          {props.children}
        </div>
      </div>

      <div className="">
        <div className="flex justify-center gap-12">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

export function EmblaCarouselItem({ children }) {
  return (
    <div
      style={{ transform: "translate3d(0,0,0)" }}
      className="flex-[0_0_var(--slide-size)] min-w-0 pl-[--slide-spacing]"
    >
      <div className="embla_slide select-none flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
