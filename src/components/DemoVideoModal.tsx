"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiOutlinePlayCircle } from "react-icons/hi2";

export function DemoVideoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:text-white  py-6! min-w-50 cursor-pointer"
        >
          <HiOutlinePlayCircle />
          <span className="ml-1.5">Ver demostración</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] !max-w-[1400px] p-0 overflow-hidden rounded-2xl">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/Hf8oBAU07Ko?autoplay=1"
            title="Rayforce EV – Demostración"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
