'use client'

import { useCreateProject } from '@/hooks/react-query/useCreateProject'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import Box from '@/components/ui/Box'
import FormButton from '@/components/ui/form/FormButton'
import FormImageUpload from '@/components/ui/form/FormImageUpload'
import FormInput from '@/components/ui/form/FormInput'
import FormSelect from '@/components/ui/form/FormSelect'
import Title from '@/components/ui/typography/Title'
import { useState } from 'react'
import { NewProjectSchema, newProjectSchema } from '@/lib/validations/NewProjectSchema'

export default function NewProjectForm() {
  const createProject = useCreateProject()
  const [uploading, setUploading] = useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewProjectSchema>({
    mode: 'onBlur',
    resolver: zodResolver(newProjectSchema),
  })

  const onSubmit = handleSubmit((formValues) => {
    createProject.mutate({
      formValues,
    })
  })

  return (
    <Box>
      <div className="p-8">
        <Title>Add Project</Title>
        <form onSubmit={onSubmit}>
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
            id="slug"
            label="Slug"
            placeholder="Project slug..."
            error={errors.slug?.message}
            {...register('slug')}
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

          <FormButton disabled={uploading}>Add project</FormButton>
        </form>
      </div>
    </Box>
  )
}
