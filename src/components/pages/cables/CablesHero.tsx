import { getTranslations } from "next-intl/server";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";

export async function CablesHero() {
  const t = await getTranslations("CablesPage.Hero");

  return (
    <div className="flex flex-col">
      <AppBreadcrumb
        items={[
          { label: t("breadcrumb.home"), href: "/" },
          {
            label: t("breadcrumb.cables"),
            dropdown: [
              {
                href: "/cables",
                label: t("breadcrumb.cables"),
                current: true,
              },
              {
                href: "/cargadores",
                label: t("breadcrumb.chargers"),
              },
            ],
          },
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
