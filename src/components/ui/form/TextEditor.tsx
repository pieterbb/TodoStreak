import { Editor } from '@tinymce/tinymce-react'

export default function TextEditor({
  onChange,
  value,
}: {
  onChange: (editor: unknown) => void
  value: string
}) {
  const handleEditorChange = (editor: unknown) => onChange(editor)
  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        initialValue=""
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            ' autolink lists link image charmap print preview',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help ',
          ],
          toolbar:
            'formatselect | h1 h2 h3 link | ' +
            'bold italic backcolor | ' +
            ' bullist numlist outdent indent | ' +
            'removeformat ',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </div>
  )
}
