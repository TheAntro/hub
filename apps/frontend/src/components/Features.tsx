import {
  CalendarHeart,
  ClipboardClock,
  MountainSnow,
  type LucideIcon,
} from "lucide-react";

function Feature({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="py-4 px-8 flex flex-col place-items-center text-center gap-8 lg:gap-12">
      <Icon aria-hidden="true" className="text-primary w-20 h-20" />
      <p className="text-semibold text-mist-500">{text}</p>
    </div>
  );
}

export function Features() {
  return (
    <div className="mx-auto flex flex-col justify-between py-20 lg:py-0 lg:flex-row gap-6 lg:gap-8">
      <Feature
        icon={CalendarHeart}
        text={"Create aspirational timebound goals for yourself"}
      />
      <Feature
        icon={ClipboardClock}
        text={"Organize and track daily habits for each goal"}
      />
      <Feature
        icon={MountainSnow}
        text={"Succeed with determination enabled by clarity"}
      />
    </div>
  );
}
