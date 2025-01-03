import { useEffect, useState } from 'react';
import '../styles/globals.css';
// Define the type for a Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: { data: Product[] } = await response.json();
        setProducts(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:shadow-2xl"
            >
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
                <p className="text-gray-600 text-base">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-700">Rs{product.price}</p>
                  <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 focus:outline-none">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
