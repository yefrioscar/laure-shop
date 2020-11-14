import Head from 'next/head'
import Header from '../components/header'
import Banner from '../components/banner'
import useSWR from 'swr'

import ProductList from '../components/ProductList'
import { gql, useQuery } from '@apollo/client'
import withApollo from "../lib/apollo";

const fetcher = async (...args) => {
  const res = await fetch(...args)

  return res.json()
}

const QUERY_PRODUCTS = gql`
  {
    products {
      id
      name
      price_usd
    }
  }
`;

const Home =  () => {
  // const router = useRouter();
  // const { name } = router.query;
  // const { data: products } = useSWR(`/api/products`, fetcher)
  const { data: categories } = useSWR(`/api/categories`, fetcher)
  const { loading, error, data: products } = useQuery(QUERY_PRODUCTS);
  console.log(products)

  if (!categories || loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid gap-4'>
      <Header />
      <Banner />
      <ProductList products={products.products} categories={categories} />
    </div>
  )
}


export default withApollo({ ssr: true })(Home);
