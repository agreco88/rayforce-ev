"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useTranslations } from "next-intl";

export function DemoVideoModal() {
  const t = useTranslations("Common.DemoVideo");

  return (
    <Dialog>
      <DialogHeader className="sr-only">
        <DialogTitle>Video de demostracion</DialogTitle>
      </DialogHeader>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="
            flex items-center gap-2
            px-4 py-2
            text-white/70 hover:text-white
            hover:bg-white/5
            transition-all duration-300
            cursor-pointer
          "
        >
          <HiOutlinePlayCircle className="size-5" />
          <span>{t("cta")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] !max-w-[1400px] p-0 overflow-hidden rounded-2xl">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/Hf8oBAU07Ko?autoplay=1"
            title={t("title")}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
