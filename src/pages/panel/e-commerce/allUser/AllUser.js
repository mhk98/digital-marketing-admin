import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
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
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../../features/user/user";

// import { productData } from "../product/ProductData";

const AllUser = () => {
  const [sm, updateSm] = useState(false);
  const { data, isLoading, error } = useGetAllUserQuery();
  const [createUser] = useCreateUserMutation();
  const [updateId, setUpdateId] = useState("");
  const [editData, setEditData] = useState({});
  const [passState, setPassState] = useState(false);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
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
    name: "",
    email: "",
    password: "",
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
      image: "",
    });
    setFile("");
    setImage("");
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
    console.log("form", data);
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Email", data.email);
    formData.append("Password", data.passcode);
    formData.append("role", role);
    formData.append("image", image);
    try {
      const res = await createUser(formData);
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

  const [updateSlider] = useUpdateUserMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async () => {
    const formData = new FormData();

    formData.append("image", image);

    try {
      const response = await updateSlider({ id: updateId, data: formData });

      if (response) {
        toast.success(response.data.message);
        resetForm();
        onFormCancel();
      }
    } catch (error) {
      toast.error(error.message);
    }
    setFiles([]);
  };

  const [deleteUser] = useDeleteUserMutation();

  // Function to delete a category
  const handleDeleteSlider = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res) {
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

  const slider = data?.data || "";

  console.log("data", slider);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = slider.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        {/* Header Part Start */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>All User</BlockTitle>
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
                        <span>Add User</span>
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
                <span>Image</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Name</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Email</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Role</span>
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
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.Category_Id}>
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
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`http://localhost:5000/${item.image}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.Name}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.Email}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.role}</span>
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
                                {/* <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setUpdateId(item.Id);
                                      setEditData({
                                        title: item.title,
                                        text: item.text,
                                        image: item.image,
                                      });
                                      toggle("edit");
                                    }}
                                  >
                                    <Icon name="edit"></Icon>
                                    <span>Edit</span>
                                  </DropdownItem>
                                </li> */}
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
                                      handleDeleteSlider(item.Id);
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
            {slider.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={slider.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No user found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        {/* <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Update User {editData.title}</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          User Title {editData.title}
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={editData.title}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.title && <span className="invalid">{errors1.title.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Text
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type=""
                            name="text"
                            defaultValue={editData.text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.text && <span className="invalid">{errors1.text.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label">User Image</label>
                        <div className="form-control-wrap">
                          <input accept="image/*" type="file" onChange={handleChange} />
                          {file ? (
                            <img src={file} alt="" />
                          ) : (
                            <img src={`http://localhost:5000/${editData.image}`} alt="" />
                          )}
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
        </Modal> */}

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add User</BlockTitle>
              <BlockDes>
                <p>Add information or update User.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                        style={{ width: "100%", padding: "10px" }}
                        placeholder="Enter your name"
                        className="form-control-lg form-control"
                      />
                      {errors.name && <p className="invalid">This field is required</p>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Email
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        bssize="lg"
                        name="email"
                        id="default-01"
                        {...register("email", { required: true })}
                        style={{ width: "100%", padding: "10px" }}
                        className="form-control-lg form-control"
                        placeholder="Enter your email address or username"
                      />
                      {errors.email && <p className="invalid">This field is required</p>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <a
                        href="#password"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setPassState(!passState);
                        }}
                        className={`form-icon lg form-icon-right passcode-switch ${
                          passState ? "is-hidden" : "is-shown"
                        }`}
                      >
                        <Icon name="eye" className="passcode-icon icon-show"></Icon>

                        <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                      </a>
                      <input
                        type={passState ? "text" : "password"}
                        id="password"
                        name="passcode"
                        {...register("passcode", { required: "This field is required" })}
                        placeholder="Enter your passcode"
                        className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                      />
                      {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Form.Select aria-label="Default select example" onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose User Role</option>
                    <option value="employee">employee</option>
                    <option value="admin">admin</option>
                    <option value="super admin">super admin</option>
                  </Form.Select>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      Profile Image
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange} />
                      <img src={file} alt="" />
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add User</span>
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

export default AllUser;
