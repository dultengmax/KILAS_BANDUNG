import AdminDashboard from '@/components/dashboard/admin-page'
import { getArticles } from '@/lib/action/article'
import { getUser, listUsers } from '@/lib/action/auth'
import { getCategories } from '@/lib/action/kategory'
import { log } from 'console'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'

const page =  async() => {

  const cookieStore = await cookies()
  const authToken = cookieStore.get("role")

  console.log(authToken)
  
  const user = await listUsers()
  const category = await getCategories()
  const article = await getArticles()
  return (
    <div>
      <Suspense fallback={
        <>
        <div>loading...</div>
        </>
      }>
      <AdminDashboard users={user} category={category} article={article.articles} role={authToken?.value}

      />
      </Suspense>
    </div>
  )
}

export default page