import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspace)[":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspace)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspace[":workspaceId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete workspace");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace deleted");

      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete workspace");
    },
  });

  return mutation;
};
