import { forwardRef } from 'react'

interface SubmitReplyProps {
  error: string | undefined
}

const SubmitReplyBox = forwardRef<HTMLFormElement, SubmitReplyProps>(
  ({ error, ...rest }, ref) => {
    return (
      <>
        <input
          type="text"
          className="peer relative mb-2 w-full rounded-md bg-slate-100 p-2 outline-none  focus:ring-2 focus:ring-green-500"
          placeholder="Share your thoughts..."
          name="content"
          required
          {...rest}
        />
        <p className=" text-red-600"> {error ?? ''}</p>
        <div className=" bottom-6 flex  space-x-2 peer-focus:flex">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-gray-200 px-2 py-1 text-sm font-bold text-gray-500"
          >
            Post
          </button>
        </div>
      </>
    )
  }
)

SubmitReplyBox.displayName = 'SubmitReplyBox'

export default SubmitReplyBox
