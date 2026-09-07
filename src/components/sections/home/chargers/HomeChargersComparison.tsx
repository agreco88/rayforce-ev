import { ChargersGrid } from "./ChargersGrid";

type Props = {
  id?: string;
};

export function HomeChargersSection({ id }: Props) {
  return (
    <div id={id}>
      <ChargersGrid />
    </div>
  );
}
