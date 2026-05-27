import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TeamCard({
  name,
  role,
  status,
  initials,
}: {
  name: string;
  role: string;
  status: string;
  initials: string;
}) {
  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-4">
        <Avatar initials={initials} />
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-zinc-400">{role}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Badge variant={status === "Online" ? "success" : "violet"}>{status}</Badge>
        <Button variant="ghost" size="sm">
          Manage
        </Button>
      </div>
    </Card>
  );
}
