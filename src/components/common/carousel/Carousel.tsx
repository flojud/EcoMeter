import { Box } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { ICarousleSlideBox } from "../../../interfaces/Types";
import Item from "./Item";

interface CarouselProps {
  slides: ICarousleSlideBox[];
}
const Carousel = ({ slides }: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <Box sx={{ overflow: "hidden", py: 2 }} ref={emblaRef}>
      <Box sx={{ display: "flex" }}>
        {slides.map((slide, index) => (
          <Item key={index} slide={slide} />
        ))}
      </Box>
    </Box>
  );
};
export default Carousel;
