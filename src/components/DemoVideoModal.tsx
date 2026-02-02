"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useTranslations } from "next-intl";

export function DemoVideoModal() {
  const t = useTranslations("Common.DemoVideo");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="      flex items-center justify-center
      px-8 py-6
      text-neutral-500
      hover:text-neutral-100
      hover:border-neutral-800
      transition-all duration-400
      w-full sm:w-auto
    "
        >
          <HiOutlinePlayCircle />
          <span className="ml-1.5">{t("cta")}</span>
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
