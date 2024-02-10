import { forwardRef, useEffect, useState } from 'react'
import { SetFieldValue } from 'react-hook-form'

type FormValues = {
  name: string
  value: string
}

const FormInputWithProjectSelector = forwardRef(
  function FormInputWithProjectSelector({
    error,
    name,
    value,
    setValue,
    ...rest
  }: {
    error?: string
    name: string
    value: string
    setValue: SetFieldValue<FormValues>
  }) {
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const [hashtags, setHashtags] = useState([])

    // Fetch the autocomplete project options when the user types a hashtag
    useEffect(() => {
      const fetchHashtags = async () => {
        const hashtag = value.match(/#\w+/g)
        if (hashtag) {
          const strippedHashtag = hashtag[0].replace('#', '')
          try {
            const response = await fetch(
              `/api/search/projects?search=${strippedHashtag}`
            )
            const data = await response.json()
            setHashtags(data?.content ? data.content : [])
            setShowAutocomplete(true)
          } catch (error) {
            console.error('Error fetching projects:', error)
          }
        } else {
          setHashtags([])
          setShowAutocomplete(false)
        }
      }
      fetchHashtags()
    }, [value])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValue(name, value)
    }
    const handleHashtagSelect = (selectedHashtag: string) => {
      // Find the last hashtag in the input
      const lastHashtagIndex = value.lastIndexOf('#')
      let newFormValue = value

      if (lastHashtagIndex !== -1) {
        // Replace the last hashtag with the selected one
        newFormValue =
          value.substring(0, lastHashtagIndex) + '#' + selectedHashtag
      }
      setValue(name, newFormValue)
      setShowAutocomplete(false)
    }

    return (
      <>
        <input
          className="w-full rounded-md bg-gray-100 p-2 text-base font-medium outline-blue-400"
          onChange={handleInputChange}
          value={value}
          type={'text'}
          name={name}
          {...rest}
        />
        <div>
          {showAutocomplete && (
            <div className="relative">
              <div className="absolute mt-1 w-full rounded-md bg-white py-1 shadow-lg">
                <ul>
                  {hashtags.map((hashtag, index) => (
                    <li
                      key={index}
                      onClick={() => handleHashtagSelect(hashtag)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                    >
                      #{hashtag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {error && <div className="text-red-400">{error}</div>}
      </>
    )
  }
)

FormInputWithProjectSelector.displayName = 'FormInputWithProjectSelector'

export default FormInputWithProjectSelector
