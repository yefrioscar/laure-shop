import Head from 'next/head'
import Header from '../components/header'
import Banner from '../components/banner'

export async function getStaticProps () {
  const categories = await Promise.resolve([
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
  ])
  const products = await Promise.resolve([
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'Todas' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' },
    { desc: 'categorie 2' },
    { desc: 'categorie 1' }
  ])

  // Pass post data to the page via props
  return { props: { categories, products } }
}

export default function Home ({ categories, products }) {
  return (
    <div className='grid gap-4'>
      <Header />
      <Banner />
      <div className='grid grid-cols-1 lg:grid-cols-main-app gap-4'>
        <div className=''>
          <h2 className='mb-2 font-bold text-gray-800'>Categories</h2>
          <ul className='flex lg:flex-col flex-wrap'>
            {categories.map((el, index) => (
              <li key={index} className='mr-1 mb-1 font-medium'>
                <a
                  className='text-gray-500 hover:text-gray-700 text-sm'
                  href='#'
                >
                  {el.desc}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-20 gap-4'>
          {categories.map((el, index) => (
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
                  <p className='font-bold text-gray-800'>DISCO DURO</p>
                  <p className='font-bold text-black'>S/ 150.00</p>
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
        </div>
      </div>
    </div>
  )
}
