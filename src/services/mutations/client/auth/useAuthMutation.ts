import { useMutation } from "@tanstack/react-query";

export default function useAuthMutation() {
  const login = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (props: any) => {
      // try {
      //   const res = await api.client.IAM.login(props);
      //   if (res.status >= 400) {
      //     if (res.status === 500) throw new Error(JSON.stringify(res));
      //     const data = (await res.data) as {
      //       message: string;
      //       details: string;
      //     };
      //     if (data.message || data.details)
      //       toast.error(data.message || data.details);
      //     console.log(data);
      //     return null;
      //   }
      //   const data = (await res.data) as TLoginResponse;
      //   toast.success(data.message);
      //   return data;
      // } catch (error: unknown) {
      //   toast.error(handleApiError(error, true));
      //   return null;
      // }
    },
  });

  return { login };
}
