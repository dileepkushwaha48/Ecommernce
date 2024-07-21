import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => { 
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    
    if (confirmDelete) {
      try {
        await fetch('http://localhost:4000/removeproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });
        fetchInfo(); // Refresh products list after deletion
      } catch (error) {
        console.error('Error removing product:', error);
      }
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Product", "Title", "Old Price", "New Price", "Category"];
    const tableRows = [];

    allproducts.forEach((product) => {
      const productData = [
        "", // Placeholder for image or product icon, if needed
        product.name,
        `Rs${product.old_price}`,
        `Rs${product.new_price}`,
        product.category,
      ];
      tableRows.push(productData);
    });

    doc.text("Product List", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
    });

    doc.save("product-list.pdf");
  };

  const exportToExcel = () => {
    // Create a worksheet from JSON data
    const wsData = allproducts.map((product) => ({
      Product: product.name,
      "Old Price": `Rs${product.old_price}`,
      "New Price": `Rs${product.new_price}`,
      Category: product.category,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    
    // Add footer to the worksheet
    const footer = "This is the product list";
    XLSX.utils.sheet_add_aoa(ws, [[footer]], { origin: -1 }); // Add footer to the end of the sheet

    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // Generate Excel file and prompt download
    XLSX.writeFile(wb, "product-list.xlsx");
  };

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="container-btn">
        <button className="export-pdf" onClick={exportToPDF}>Export to PDF</button>
        <button className="export-excel" onClick={exportToExcel}>Export to Excel</button>
      </div>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => (
          <div key={e.id}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={e.image} alt="" />
              <p className="listproduct-product-title">{e.name}</p>
              <p>Rs{e.old_price}</p>
              <p>Rs{e.new_price}</p>
              <p>{e.category}</p>
              <img
                className="listproduct-remove-icon"
                onClick={() => removeProduct(e.id, e.name)}
                src={cross_icon}
                alt="Remove"
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
