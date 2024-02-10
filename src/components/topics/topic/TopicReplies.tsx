'use client'
import TopicReply from '@/components/topics/topic/TopicReply'
import NoItems from '@/components/ui/NoItems'
import SubmitReply from '@/components/ui/form/SubmitReply'
import { useCreateTopicReply } from '@/hooks/react-query/useCreateTopicReply'
import { getTopic } from '@/lib/prismaQueries'
import { replySchema } from '@/lib/validations/ReplySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TopicType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, FieldValues, useForm } from 'react-hook-form'

export default function TopicReplies({
  replies,
  topicId,
  category,
}: {
  replies: NonNullable<getTopic>['topicReplies']
  topicId: string
  category: TopicType
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const createTopicReply = useCreateTopicReply()

  const { handleSubmit, reset, control } = useForm<FieldValues>({
    mode: 'onBlur',
    resolver: zodResolver(replySchema),
  })

  // Handle topic reply Submit
  const onSubmit = handleSubmit(async (form) => {
    createTopicReply.mutate(
      {
        content: form.content,
        topicId: topicId,
        category: category,
      },
      {
        onSuccess: async () => {
          reset()
          router.refresh()
        },
      }
    )
  })

  return (
    <>
      {replies?.length ? (
        replies.map((reply) => {
          return <TopicReply key={reply.id} reply={reply} category={category} />
        })
      ) : (
        <NoItems />
      )}
      {session && (
        <form onSubmit={onSubmit}>
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
