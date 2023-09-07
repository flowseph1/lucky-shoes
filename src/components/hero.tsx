import { Button } from "@/components/ui";
import { HomeData } from "@/types";

export function Hero({ data }: { data: HomeData["hero"] }) {
  return (
    <div className="flex flex-col gap-10 rounded-b-3xl border-x-[1px] border-b-[1px] border-zinc-900 bg-neutral-500 px-[5rem] py-[10rem]">
      <h1
        className="max-w-5xl text-title font-bold text-zinc-400"
        dangerouslySetInnerHTML={{
          __html: data.headline,
        }}
      ></h1>
      <h2 className="text-subtitle text-zinc-500">{data.subheadline}</h2>
      <Button title={data.callToAction} className="w-fit" intent="secondary" />
    </div>
  );
}
