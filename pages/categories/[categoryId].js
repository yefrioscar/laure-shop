import Header from '../../components/header'
import Banner from '../../components/banner'
import { useRouter } from 'next/router'
import ProductList from '../../components/ProductList'
import withApollo from '../../lib/apollo'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'


const QUERY_PRODUCTS = gql`
  query Products($categoryId: String!) {
    products(where: { categories: $categoryId }) {
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

const CategoryDetails = () => {
  const router = useRouter()
  const { categoryId } = router.query
  console.log(categoryId)
  const { loading: loadingProduct, error: errorProducts, data: dataProducts } = useQuery(QUERY_PRODUCTS, { variables: { categoryId } })
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories
  } = useQuery(QUERY_CATEGORIES)

  if (loadingProduct || loadingCategories) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid gap-4'>
      <Header />
      <Banner />
      <ProductList
        products={dataProducts.products}
        categories={dataCategories.categories}
      />
    </div>
  )
}

export default withApollo(CategoryDetails)
