import { useEffect }from 'react'
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm'

const Home = () => {
  const {products, dispatch} = useProductsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {},
      };

      // Include Authorization header only if the user is authenticated
      if (user) {
        requestOptions.headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await fetch('/api/products', requestOptions);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    fetchProducts();
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="products">
        {products && products.map((product) => (
          <ProductDetails key={product._id} product={product} />
        ))}
      </div>
      <ProductForm />
    </div>
  )
}

export default Home