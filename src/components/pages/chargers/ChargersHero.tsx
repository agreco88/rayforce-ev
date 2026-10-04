import { getTranslations } from "next-intl/server";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";

export async function ChargersHero() {
  const t = await getTranslations("ChargersPage.Hero");

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[
          { label: t("breadcrumb.home"), href: "/" },
          {
            label: t("breadcrumb.chargers"),
            dropdown: [
              {
                href: "/cargadores",
                label: t("breadcrumb.chargers"),
                current: true,
              },
              {
                href: "/accesorios",
                label: t("breadcrumb.accessories"),
              },
            ],
          },
        ]}
      />
      <div className="flex flex-col pb-5">
        <h1 className="text-3xl sm:text-6xl font-semibold">{t("title")}</h1>
        <p className="text-neutral-400 max-w-2xl sm:max-w-4xl sm:py-4">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
