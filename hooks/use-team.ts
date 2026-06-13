"use client";

import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "@/lib/actions/team";

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team"],
    queryFn: () => getTeamMembers(),
  });
}
