import { useState } from 'react'


// tutorial source: https://www.youtube.com/watch?v=PATgbxhcHvg


export function Dropdown({ children, trigger }) {

  const [show, setShow] = useState(false)

  return (
    <div onClick={() => setShow(curr => !curr)} className="w-fit relative">
      <div className="">{trigger}</div>
      {show &&
        <ul className={`z-100 min-w-max absolute right-0 mt-2 divide-y divide-dark-green rounded overflow-hidden shadow`}>
          {children}
        </ul>
      }
    </div>
  )
}

export function DropdownItem({ children }) {

  return (
    <li className="flex gap-3 items-center cursor-pointer bg-off-white text-main-black">
      {children}
    </li>
  )
}