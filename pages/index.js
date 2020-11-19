import Header from '../components/header'
import Banner from '../components/banner'

import ProductList from '../components/ProductList'
import { useQuery } from '@apollo/react-hooks'
import withApollo from '../lib/apollo'
import gql from 'graphql-tag'
import { MainLayout } from '../components/Layout'

const QUERY_PRODUCTS = gql`
  {
    products {
      name
      brand
      price_pen
      price_usd
      categories {
        name
      }
    }
  }
`

const QUERY_CATEGORIES = gql`
  {
    categories(where: { state: "active" }) {
      id
      name
      state
    }
  }
`

const Home = () => {
  const {
    loading: loadingProduct,
    error: errorProducts,
    data: dataProducts
  } = useQuery(QUERY_PRODUCTS)
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories
  } = useQuery(QUERY_CATEGORIES)
  console.log(errorCategories, errorProducts)

  if (loadingProduct || loadingCategories) {
    return <div>Loading...</div>
  }

  if (errorCategories || errorProducts) {
    return <div>{JSON.stringify(errorCategories)}</div>
  }

  return (
    <MainLayout title='Home'>
      <Banner />
      <ProductList
        products={dataProducts.products}
        categories={dataCategories.categories}
      />
    </MainLayout>
  )
}

export default withApollo(Home)
