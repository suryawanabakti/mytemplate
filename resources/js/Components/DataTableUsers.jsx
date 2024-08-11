import Layout from "@/Layouts/layout/layout.jsx";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { getUsers } from "@/Services/UserService";

const DataTableUsers = () => {
    const dt = useRef(null);
    const [products, setProducts] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const res = await getUsers();
        setProducts(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Layout>
            <div className="grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <DataTable
                            loading={loading}
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

export default DataTableUsers;
