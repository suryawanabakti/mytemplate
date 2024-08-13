import Layout from "@/Layouts/layout/layout.jsx";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { getUsers } from "@/Services/UserService";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

const Index = () => {
    const dt = useRef(null);
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getUsers();
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Users</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </IconField>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" />
                <Button label="Delete" icon="pi pi-trash" severity="" />
            </div>
        );
    };
    return (
        <Layout>
            <div className="grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <Toolbar
                            className="mb-4"
                            left={leftToolbarTemplate}
                        ></Toolbar>

                        <DataTable
                            loading={loading}
                            ref={dt}
                            value={users}
                            selection={selectedUsers}
                            onSelectionChange={(e) => setSelectedUsers(e.value)}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            globalFilter={globalFilter}
                            header={header}
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
