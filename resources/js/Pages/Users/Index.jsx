import Layout from "@/Layouts/layout/layout.jsx";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Index = () => {
    const dt = useRef(null);
    const [products, setProducts] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const getUsers = async () => {
        try {
            const res = await axios.get(route("users.get-users"));
            setProducts(res.data);
        } catch (error) {
            alert("error");
        }
    };
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <Layout>
            <div className="grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <DataTable
                            ref={dt}
                            value={products}
                            selection={selectedProducts}
                            onSelectionChange={(e) =>
                                setSelectedProducts(e.value)
                            }
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            globalFilter={globalFilter}
                        >
                            <Column
                                selectionMode="multiple"
                                exportable={false}
                            ></Column>

                            <Column
                                field="name"
                                header="Name"
                                sortable
                                style={{ minWidth: "16rem" }}
                            ></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;
