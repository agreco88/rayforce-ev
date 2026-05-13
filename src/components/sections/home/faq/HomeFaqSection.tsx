import HomeFaq from "./HomeFaq";

type Props = {
  id?: string;
};

export function HomeFaqSection({ id }: Props) {
  return (
    <section
      id={id}
      className="
        relative
        border-t border-neutral-900
        bg-neutral-950
      "
    >
      <HomeFaq />
    </section>
  );
}
