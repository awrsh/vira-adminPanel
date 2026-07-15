"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];

export interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  opts?: Parameters<typeof useEmblaCarousel>[0];
  showControls?: boolean;
  showDots?: boolean;
}

function Carousel({
  children,
  className,
  opts,
  showControls = true,
  showDots = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    ...opts,
  });
  const [selected, setSelected] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={cn("relative", className)} data-slot="carousel">
      <div ref={emblaRef} className="overflow-hidden rounded-surface">
        <div className="flex touch-pan-y">{children}</div>
      </div>
      {showControls ? (
        <>
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            className="absolute top-1/2 start-2 z-[1] -translate-y-1/2 shadow-float-sm"
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            className="absolute top-1/2 end-2 z-[1] -translate-y-1/2 shadow-float-sm"
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="size-4 rtl:rotate-180" />
          </Button>
        </>
      ) : null}
      {showDots && count > 1 ? (
        <div className="mt-3 flex justify-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "size-1.5 rounded-full transition-all",
                i === selected
                  ? "w-4 bg-primary"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60",
              )}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CarouselSlide({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="carousel-slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full px-1", className)}
    >
      {children}
    </div>
  );
}

export { Carousel, CarouselSlide, type CarouselApi };
