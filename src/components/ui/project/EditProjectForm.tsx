'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import Box from '@/components/ui/Box'
import FormButton from '@/components/ui/form/FormButton'
import FormImageUpload from '@/components/ui/form/FormImageUpload'
import FormInput from '@/components/ui/form/FormInput'
import FormSelect from '@/components/ui/form/FormSelect'
import Title from '@/components/ui/typography/Title'
import { useEditProject } from '@/hooks/react-query/useEditProject'
import { getProjectBySlug } from '@/lib/prismaQueries'
import {
  EditProjectSchema,
  editProjectSchema,
} from '@/lib/validations/EditProjectSchema'
import { useState } from 'react'

export default function EditProjectForm({
  defaultProjectValues,
}: {
  defaultProjectValues: NonNullable<getProjectBySlug>
}) {
  const editProject = useEditProject()
  const [uploading, setUploading] = useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(editProjectSchema),
    defaultValues: { ...defaultProjectValues },
  })

  const onSubmit = handleSubmit((formValues: EditProjectSchema) => {
    editProject.mutate({
      formValues,
    })

    // Set the id field value
    setValue('id', defaultProjectValues.id)
  })

  return (
    <>
      <Box>
        <div className="p-8">
          <Title>Edit Project</Title>
          <form onSubmit={onSubmit}>
            <input
              {...register('id', { value: defaultProjectValues.id })}
              type="hidden"
            />
            <FormInput
              id="hashtag"
              label="Hashtag"
              placeholder="Project hashtag..."
              error={errors.hashtag?.message}
              {...register('hashtag')}
            />
            <FormInput
              id="name"
              label="Name"
              placeholder="Project name..."
              error={errors.name?.message}
              {...register('name')}
            />
            <FormInput
              id="pitch"
              label="Pitch"
              placeholder="Project pitch..."
              error={errors.pitch?.message}
              {...register('pitch')}
            />
            <FormInput
              id="website"
              label="Website"
              placeholder="Project website..."
              error={errors.website?.message}
              {...register('website')}
            />

            <FormInput
              id="twitter"
              label="Twitter"
              placeholder="@tweetie8"
              error={errors.twitter?.message}
              {...register('twitter')}
            />

            <Controller
              name="profileBanner"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormImageUpload
                  id="profileBanner"
                  label="Project banner upload"
                  setValue={setValue}
                  setUploading={setUploading}
                  error={error?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
            <Controller
              name="avatar"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormImageUpload
                  id="avatar"
                  label="Avatar upload"
                  setValue={setValue}
                  setUploading={setUploading}
                  error={error?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />

            <FormSelect
              id="status"
              label="Status"
              options={['Active', 'Archived']}
              error={errors.status?.message}
              {...register('status')}
            />

            <FormButton disabled={uploading}>Save</FormButton>
          </form>
        </div>
      </Box>
    </>
  )
}
