'use client'

import Box from '@/components/ui/Box'
import FormButton from '@/components/ui/form/FormButton'
import FormImageUpload from '@/components/ui/form/FormImageUpload'
import FormInputWithProjectSelector from '@/components/ui/form/FormInputWithProjectSelector'
import { useCreateTodo } from '@/hooks/react-query/useCreateTodo'
import { todoItemSchema } from '@/lib/validations/TodoItemSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function NewItem() {
  const createTodoRequest = useCreateTodo()

  const [isUploading, setIsUploading] = useState(false)

  type FormValues = {
    content: string
    done: boolean
    attachments: string[]
  }

  const { handleSubmit, register, setValue, control, reset } =
    useForm<FormValues>({
      mode: 'onBlur',
      resolver: zodResolver(todoItemSchema),
    })

  const onSubmit = handleSubmit((form) => {
    createTodoRequest.mutate({
      content: form.content,
      done: form.done,
      attachments: form.attachments,
    })
    reset()
  })

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <div className=" flex flex-col space-y-2 p-4">
          <div className="my-4 flex items-center justify-center gap-2">
            <input
              className="h-6 w-6 flex-none checked:bg-blue-400"
              type="checkbox"
              defaultChecked={true}
              {...register('done')}
            />
            <div className="w-full">
              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <FormInputWithProjectSelector
                    error={error?.message}
                    setValue={setValue}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Controller
              name="attachments"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormImageUpload
                  id="attachments"
                  setValue={setValue}
                  setUploading={setIsUploading}
                  allowMultipleImages={true}
                  showThumbnails={true}
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <FormButton disabled={isUploading}>Add todo</FormButton>
          </div>
        </div>
      </form>
    </Box>
  )
}
