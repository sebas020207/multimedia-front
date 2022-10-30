import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ImagenProductoDefault from "../../assets/img/default-product-pic.jpg";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import FormTextField from "../../components/FormTextField";
import FormTextArea from "../../components/FormTextArea";
import FormSelect from "../../components/FormSelect";
import FormImage from "../../components/FormImage";
import FormSubmit from "../../components/FormSubmit";
import FormLeftSection from "../../components/FormLeftSection";
import FormRightSection from "../../components/FormRightSection";
import FormSubmitSection from "../../components/FormSubmitSection";
import useAxios from "../../hooks/useAxios";
import useAlert from "../../hooks/useAlert";
import { FileUploader } from "react-drag-drop-files";

const links = [
  { name: "Productos", path: "/admin/products" },
  { name: "Agregar producto", path: "/admin/add/product" },
];

const AdminAddProduct = (props) => {
  const id = props.match.params.id;
  const isEdit = Boolean(id);
  const history = useHistory();
  const { get, post, put } = useAxios();
  const [state, setState] = useState({
    name: "",
    description: "",
    supplier_id: "",
    category_id: "",
    subcategory_id: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [stateImage, setStateImage] = useState({
    image: null,
  });
  const [statePDF, setStatePDF] = useState({
    pdf: null,
  });
  const [modifiedImage, setModifiedImage] = useState(false);
  const [modifiedPDF, setModifiedPDF] = useState(false);
  const { openAlert } = useAlert();

  useEffect(() => {
    loadCategories();
    loadSuppliers();
    loadProduct();
    loadImage();
    loadPdf();
  }, []);

  // Esto hace una cagra de datos default, para que
  // aparezcan opciones en un principio seleccionadas
  useEffect(() => {
    if (!isEdit) setState({ ...state, supplier_id: 1, category_id: 1 });
  }, [suppliers, categories]);

  useEffect(() => {
    loadSubcategories(state.category_id);
  }, [state.category_id]);

  const loadImage = async () => {
    if (!stateImage.image) {
      if (isEdit) {
        try {
          const url = "/admin/product/images/" + id;
          const response = await get(url, { responseType: "blob" });
          if (response.data) {
            setStateImage({ image: response.data });
          }
        } catch (error) {
          console.log(
            "Posiblemente no existe una imágen para este producto! (lo cual sería muy raro)"
          );
          console.log({ error });
        }
      } else {
        setStateImage({ image: null });
      }
    }
  };


  const loadPdf = async () => {
    if (!statePDF.pdf) {
      if (isEdit) {
        try {
          const url = "/product/" + id + "/pdf";
          const response = await get(url, { responseType: "blob" });
          
          if (response.data) {
            setStatePDF({ pdf: response.data });
            
          }
        } catch (error) {
          console.log(
            "Posiblemente no existe una imágen para este producto! (lo cual sería muy raro)"
          );
          console.log({ error });
        }
      } else {
        setStateImage({ image: null });
      }
    }
  };

  const loadSuppliers = async () => {
    try {
      const response = await get("admin/suppliers");
      if (response.data)
        setSuppliers(
          response.data.map((sup) => ({ title: sup.name, value: sup.id }))
        );
    } catch (error) {
      console.log({ error });
    }
  };

  const loadCategories = async () => {
    try {
      const response = await get("admin/categories");
      if (response.data)
        setCategories(
          response.data.map((cat) => ({ title: cat.name, value: cat.id }))
        );
    } catch (error) {
      console.log({ error });
    }
  };

  const loadSubcategories = async (category_id) => {
    if (!category_id) return;
    try {
      const response = await get(`admin/subcategory/${category_id}`);
      if (response.data)
        setSubcategories(
          response.data.map((sub) => ({ title: sub.name, value: sub.id }))
        );
    } catch (error) {
      console.log({ error });
    }
  };

  const loadProduct = async () => {
    if (!isEdit) return;
    try {
      const response = await get(`admin/product/${id}`);
      setState({ ...state, ...response.data });
      console.log({ response });
      if (response.data.category_id)
        loadSubcategories(response.data.category_id);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append("name", state.name);
      data.append("description", state.description);
      data.append("supplier_id", state.supplier_id);
      data.append("category_id", state.category_id);
      data.append("subcategory_id", state.subcategory_id);
      data.append("is_archived", 0);
      if (stateImage.image) {
        if (modifiedImage) {
          data.append("photo", stateImage.image);
        }
      } else {
        await openAlert("Se debe seleccionar la imagen del producto");
        return;
      }

      if (statePDF.pdf) {
        if (modifiedPDF) {
          data.append("pdf", statePDF.pdf);
        }
      } else {
        await openAlert("Se debe seleccionar el PDF del producto");
        return;
      }

      let response;

      if (isEdit) {
        response = await put(`admin/product/${id}`, data);
      } else {
        response = await post("admin/product", data);
      }
      await openAlert("Se guardó la información correctamente");
      history.push("/admin/products");
      console.log({ response });
    } catch (error) {
      await openAlert("Surgió un problema al agregar el producto");
      console.log({ error });
    }
  };

  const handleChangeImage = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    setStateImage({ image: file });
    setModifiedImage(true);
  };

  const handleChangePDF = (file) => {
    console.log(file);
    setStatePDF({ pdf: file });
    setModifiedPDF(true);
  };

  const fileTypes = ["PDF"];

  return (
    <AdminPage title="Productos">
      <BreadCrum links={links} />
      <AdminTitle>{isEdit ? "Editar" : "Agregar"} producto</AdminTitle>

      <form onSubmit={handleSubmit}>
        <FormLeftSection>
          <FormTextField
            title="Nombre"
            name="name"
            id="product-name"
            value={state.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
          />
          <FormTextArea
            title="Descripción"
            name="description"
            id="product-desc"
            value={state.description}
            onChange={handleChange}
            placeholder="Descripción"
            rows="7"
            required
          />
          <FormSelect
            title="Proveedor"
            name="supplier_id"
            id="supplier"
            value={state.supplier_id}
            icon="fa-briefcase"
            onChange={handleChange}
            op={suppliers}
            required
          />
          <FormSelect
            title="Categoría"
            name="category_id"
            id="category"
            value={state.category_id}
            icon="fa-briefcase"
            op={categories}
            onChange={handleChange}
            required
          />
          <FormSelect
            title="Subcategoría"
            name="subcategory_id"
            id="subcategory"
            value={state.subcategory_id}
            icon="fa-briefcase"
            op={subcategories}
            onChange={handleChange}
            required
          />
        </FormLeftSection>
        <FormRightSection>
          <FormImage
            title="Imagen del producto"
            name="photo"
            id="product-pic"
            msg="Seleccionar"
            placeholder={ImagenProductoDefault}
            onChange={handleChangeImage}
            value={stateImage.image}
          />
          <FileUploader
            handleChange={handleChangePDF}
            types={fileTypes}
            label={"Arrasta hasta aquí o da clic para seleccionar un archivo"}
          />
          <embed
            src={window.URL.createObjectURL(
              new Blob([statePDF.pdf], { type: "application/pdf" })
            )}
            type="application/pdf"
            width="100%"
            height="250px"
          />
          
        </FormRightSection>
        <FormSubmitSection>
          <FormSubmit name="submit" id="submit" value="Guardar" />
        </FormSubmitSection>
      </form>
    </AdminPage>
  );
};

export default AdminAddProduct;
