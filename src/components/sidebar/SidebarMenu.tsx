import Link from 'next/link'
import {
  AiOutlineDollarCircle,
  AiOutlineFire,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineQuestionCircle,
} from 'react-icons/ai'

const menuItems = [
  {
    name: 'Home',
    icon: <AiOutlineHome size={32} />,
    link: '/',
  },
  {
    name: 'Projects',
    icon: <AiOutlineDollarCircle size={32} />,
    link: '/projects',
  },
  {
    name: 'Questions',
    icon: <AiOutlineQuestionCircle size={32} />,
    link: '/topics/questions',
  },
  {
    name: 'Roasts',
    icon: <AiOutlineFire size={32} />,
    link: '/topics/roasts',
  },
  {
    name: 'Milestones',
    icon: <AiOutlineHeart size={32} />,
    link: '/topics/milestones',
  },
]

export default function MenuBarWrapper() {
  return (
    <div className="flex flex-row justify-center space-x-4 lg:flex-col lg:space-x-0">
      {menuItems.map((item) => {
        return (
          <Link key={item.name} href={item.link}>
            <div className=" text-xl font-extrabold ">
              <div className="flex items-center space-x-2 rounded-2xl hover:bg-slate-100 lg:px-8 lg:py-4">
                {item.icon}
                <p className="hidden lg:block">{item.name}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
