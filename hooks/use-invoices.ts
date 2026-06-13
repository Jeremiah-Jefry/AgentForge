"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getInvoices, updateInvoiceStatus } from "@/lib/actions/invoices";

export function useInvoices() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoices(),
  });
}

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateInvoiceStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
