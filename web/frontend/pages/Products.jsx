import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    InputBase,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, alpha } from '@mui/material/styles';
import Swal from 'sweetalert2';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
    
                // Trigger SMS for products with quantity less than 10
                const lowStockProducts = data.filter(product => product.quantity < 10);
                if (lowStockProducts.length > 0) {
                    Swal.fire({
                        title: 'Low Stock Alert!',
                        text: `${lowStockProducts.length} product(s) have a quantity less than 10.`,
                        icon: 'warning',
                        showCancelButton: true, // Adds the second button
                        confirmButtonText: 'Send SMS',
                        cancelButtonText: 'Do Not Send',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // User clicked "Send SMS"
                            // Send SMS to admin for each low stock product
                            lowStockProducts.forEach(product => {
                                fetch('http://localhost:8081/api/send-sms', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        productName: product.productName,
                                        quantity: product.quantity,
                                    }),
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            console.log(`SMS sent for ${product.productName}`);
                                        } else {
                                            console.error('Failed to send SMS');
                                        }
                                    })
                                    .catch(error => console.error('Error sending SMS:', error));
                            });
                        } else {
                            // User clicked "Do Not Send"
                            console.log('User chose not to send SMS.');
                        }
                    });
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);
    
    

    // Sorting the products by quantity in ascending order*****************
    const sortedProducts = products
        .filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.price.toString().includes(searchTerm) ||
            product.quantity.toString().includes(searchTerm)
        )
        .sort((a, b) => a.quantity - b.quantity);

    const getRowColor = (quantity) => {
        if (quantity < 10) {
            return 'red'; // Red for quantity less than 10
        } else if (quantity >= 10 && quantity < 50) {
            return 'orange'; // Yellow for quantity between 10 and 50
        } else {
            return 'green'; // Green for quantity 50 and above
        }
    };

    // Handle changes to form inputs
    const handleInputChange = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Edit Product************************************
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setImageFile(null);
        setImagePreviewUrl(`http://localhost:8081/uploads/${product.image}`);
        setOpenEditModal(true);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', selectedProduct.productName);
        formData.append('model', selectedProduct.model);
        formData.append('price', selectedProduct.price);
        formData.append('quantity', selectedProduct.quantity);
        formData.append('Discount', selectedProduct.Discount);
        formData.append('Size', selectedProduct.Size);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        fetch(`http://localhost:8081/api/products/${selectedProduct.ID}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update the product');
                }
                return response.json();
            })
            .then(() => {
                fetch('http://localhost:8081/api/products')
                    .then((response) => response.json())
                    .then((updatedProducts) => {
                        setProducts(updatedProducts);
                        setOpenEditModal(false);
                        Swal.fire('Updated!', 'Your product has been updated.', 'success');
                    })
                    .catch((error) => console.error('Error fetching updated products:', error));
            })
            .catch((error) => {
                Swal.fire('Error!', 'There was an error updating the product.', 'error');
            });
    };

    // Delete Product******************************************
    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8081/api/products/${productId}`, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to delete the product');
                        }
                        setProducts(products.filter((product) => product.ID !== productId));
                        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'There was an error deleting the product.', 'error');
                    });
            }
        });
    };

    // *******************************************
    return (
        <div className="products-container">
            <Typography variant="h4" gutterBottom className="products-title">
                Product List
            </Typography>
            <Search className=' SearchField mb-4'>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Search>
            <TableContainer component={Paper} className="custom-table-container">
                <Table>
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProducts.map((product, index) => (
                            <TableRow key={product.ID} className="custom-table-row">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.model}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                               
                                <TableCell
                                    style={{
                                        color: getRowColor(product.quantity),
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {product.quantity}
                                </TableCell>
                                <TableCell>{product.Discount}%</TableCell>
                                <TableCell>{product.Size}</TableCell>
                                <TableCell>
                                    {product.image && (
                                        <img
                                            src={`http://localhost:8081/uploads/${product.image}`}
                                            alt={product.productName}
                                            className="product-image"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="button-container">
                                        <Button
                                            // variant="contained"
                                            // color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            // variant="contained"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(product.ID)}
                                            // style={{ backgroundColor: '#bf0d0d', color: 'white', marginLeft: '10px' }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ********* Edit Product Modal ********* */}
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <form onSubmit={handleEditSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="productName"
                                label="Product Name"
                                type="text"
                                fullWidth
                                value={selectedProduct.productName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                name="model"
                                label="Model"
                                type="text"
                                fullWidth
                                value={selectedProduct.model}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                value={selectedProduct.price}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                name="quantity"
                                label="Quantity"
                                type="number"
                                fullWidth
                                value={selectedProduct.quantity}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                name="Discount"
                                label="Discount"
                                type="number"
                                fullWidth
                                value={selectedProduct.Discount}
                                onChange={handleInputChange}
                            />
                             <TextField
                                autoFocus
                                margin="dense"
                                name="Size"
                                label="Size"
                                type="text"
                                fullWidth
                                value={selectedProduct.Size}
                                onChange={handleInputChange}
                            />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            {imageFile && (
                                <Typography variant="body2" color="textSecondary">
                                    Selected Image: {imageFile.name}
                                </Typography>
                            )}
                            {imagePreviewUrl && (
                                <div style={{ marginTop: '10px' }}>
                                    <img
                                        src={imagePreviewUrl}
                                        alt="Preview"
                                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// Styled Components for Search Bar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
