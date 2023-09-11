import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';



const CardModal = (props) => {

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>


            <div className="modal-body space-y-20 pd-40">
                <p className="label-1">Enter quantity <span className="color-popup"></span>
                </p>
                <input type="text" className="form-control quantity form-bottom" />
                {
                    props.mode === 'sell' ?
                        <>
                            <p className="label-1">Enter price to sell </p>
                            <input type="text" className="form-control quantity form-bottom" />
                        </>
                        :
                        <>
                            <p className="label-1">Enter price you offer </p>
                            <input type="text" className="form-control quantity form-bottom" />
                        </>
                }
                <div className="d-flex justify-content-between detail-2">
                    <p> Service free:</p>
                    <p className="text-right price color-popup"> 0,89 USDC </p>
                </div>
                <div className="d-flex justify-content-between detail-3">
                    <p> Total amount:</p>
                    <p className="text-right price color-popup"> 4 USDC </p>
                </div>
                {
                    !props.mode
                        ? <Link to="/wallet" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Purchase</Link>
                        : props.mode === 'sell'
                            ? <Link to="/wallet" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Sell</Link>
                            : <Link to="/wallet" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Offer</Link>
                }
            </div>
        </Modal >

    );
};

export default CardModal;
