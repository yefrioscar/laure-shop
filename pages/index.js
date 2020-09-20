import Head from 'next/head'
import Header from '../components/header'
import Banner from '../components/banner'
import useSWR from 'swr'

import ProductList from '../components/ProductList'

const fetcher = async (...args) => {
  const res = await fetch(...args)

  return res.json()
}



export default function Home () {
  // const router = useRouter();
  // const { name } = router.query;
  const { data: products } = useSWR(`/api/products`, fetcher)
  const { data: categories } = useSWR(`/api/categories`, fetcher)

  if (!categories || !products) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid gap-4'>
      <Header />
      <Banner />
      <ProductList products={products} categories={categories} />
    </div>
  )
}
