import { getTranslations } from "next-intl/server";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";

export async function ChargersHero() {
  const t = await getTranslations("ChargersPage.Hero");

  return (
    <div className="flex flex-col px-4 sm:px-0">
      <AppBreadcrumb
        items={[
          { label: t("breadcrumb.home"), href: "/" },
          { label: t("breadcrumb.chargers") },
        ]}
      />
      <div className="flex flex-col py-7 gap-2.5">
        <h1 className="text-3xl sm:text-6xl font-medium">{t("title")}</h1>
        <p className="text-neutral-400 max-w-2xl sm:max-w-4xl sm:py-4">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
