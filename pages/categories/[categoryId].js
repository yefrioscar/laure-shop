import Head from 'next/head'
import Header from '../../components/header'
import Banner from '../../components/banner'
import { useRouter } from 'next/router';
import useSWR from 'swr';
import LinkItem from '../../components/Link'
import ProductList from '../../components/ProductList';


const fetcher = async (...args) => {
  const res = await fetch(...args);

  return res.json();
};

function currencyFormat(num, prefix) {
  return prefix + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export default function Products () {
  const router = useRouter();
  const { categoryId } = router.query;
  console.log(categoryId)
  const { data: products } = useSWR(`/api/categories/${categoryId}`, fetcher);
  const { data: categories } = useSWR(`/api/categories`, fetcher);

  if(!categories || !products) {
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