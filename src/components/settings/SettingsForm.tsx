'use client'
import Box from '@/components/ui/Box'
import FormButton from '@/components/ui/form/FormButton'
import FormImageUpload from '@/components/ui/form/FormImageUpload'
import FormInput from '@/components/ui/form/FormInput'
import Title from '@/components/ui/typography/Title'

import { useUpdateSettings } from '@/hooks/react-query/useUpdateSettings'
import { getLoggedInUserSettingsFromId } from '@/lib/prismaQueries'
import { UserSettingsSchema, userSettingsSchema } from '@/lib/validations/UserSettingsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function SettingsForm({
  userSettings,
}: {
  userSettings: getLoggedInUserSettingsFromId
}) {


  
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserSettingsSchema>({
    mode: 'onBlur',
    defaultValues: {
      displayName: userSettings?.displayName ?? '',
      name: userSettings?.name ?? '',
      bio: userSettings?.bio ?? '',
      location: userSettings?.location ?? '',
      twitter: userSettings?.twitter ?? '',
      image: userSettings?.image ?? '',
      profileBanner: userSettings?.profileBanner ?? '',
    },
    resolver: zodResolver(userSettingsSchema),
  })

  const updateSettings = useUpdateSettings()
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const onSubmit = handleSubmit((formValues) => {
    updateSettings.mutate({ formValues })
    router.refresh()
  })

  return (
    <Box>
      <div className="p-8">
        <Title>Settings</Title>
        <form onSubmit={onSubmit}>
          <FormInput
            id="displayName"
            label="Full Name"
            placeholder="Display name..."
            error={errors.displayName?.message}
            {...register('displayName')}
          />
          <FormInput
            id="name"
            label="Username"
            defaultValue={userSettings?.name ?? ''}
            error={errors.name?.message}
            {...register('name')}
          />
          <FormInput
            id="bio"
            label="Biography"
            placeholder="Bio..."
            defaultValue={userSettings?.bio ?? ''}
            error={errors.bio?.message}
            {...register('bio')}
          />
          <FormInput
            id="location"
            label="Location"
            placeholder="Location..."
            defaultValue={userSettings?.location ?? ''}
            error={errors.location?.message}
            {...register('location')}
          />
          <FormInput
            id="twitter"
            label="twitter"
            placeholder="@BillyBob"
            defaultValue={userSettings?.twitter ?? ''}
            error={errors.twitter?.message}
            {...register('twitter')}
          />

          <Controller
            name="image"
            control={control}
            defaultValue={userSettings?.image ?? ''}
            render={({ field, fieldState: { error } }) => (
              <FormImageUpload
                id="image"
                label="Avatar upload"
                setValue={setValue}
                setUploading={setIsUploading}
                allowMultipleImages={false}
                showThumbnails={false}
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="profileBanner"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormImageUpload
                id="profileBanner"
                label="Profilebanner upload"
                setValue={setValue}
                setUploading={setIsUploading}
                allowMultipleImages={false}
                showThumbnails={false}
                error={error?.message}
                {...field}
              />
            )}
          />

          <FormButton disabled={isUploading}>Save settings</FormButton>
        </form>
      </div>
    </Box>
  )
}
