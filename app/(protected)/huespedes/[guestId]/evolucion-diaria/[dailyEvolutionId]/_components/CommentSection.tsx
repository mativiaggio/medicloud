import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomFormField";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import {
  Daily_Evolution,
  Daily_Evolution_Comments,
} from "@/types/appwrite.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CommentsInterface {
  dailyEvolution: Daily_Evolution;
  dailyEvolutionLoading: boolean;
}

export default function CommentSection({
  dailyEvolution,
  dailyEvolutionLoading,
}: CommentsInterface) {
  const [comments, setComments] = useState<Daily_Evolution_Comments[]>(
    Array.isArray(dailyEvolution.daily_evolution_comments)
      ? dailyEvolution.daily_evolution_comments
      : dailyEvolution.daily_evolution_comments
        ? [dailyEvolution.daily_evolution_comments]
        : [],
  );

  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [writting, setWritting] = useState(false);

  const { user } = useAuth();
  const { dailyEvolutionId } = useParams();

  const formatUserId = (userId: string | undefined) => {
    if (!userId) {
      return "Unknown";
    }
    return userId.slice(0, 8) + "...";
  };

  const getUser = useCallback(
    async (user_id: string) => {
      if (userNames[user_id]) {
        return userNames[user_id];
      }

      try {
        const result = await api.user.findById(user_id);
        const userName = result.documents[0].name;

        setUserNames((prevUserNames) => ({
          ...prevUserNames,
          [user_id]: userName,
        }));

        return userName;
      } catch (error) {
        console.error("Error fetching user:", error);
        return formatUserId(user_id);
      }
    },
    [userNames],
  );

  const sortCommentsByDateDesc = (comments: Daily_Evolution_Comments[]) => {
    return comments.sort(
      (a, b) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime(),
    );
  };

  useEffect(() => {
    const fetchDailyEvolution = async () => {
      try {
        const sortedComments = sortCommentsByDateDesc(
          Array.isArray(dailyEvolution.daily_evolution_comments)
            ? dailyEvolution.daily_evolution_comments
            : dailyEvolution.daily_evolution_comments
              ? [dailyEvolution.daily_evolution_comments]
              : [],
        );
        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching daily evolution:", error);
      }
    };

    fetchDailyEvolution();
  }, [dailyEvolution.daily_evolution_comments]);

  useEffect(() => {
    comments.forEach(async (comment) => {
      if (!userNames[comment.user_id]) {
        await getUser(comment.user_id);
      }
    });
  }, [comments, userNames, getUser]);

  const CommentFormValidation = z.object({
    comment: z.string().nonempty("Escribe un comentario antes de postear"),
  });

  const form = useForm<z.infer<typeof CommentFormValidation>>({
    resolver: zodResolver(CommentFormValidation),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(data: z.infer<typeof CommentFormValidation>) {
    console.log("Form data:", data); // Log para verificar datos del formulario
    try {
      const commentData = {
        user_id: user?.$id,
        comment: data.comment,
        daily_evolution: dailyEvolutionId,
      };

      console.log("Comment data before submit:", commentData); // Log para verificar datos antes de enviar

      setSubmitting(true);
      const response = await api.dailyEvolutionComments.new(commentData);

      if (response) {
        console.log("Comment submitted:", response); // Log para confirmar envío exitoso
        const comment = response;
        const updatedComments = sortCommentsByDateDesc([comment, ...comments]);
        setSubmitting(false);
        setComments(updatedComments);
        form.reset(); // Limpiar el formulario después del envío exitoso
      }
    } catch (error) {
      console.log("Error submitting comment:", error); // Log para capturar errores
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full pt-4">
      <div className="pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="comment"
              label=""
              placeholder="Escribe un comentario"
              control={form.control}
              onFocus={() => setWritting(true)}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
              formItemCustomClasses="!mb-0"
            />
            <div className="flex w-full justify-end pt-2">
              <Button
                className={cn(
                  "w-fit rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
                  {
                    hidden: !writting,
                    flex: writting,
                  },
                )}
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Comentando..." : "Comentar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="space-y-8">
        {comments.map((comment: Daily_Evolution_Comments) => (
          <div key={comment.$id} className="flex space-x-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage
                className="rounded-full"
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${userNames[comment.user_id]}`}
              />
              <AvatarFallback>
                {formatUserId(userNames[comment.user_id])
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1">
                <div className="flex w-full justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">
                      {userNames[comment.user_id] ||
                        formatUserId(comment.user_id)}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.$createdAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </span>
                  </div>
                  <div>
                    {comment.user_id == user?.$id ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
