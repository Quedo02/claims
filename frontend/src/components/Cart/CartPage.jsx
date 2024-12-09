import React from "react";

import "../../assets/Styles/CartPage.css";
import remove from "../../assets/Images/remove.png";
import user from "../../assets/Images/user.webp";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";

const CartPage = () => {
    return (
        <section className='align_center cart_page'>
            <div className='align_center user_info'>
                <img src={user} alt='user profile' />
                <div>
                    <p className='user_name'>Juan Pablo</p>
                    <p className='user_email'>juanp.carrasq@gmail.com</p>
                </div>
            </div>

            <Table headings={["Producto/s", "Precio", "Cantidad", "Total", "Eliminar"]}>
                <tbody>
                    <tr>
                        <td>Lobosimulador medio superior</td>
                        <td>$1,499.00</td>
                        <td className='align_center table_quantity_input'>
                            <QuantityInput />
                        </td>
                        <td>$1,499.99</td>
                        <td>
                            <img
                                src={remove}
                                alt='remove icon'
                                className='cart_remove_icon'
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <table className='cart_bill'>
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>$1,499.99</td>
                    </tr>
                    <tr>
                        <td>Cargo extra</td>
                        <td>$25.00</td>
                    </tr>
                    <tr className='cart_bill_final'>
                        <td>Total</td>
                        <td>$1,524.99</td>
                    </tr>
                </tbody>
            </table>

            <button className='search_button checkout_button'>Pagar</button>
        </section>
    );
};

export default CartPage;
