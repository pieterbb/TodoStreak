import Box from '@/components/ui/Box'
import Link from 'next/link'

export default function AddProjectOrQuestionWidget() {
  return (
    <Box>
      <div className="flex flex-col space-y-4 p-4">
        <div className="cursor-pointer rounded-lg border bg-gray-100 px-1 py-2 text-center text-gray-900 hover:bg-gray-200">
          <Link href="/topics/new/">
            <div>Ask a Question</div>
          </Link>
        </div>
        <div className="cursor-pointer rounded-lg border bg-gray-900 px-1 py-2 text-center font-bold text-gray-100 hover:bg-gray-800">
          <Link href="/projects/new/">
            <div>👉 Add a Project</div>
          </Link>
        </div>
      </div>
    </Box>
  )
}
