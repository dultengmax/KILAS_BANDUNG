import AdminDashboard from '@/components/dashboard/admin-page'
import { getUser, listUsers } from '@/lib/action/auth'
import { getCategories } from '@/lib/action/kategory'
import React, { Suspense } from 'react'

const page =  async() => {
  const user = await listUsers()
  const category = await getCategories()
  return (
    <div>
      <Suspense fallback={
        <>
        <div>loading...</div>
        </>
      }>
      <AdminDashboard users={user} category={category}/>
      </Suspense>
    </div>
  )
}

export default page