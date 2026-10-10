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
      <div className="flex flex-col sm:pb-5 gap-2.5">
        <h1 className="text-2xl sm:text-5xl sm:max-w-5xl font-semibold">
          {t("title")}
        </h1>
        <p className="text-neutral-400 max-w-2xl sm:max-w-4xl sm:py-4">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
