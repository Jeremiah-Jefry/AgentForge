import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingCard({
  name,
  price,
  detail,
  cta,
  featured,
}: {
  name: string;
  price: string;
  detail: string;
  cta: string;
  featured: boolean;
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col justify-between gap-6",
        featured &&
          "border-cyan-400/30 bg-[linear-gradient(180deg,rgba(51,209,255,0.2),rgba(255,255,255,0.05))] shadow-[0_20px_80px_rgba(51,209,255,0.18)]",
      )}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-zinc-400">{name}</p>
          <h3 className="mt-3 text-4xl font-semibold text-white">{price}</h3>
        </div>
        <p className="leading-7 text-zinc-400">{detail}</p>
        <div className="space-y-3 text-sm text-zinc-300">
          {["Premium glass UI", "Realtime analytics", "Automated workflows"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-cyan-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <Button variant={featured ? "default" : "ghost"}>{cta}</Button>
    </Card>
  );
}
