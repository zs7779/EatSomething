import React, { ChangeEvent, useState } from 'react';
import { menuType, menuItemType, orderItemType } from '../utils/types';
import { useSelector, useDispatch, DefaultRootState } from 'react-redux';
import { modalShow, modalHide } from '../reducers/modalReducer';
import { orderChange } from '../reducers/orderReducer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/MenuPanel.css';


function OrderModal() {
    const dispatch = useDispatch();
    const item = useSelector((state: {modal:DefaultRootState, order:DefaultRootState}) => state.modal as menuItemType|null);
    const show = item !== null;
    const [ quantity, setQuantity ] = useState(1);
    const totalPrice = item ? item.price * quantity : 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value));
    };
    const handleClose = () => {
        dispatch(modalHide());
        setQuantity(1);
    };
    const handleAdd = () => {
        if (item) {
            dispatch(orderChange({
                name: item.name,
                price: item.price,
                quantity: quantity,
            } as orderItemType));
        } else {
            console.log("No item");
        }
        dispatch(modalHide());
        setQuantity(1);
    }
    

    return (<Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Add to Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {item && <div className="m-2">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
            </div>}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            {item && <div className="d-flex align-items-center">
                <span>Quantity: </span>
                <input type="number" defaultValue={1} min="1" max="99" onChange={handleChange} className="form-control number mx-1"/>
                <Button variant="outline-primary" onClick={handleAdd} className="add-button">
                    ${totalPrice.toFixed(2)} Add to Order
                </Button>
            </div>}
        </Modal.Footer>
    </Modal>)
}

function MenuItem({item}: {item: menuItemType}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(modalShow({
            name: item.name,
            description: item.description,
            price: item.price,
        }));
    };
    return (
        <div className="card menu-item m-2" onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <div>${item.price}</div>
            </div>
        </div>
    );
}

function MenuPanel({menu}: {menu: menuType[]}) {

    return (
        <div>
            {menu.map(section => (
            <div key={section.name} className="my-4">
                <h4>{section.name}</h4>
                <div className="d-flex flex-wrap">
                    {section.items.map(item => (
                        <MenuItem key={`${section.name}-${item.name}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
            ))}
            <OrderModal/>
        </div>
    );
}

export default MenuPanel;