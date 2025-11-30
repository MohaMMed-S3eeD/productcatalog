import { useEffect, useState } from "react";
import "./App.css";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: Category;
}

function App() {
  const PRODUCTS_URL = "http://localhost:9988/api/products";
  const CATEGORIES_URL = "http://localhost:9988/api/category/allcategory";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");
  
  // Fetch categories
  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  
  // Fetch products based on selected category
  useEffect(() => {
    const url = selectedCategory 
      ? `${PRODUCTS_URL}/category/${selectedCategory}`
      : PRODUCTS_URL;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [selectedCategory]);
  
  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Product Catalog</h1>
      </header>
      
      {/* Filters Section */}
      <div className="filters-section">
        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Category Filter and Sort */}
        <div className="filters-controls">
          {/* Category Buttons */}
          <div className="category-buttons">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <div className="sort-container">
            <label className="sort-label">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "price-asc" | "price-desc")}
              className="sort-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="results-count">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="product-image"
            />
            <div className="product-content">
              <span className="product-category">
                {product.category.name}
              </span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">
                {product.description}
              </p>
              <p className="product-price">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
