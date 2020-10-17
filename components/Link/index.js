import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LinkItem = ({ href, children, as, className }) => {
  const router = useRouter()
  
  let classN = className || ''
  if (router.asPath === as) {
    className = `${classN} text-laure`
  }

  return (
    <Link href={href} as={as}>
      {React.cloneElement(children, { className })}
    </Link>
  )
}

export default LinkItem
