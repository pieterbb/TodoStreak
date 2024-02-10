import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useFileUpload } from '@/hooks/util/useFileUpload'
import { FileInput } from '@uppy/react'
import Image from 'next/image'
import { forwardRef, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'

interface FormImageUploadProps {
  id: string
  label?: string
  setValue: UseFormSetValue<any>
  value: string[] | string | undefined
  setUploading: (uploading: boolean) => void
  allowMultipleImages?: boolean
  showThumbnails?: boolean
  error?: string
}

const FormImageUpload = forwardRef((props: FormImageUploadProps, ref) => {
  const {
    id,
    label,
    value,
    setValue,
    setUploading,
    allowMultipleImages,
    showThumbnails,
    error,
    ...rest
  } = props

  const { uppy, thumbnails, uploading, resetUpload } = useFileUpload()

  // If the value of the parent form get's reset or is not defined reset the upload hook
  useEffect(() => {
    if (value === undefined) {
      resetUpload()
    }
  }, [value])

  useEffect(() => {
    uppy.on('upload', () => {
      setUploading(true)
    })

    uppy.on('complete', (result) => {
      const file = result.successful[0]

      // If multiple images allowed append the img url, otherwise replace it
      if (allowMultipleImages) {
        setValue(id, [...(value || []), file.uploadURL])
      } else {
        setValue(id, file.uploadURL)
      }
      setUploading(false)
    })
  }, [allowMultipleImages, id, setUploading, setValue, uppy, value])

  return (
    <div className="mb-2 flex flex-col space-y-2">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>

      <div className="flex items-center space-x-2">
        <div className="flex h-12 w-32 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-1 shadow-sm">
          <p>📎</p>
          <FileInput
            uppy={uppy}
            pretty
            inputName="files[]"
            locale={{
              strings: {
                chooseFiles: 'Add media',
              },
            }}
          />
          <input type="hidden" name="avatar" id={`avatar`} {...rest} />
        </div>
        {value && value?.length > 0 && (
          <AiOutlineCheck size={24} className="text-green-500" />
        )}
        {uploading && <LoadingSpinner />}
        {error && <div className="text-red-400">{error}</div>}
      </div>
      {showThumbnails && (
        <div className="flex space-x-2">
          {thumbnails.map((thumbnail) => {
            return (
              <Image
                key={thumbnail}
                width={40}
                height={40}
                alt="thumbnail"
                className="h-40 w-40 rounded-lg object-cover"
                src={thumbnail}
              />
            )
          })}
        </div>
      )}
    </div>
  )
})

FormImageUpload.displayName = 'FormImageUpload'

export default FormImageUpload
