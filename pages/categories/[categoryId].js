import Head from 'next/head'
import Header from '../../components/header'
import Banner from '../../components/banner'
import { useRouter } from 'next/router';
import useSWR from 'swr';
import LinkItem from '../../components/Link'


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
      <div className='grid grid-cols-1 lg:grid-cols-main-app gap-4'>
        <div className=''>
          <h2 className='mb-2 font-bold text-gray-800'>Categories</h2>
          <ul className='flex lg:flex-col flex-wrap'>
            {categories.data.map((el, index) => (
              <LinkItem href='/categories/[categoryId]' as={`/categories/${el.key}`} className='mr-1 mb-1 font-medium text-gray-500 hover:text-gray-700 text-sm'  key={index}>
              <li>
                <a
                  className=''
                  href='#'
                >
                  {el.description}
                </a>
              </li>
            </LinkItem>
            ))}
          </ul>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-20 gap-4'>
          {products.data.map((el, index) => (
            <div key={index}>
              <div className='bg-gray-200 rounded-lg p-6 mb-2 flex center justify-center items-center'>
                <img
                  className='rounded-lg shadow-xl w-full'
                  src='/images/test-product.png'
                  alt=''
                />
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-bold text-gray-800'>{el.name}</p>
                  <div>
                  <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                          {currencyFormat(+el.price_usd, '$')}
                        </span>

                        <span class='inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2'>
                          {currencyFormat(+el.price_pen, 'S/')}
                        </span>
                  </div>
                </div>
                <div>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-6 w-6 stroke-current text-laure'
                  >
                    <circle cx={12} cy={12} r={10} />
                    <path d='M12 8v8M8 12h8' />
                  </svg>
                </div>
              </div>
            </div>
          ))}

        {products.data.length === 0 && <span>No hay items</span> }

        </div>
      </div>
    </div>
  )
}