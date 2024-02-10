import SubmitReply from '@/components/ui/form/SubmitReply'
import { useCreateTodoReply } from '@/hooks/react-query/useCreateTodoReply'
import { replySchema } from '@/lib/validations/ReplySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'

export default function TodoSubmitReply({ todoId }: { todoId: string }) {
  const todoReply = useCreateTodoReply()

  type FormValues = {
    content: string
  }

  const { handleSubmit, reset, control } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(replySchema),
  })

  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const submitReply = handleSubmit(async (reply) => {
    await todoReply.mutate(
      { todoId, reply },
      {
        onSuccess: () => {
          reset()
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
      }
    )
  })

  return (
    <>
      {session && (
        <form onSubmit={submitReply}>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <SubmitReply error={error?.message} {...field} />
            )}
          />
        </form>
      )}
    </>
  )
}
