import React from "react";

import "../../assets/Styles/Table.css";
import Table from "../Common/Table";

const MyOrderPage = () => {
    return (
        <section className='align_center myorder_page'>
            <Table headings={["Order", "Products", "Total", "Status"]}>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Curso 1, Simulador 1</td>
                        <td>$2500.00</td>
                        <td>Envíado</td>
                    </tr>
                </tbody>
            </Table>
        </section>
    );
};

export default MyOrderPage;
