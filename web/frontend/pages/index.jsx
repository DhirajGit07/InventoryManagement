import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2"; 

export default function HomePage() {
  const [productName, setProductName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Descriptions, setDescription] = useState("");
  const [Discount, setDiscount] = useState("");
  const [Size, setSizes] = useState([]); // Size is stored as an array of selected sizes
  const [files, setFiles] = useState([]); // Images uploaded by the user
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({}); // Field validation errors

  const handleDropZoneDrop = (acceptedFiles) => setFiles(acceptedFiles); // Handle file upload
  const handlePreview = () => setPreview(true); // Show image preview
  const handleClosePreview = () => {
    setPreview(false);
    setFiles([]); // Clear uploaded files when preview is closed
  };

  const handleSizeChange = (size) => {
    // Toggle size selection
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleSubmit = async () => {
    // Field validation
    let formErrors = {};
    if (!productName.trim()) formErrors.productName = "Product Name mai bhru kya 😒";
    if (!model.trim()) formErrors.model = "Model Number To Dal 😒";
    if (!price) formErrors.price = "Price Kone Dalega 😒";
    if (!quantity) formErrors.quantity = "Quantity is dal n 😒";
    if (!Descriptions.trim()) formErrors.description = "Description Kha hai 😒";
    if (!Discount) formErrors.discount = "Discount bhi Dalde 😒";
    if (Size.length === 0) formErrors.sizes = "Size Select karo 😒"; // Ensure at least one size is selected
    if (files.length === 0) formErrors.image = "Photo to dal pehle 😒"; // Ensure an image is uploaded

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Prepare form data for submission
    const productData = {
      productName,
      model,
      price,
      quantity,
      Descriptions,
      Discount,
      Size,
      image: files[0], // Use the first uploaded file
    };

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("model", productData.model);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("Descriptions", productData.Descriptions);
    formData.append("Discount", productData.Discount);
    formData.append("Size", JSON.stringify(productData.Size)); // Send sizes as JSON array
    formData.append("image", productData.image);

    try {
      const response = await fetch("http://localhost:8081/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from server:", data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product data submitted successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear form fields after submission
      setProductName("");
      setModel("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setDiscount("");
      setSizes([]);
      setFiles([]);
      setPreview(false);
      setErrors({});
    } catch (error) {
      console.error("Error submitting product data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue submitting the product data.",
        confirmButtonText: "Try Again",
      });
    }
  };


  return (
    <Box>
      <Grid container justifyContent="center" className="AddProduct">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Product Form
              </Typography>

              <Grid container spacing={2}>
{/* Product Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    variant="outlined"
                    error={!!errors.productName}
                    helperText={errors.productName}
                  />
                </Grid>

{/* Model */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    variant="outlined"
                    error={!!errors.model}
                    helperText={errors.model}
                  />
                </Grid>

{/* Price */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    type="number"
                    variant="outlined"
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                </Grid>

{/* Quantity */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    type="number"
                    variant="outlined"
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                  />
                </Grid>

{/* Product Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Description"
                    value={Descriptions}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    error={!!errors.Descriptions}
                    helperText={errors.Descriptions}
                  />
                </Grid>

{/* Discount */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Discount (%)"
                    value={Discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    type="number"
                    variant="outlined"
                    error={!!errors.Discount}
                    helperText={errors.Discount}
                  />
                </Grid>

{/* Size Checkboxes */}
                <Grid item xs={12}>
                  <Typography variant="body1" className="Size mr-4">Size Options:</Typography>
                  {["S", "M", "L", "XL"].map((size) => (
                    <FormControlLabel
                      key={size}
                      control={
                        <Checkbox
                          checked={Size.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                      }
                      label={size}
                    />
                  ))}
                  {errors.Size && (
                    <Typography color="error" variant="body2">
                      {errors.Size}
                    </Typography>
                  )}
                </Grid>

{/* Image Upload */}
                <Grid item xs={12}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText="Drag and drop an image here or click"
                    onChange={handleDropZoneDrop}
                    filesLimit={1}
                    style={{
                      height: "50%",
                      border: "2px dashed #3f51b5",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                  {errors.image && (
                    <Typography color="error" variant="body2">
                      {errors.image}
                    </Typography>
                  )}
                </Grid>

{/* Preview Button */}
                {files.length > 0 && !preview && (
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePreview}
                      >
                        Preview
                      </Button>
                    </Box>
                  </Grid>
                )}

{/* Image Preview */}
                {preview && files.length > 0 && (
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" position="relative">
                      <img
                        src={URL.createObjectURL(files[0])}
                        alt={files[0].name}
                        style={{
                          maxWidth: "450px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      />
                      <IconButton
                        size="small"
                        style={{ position: "absolute", top: 5, right: 5 }}
                        onClick={handleClosePreview}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                )}
              </Grid>
{/* Submit Button */}
              <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
