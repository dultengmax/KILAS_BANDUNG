import EditPages from '@/components/articles/edit_Pages'
import MediaList from '@/components/dashboard/media'
import ProfileContent from '@/components/dashboard/profilecontent'
import { getArticleById } from '@/lib/action/article'
import React from 'react'

const page = async ({params}:{params:Promise<{id:number}>}) => {
  const {id} = await params
  const data = await getArticleById(id)
  return (
    <div>
    <EditPages data={data?.article} />
    </div>
  )
}

export default page