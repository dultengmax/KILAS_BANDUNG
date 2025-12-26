import SearchPage from '@/components/search_pages'
import { getArticles } from '@/lib/action/article'
import React from 'react'

const page = async() => {
  const data =( (await getArticles()).articles)
  return (
    <div>
      <SearchPage allArticles={data}/>
    </div>
  )
}

export default page