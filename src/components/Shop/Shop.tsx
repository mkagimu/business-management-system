import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Plus, Minus, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';

const Shop = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || product.featured;
    return matchesSearch && matchesCategory && matchesFeatured;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': 
      default: return a.name.localeCompare(b.name);
    }
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  {product.stock} in stock
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {cart[product.id] ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                    {cart[product.id]}
                  </span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              )}
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-3">Product Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Professional quality and support</li>
                <li>• 30-day money-back guarantee</li>
                <li>• Free updates and maintenance</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-1">Browse and order our services and products</p>
        </div>
        <div className="relative">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <ShoppingCart size={20} />
            <span>Cart ({getCartItemCount()})</span>
            {getCartItemCount() > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-800 text-white text-xs rounded-full">
                ${getCartTotal().toLocaleString()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products and services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Featured only</span>
          </label>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category => {
          const categoryProducts = products.filter(p => p.category === category);
          const avgRating = categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedCategory === category
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold">{category}</div>
                <div className="text-sm opacity-75 mt-1">
                  {categoryProducts.length} items
                </div>
                <div className="flex items-center justify-center mt-1">
                  <Star size={14} className="text-yellow-400 fill-current mr-1" />
                  <span className="text-sm">{avgRating.toFixed(1)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                {product.featured && (
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  {product.category}
                </span>
              </div>
              <button 
                onClick={() => setSelectedProduct(product)}
                className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Eye size={16} className="text-gray-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  {product.stock} in stock
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {cart[product.id] ? (
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                      {cart[product.id]}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                )}
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Shop;