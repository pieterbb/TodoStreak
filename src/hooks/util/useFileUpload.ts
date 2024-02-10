'use client'

import Uppy from '@uppy/core'
import { useState } from 'react'
import { ThumbnailGenerator, XHRUpload } from 'uppy'

export const useFileUpload = () => {
  const [uploadedMedia, setUploadedMedia] = useState([] as string[])
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: {
      maxNumberOfFiles: 1,
      maxFileSize: 5000000,
      allowedFileTypes: ['image/*'],
    },
    autoProceed: true,
  })

  uppy.use(XHRUpload, {
    endpoint: process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
    formData: true,
    allowedMetaFields: ['file', 'name', 'upload_preset'],
  })

  // Add uploaded media attachment to component for sending
  uppy.on('complete', (result) => {
    setUploadedMedia((uploadedMedia) => [
      ...uploadedMedia,
      result.successful[0].uploadURL,
    ])
    setUploading(false)
  })

  uppy.on('file-added', (file) => {
    uppy.setFileMeta(file.id, {
      file: file.data,
      upload_preset: 'psfcc1jd',
    })
    setUploading(true)
  })

  uppy.use(ThumbnailGenerator, {
    id: 'ThumbnailGenerator',
    thumbnailWidth: 200,
    thumbnailHeight: 200,
    thumbnailType: 'image/jpeg',
    waitForThumbnailsBeforeUpload: true,
  })

  uppy.on('thumbnail:generated', (file, preview) => {
    setThumbnails((thumbnails) => [...thumbnails, preview])
  })

  const resetUpload = () => {
    setUploadedMedia([])
    setThumbnails([])
  }

  return { uploadedMedia, thumbnails, uppy, uploading, resetUpload }
}
