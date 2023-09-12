import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';



const CardModal = (props) => {

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <div className="modal-body space-y-20 pd-40">
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
                {
                    props.mode === 'sell'
                        ? <Link to="/wallet" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Sell</Link>
                        : <Link to="/wallet" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Offer</Link>
                }
            </div>
        </Modal >

    );
};

export default CardModal;
