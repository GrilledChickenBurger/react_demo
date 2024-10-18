import React, { useState } from "react";
import { Button, Modal } from "antd";
 
export default function ModalComponent(props) {
    const [visible, setVisible] = useState(false);
 
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        props.handleOk();
    };
 
    const handleCancel = () => {
        setVisible(false);
        props.handleCancel();
    };
 
    return (<>
        <Button type="primary" onClick={showModal}>SHOW MODAL</Button>
        <Modal
            title="MODAL"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            afterClose={handleCancel} />

    </>);

}