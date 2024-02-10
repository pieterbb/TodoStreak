'use client'

import Box from '@/components/ui/Box'
import FormButton from '@/components/ui/form/FormButton'
import FormInput from '@/components/ui/form/FormInput'
import TextEditor from '@/components/ui/form/TextEditor'
import Title from '@/components/ui/typography/Title'
import { useCreateTopic } from '@/hooks/react-query/useCreateTopic'
import { newTopicItem } from '@/lib/validations/NewTopicSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TopicType } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function NewTopicForm() {
  interface newTopic {
    title: string
    content: string
    category: TopicType
  }

  const categories = ['questions', 'roasts', 'milestones']

  const router = useRouter()
  const searchParams = useSearchParams()

  const searchbarCategory =
    (searchParams.get('category') as TopicType) || ('questions' as TopicType)
    
  useEffect(() => {
    if (categories.includes(searchbarCategory)) {
      setTopicCategory(searchbarCategory)
    }
  }, [searchbarCategory])

  const [topicCategory, setTopicCategory] = useState('')

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<newTopic>({
    mode: 'onBlur',
    resolver: zodResolver(newTopicItem),
    defaultValues: {
      category: searchbarCategory,
    },
  })

  const createTopic = useCreateTopic()

  function onSubmit(values: newTopic) {
    createTopic.mutate(
      {
        title: values.title,
        content: values.content,
        category: values.category,
      },
      {
        onSuccess: (response) => {
          const topic = response?.data?.content
          if (!topic) return
          const url = `/topics/${topic.category}/${topic.slug}`
          router.push(url)
        },
      }
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <div className="space-y-2 p-8">
            <Title>New Topic</Title>
            <label htmlFor="title">Topic category</label>
            <div className="flex items-center space-x-4 rounded border border-gray-200 p-4">
              {categories.map((category) => (
                <>
                  <input
                    type="radio"
                    id="category"
                    {...register('category')}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    value={category}
                    checked={topicCategory === category}
                    onChange={() => {
                      setTopicCategory(category)
                    }}
                  />
                  <label htmlFor={'category'}>{category}</label>
                </>
              ))}
            </div>
            <div className="text-red-500">{errors?.category?.message}</div>

            <div>
              <FormInput
                id="title"
                label="Titel"
                placeholder="Topic title..."
                error={errors.title?.message}
                {...register('title')}
              />
            </div>

            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextEditor onChange={onChange} value={value} />
              )}
            />
            <FormButton>Submit</FormButton>
          </div>
        </Box>
      </form>
    </div>
  )
}
