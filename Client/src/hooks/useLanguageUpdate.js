import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateLangPreference } from "../lib/APIs/authAPIs";

const useLanguageUpdate = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: UpdateLangPreference,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            console.log(message)
        },
    });
    return { isPending, updateLanguageMutation: mutate };
};

export default useLanguageUpdate