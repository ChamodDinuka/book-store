import React from 'react'

function Header(title:{title:string}) {
  return (
    <div className="p-4 justify-center flex border-b-2">
        <div className="text-4xl font-bold">{title.title}</div>
    </div>
  )
}

export default Header