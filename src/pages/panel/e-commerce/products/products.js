import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
import SimpleBar from "simplebar-react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  PreviewAltCard,
  Row,
} from "../../../../components/Component";

import toast from "react-hot-toast";

import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

import { Form } from "react-bootstrap";
import { useCreateProductMutation, useDeleteProductMutation, useGetAllProductQuery, useUpdateProductMutation } from "../../../../features/products/products";

// import { productData } from "../product/ProductData";

const Products = () => {
  // const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [sm, updateSm] = useState(false);
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [categories, setCategorites] = useState([]);
  const [title, setTitle] = useState("");

  const [editData, setEditData] = useState({});

  console.log(editData);
  
  const { data, isLoading, isError, error } = useGetAllProductQuery();

  const [txt, setTxt] = useState("");
  const [maxChars] = useState(130);
  const [remainingChars] = useState(0);

console.log('txt info', txt);

  const onChange = (e) => {
    setTxt(e.currentTarget.value.slice(0, maxChars));
  };

  useEffect(() => {
    const colorStyle = {
      color: `${maxChars - txt.length < remainingChars ? "red" : "blue"}`,
      display: `${maxChars - txt.length < remainingChars ? "inline" : "none"}`,
    };

    const spanElement = document.getElementById("char-count");

    if (spanElement) {
      Object.entries(colorStyle).forEach(([key, value]) => {
        spanElement.style[key] = value;
      });
    }
  }, [txt, maxChars, remainingChars]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching health data", error1);
    } else if (!isLoading) {
      if (data) {
        setCategorites(data.data);
      }
    }
  }, [data, isLoading, isError, error]);

  console.log("categories", categories);
  const [createProduct] = useCreateProductMutation();

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      text: "",
    });
    setImage("");
    setFile("");
    setTxt("");
    reset({});
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", txt);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    console.log('product info', formData);

    try {
      const res = await createProduct(formData );
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setFiles([]);
    resetForm();
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,

    formState: { errors: errors1 },
  } = useForm();

  // const onEditSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("Name", data.Name);
  //   formData.append("Stock", data.Stock);
  //   formData.append("Image", image);

  //   console.log("formData", formData);
  //   try {
  //     const data = await axios.put(`https://digital-agency-backend.onrender.com/api/v1/category/${updateId}`, formData);

  //     if (data) {
  //       toast.success(data.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   }

  //   resetForm();
  // };

  const [updateProduct] = useUpdateProductMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async () => {
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", txt);
    // formData.append("category", category);
    // formData.append("price", price);
    // formData.append("image", image);

    const data = {
      title,
      description:txt,
      category,
      price,
      image
    }
    
    console.log("updateId", updateId);
    try {
      const response = await updateProduct({ Id: updateId, data: data });

      if (response) {
        toast.success(response.data.message);
        onFormCancel();
      }
    } catch (error) {
      toast.error(error.message);
    }
    setFiles([]);
    resetForm();
  };

  const [deleteProduct] = useDeleteProductMutation();

  // Function to delete a category
  const handleDeleteBanner = async (id) => {
    try {
      const res = await deleteProduct(id);

      if (res.error.data === 'invalid token') {
        toast.success('Only admin can remove the info');

      } else {
        toast.success(res.data.message);

      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    reset(formData);
    reset1(formData);
  }, [formData]);

  // selects all the products
  // const selectorCheck = (e) => {
  //   let newData;
  //   newData = data.map((item) => {
  //     item.check = e.currentTarget.checked;
  //     return item;
  //   });
  //   setData([...newData]);
  // };

  // selects one product
  // const onSelectChange = (e, id) => {
  //   let newData = data;
  //   let index = newData.findIndex((item) => item.id === id);
  //   newData[index].check = e.currentTarget.checked;
  //   setData([...newData]);
  // };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const [projects, setProjects] = useState([]);

  const filteredData = projects.filter((item) => !["Donation", "Home", "Footer"].includes(item.page));

  const { data: data1, isLoading: isLoading1, isError: isError1, error: error1 } = useGetAllProductQuery();
  useEffect(() => {
    if (isError1) {
      console.error("Error fetching Subcategory data", error1);
    } else if (!isLoading1) {
      if (data1) {
        setProjects(data1.data);
      }
    }
  }, [data1, isLoading1, isError1, error1]);

  //   const project = data1?.data || "";

  console.log("data", projects);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems);
  // Change Page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   console.log("project", project);
  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        {/* Header Part Start */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Product</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    {/* <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Quick search by SKU"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li> */}
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Product</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/* Header Part End */}

        {error ? <>Oh, no there was an error</> : isLoading ? <>Loading...</> : currentItems ? <></> : null}

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              {/* <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="uid_1"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="uid_1"></label>
                </div>
              </DataTableRow> */}
              <DataTableRow size="sm">
                <span>Title</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Description</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Image</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Price</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Category</span>
              </DataTableRow>

              <DataTableRow>
                <span>Create Date</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span>Created By</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li className="me-n1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        href="#toggle"
                        onClick={(ev) => ev.preventDefault()}
                        className="dropdown-toggle btn btn-icon btn-trigger"
                      >
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>
            {currentItems.length
              ? currentItems.map((item) => (
                  <DataTableItem key={item.Id}>
                    {/* <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={item.Check}
                          id={item.id + "uid1"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item.Category_Id)}
                        />
                        <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                      </div>
                    </DataTableRow> */}
                    

                    <DataTableRow>
                      <span className="tb-sub">{item.title}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.description}</span>
                    </DataTableRow>

                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`https://digital-agency-backend.onrender.com/${item.image}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.price}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.category}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">$ {item.createdAt}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">Admin</span>
                    </DataTableRow>
                    {/* <DataTableRow size="md">
                      <span className="tb-sub">{categoryList.join(", ")}</span>
                    </DataTableRow> */}

                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="me-n1">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              tag="a"
                              href="#more"
                              onClick={(ev) => ev.preventDefault()}
                              className="dropdown-toggle btn btn-icon btn-trigger"
                            >
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu end>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setUpdateId(item.Id);
                                      setEditData({
                                        title: item.title,
                                        txt: item.description,
                                        price: item.price,
                                        category: item.category,
                                        image: item.image,
                                      });
                                      toggle("edit");
                                    }}
                                  >
                                    <Icon name="edit"></Icon>
                                    <span>Edit</span>
                                  </DropdownItem>
                                </li>
                                {/* <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#view"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onEditClick(item.id);
                                        toggle("details");
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>View Product</span>
                                    </DropdownItem>
                                  </li> */}
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#remove"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      handleDeleteBanner(item.Id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove </span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>

          <PreviewAltCard>
            {categories.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={categories.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No Subcategory found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)} enctype="multipart/form-data" method="post">
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="title"
                            defaultValue={editData.title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.title && <span className="invalid">{errors1.title.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Description
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            rows="3"
                            // cols="50"
                        onChange={onChange}
                            maxLength={maxChars}
                            minLength="1"
                            defaultValue={editData.txt}
                            placeholder="Enter message"
                            style={{ width: "100%", padding: "10px", height: "120px" }}
                          />
                          <p>
                            {txt.length}/{maxChars}
                          </p>
                        </div>
                      </div>
                    </Col>
                    {/* <Col size="12">
                      <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {filteredData?.map((item) => (
                          <option>
                            <span>{item.Id} </span>

                            {item.category}
                          </option>
                        ))}
                      </Form.Select>
                    </Col> */}
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="category">
                          Product Image
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange} />
                          {file ? (
                            <img src={file} alt="" />
                          ) : (
                            <img src={`https://digital-agency-backend.onrender.com/${editData.image}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="price"
                            defaultValue={editData.price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.price && <span className="invalid">{errors1.price.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Category
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="category"
                            defaultValue={editData.title}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.category && <span className="invalid">{errors1.category.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Save Change</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Product</BlockTitle>
              <BlockDes>
                <p>Add information or update Subcategory.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="title"
                        {...register("title", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Description
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        rows="3"
                        // cols="50"
                        onChange={onChange}
                        maxLength={maxChars}
                        minLength="1"
                        value={txt}
                        placeholder="Enter message"
                        style={{ width: "100%", padding: "10px", height: "120px" }}
                      />
                      <p>
                        {txt.length}/{maxChars}
                      </p>
                    </div>
                  </div>
                </Col>
                {/* <Col size="12">
                  <Form.Select
                    aria-label="Default select example"
                    {...register("category", {
                      required: "Please choose a category",
                    })}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {filteredData?.map((item) => (
                      <option key={item.Id}>
                        <span>{item.Id} </span>
                        {item.category}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.category && <span className="invalid">{errors.category.message}</span>}
                </Col> */}
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      Product Image
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange} />
                      <img src={file} alt="" />
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="price"
                        {...register("price", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.price && <span className="invalid">{errors.price.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Category
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="category"
                        {...register("category", {
                          required: "this field is required.",
                        })}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.category && <span className="invalid">{errors.category.message}</span>}
                    </div>
                  </div>
                </Col>


                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Product</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default Products;
