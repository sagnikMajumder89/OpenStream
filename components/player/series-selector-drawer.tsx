import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { SeasonEpisode, SeriesSeason } from "@/lib/interface";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface SeriesSelectorDrawerProps {
  selected: SeasonEpisode;
  setSelected: (seasonEpisode: SeasonEpisode) => void;
  seasons: SeriesSeason[];
}

export default function SeriesSelectorDrawer({
  selected,
  setSelected,
  seasons,
}: SeriesSelectorDrawerProps) {
  const handleSeasonChange = (direction: "next" | "prev") => {
    if (selected.seasonNumber == 1 && direction === "prev") {
      return;
    }
    if (selected.seasonNumber == seasons.length && direction === "next") {
      return;
    }
    const newSeasonNumber =
      direction === "next"
        ? selected.seasonNumber + 1
        : selected.seasonNumber - 1;
    setSelected({
      seasonNumber: newSeasonNumber,
      episodeNumber: 1,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center gap-2 cursor-pointer bg-accent px-4 py-2 mb-2 rounded-xl">
        <span>Season {selected.seasonNumber}</span>
        <ChevronDown />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select Season</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-row m-10 items-center justify-center gap-4">
              {selected.seasonNumber > 1 ? (
                <ChevronLeft
                  className="w-[2.5rem] h-[2.5rem] cursor-pointer"
                  onClick={() => handleSeasonChange("prev")}
                />
              ) : (
                <div className="w-[2.5rem] h-[2.5rem]" />
              )}
              <span className="text-[3rem] font-bold text-foreground">
                {selected.seasonNumber}
              </span>
              {selected.seasonNumber < seasons.length ? (
                <ChevronRight
                  className="w-[2.5rem] h-[2.5rem] cursor-pointer"
                  onClick={() => handleSeasonChange("next")}
                />
              ) : (
                <div className="w-[2.5rem] h-[2.5rem]" />
              )}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="flex flex-col w-full items-center justify-center gap-4 mb-4">
            <Button className="min-w-[20rem]" variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
