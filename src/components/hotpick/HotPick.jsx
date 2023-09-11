import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import CardModal from '../layouts/CardModal';
import icon1 from '../../assets/images/icon/rain1.svg'
import icon2 from '../../assets/images/icon/rain2.svg'
import icon3 from '../../assets/images/icon/usdc.svg'
import { Link } from 'react-router-dom';

HotPick.propTypes = {
    data: PropTypes.array,
};

function HotPick(props) {

    const [modalShow, setModalShow] = useState(false);
    const { data } = props;

    return (
        <section className="tf-hot-pick">
            <div className="tf-container">
                <div className="row ">
                    <div className="col-md-12 pd32">
                        <div className="tf-heading wow fadeInUp">

                        </div>
                    </div>
                    <div className="col-md-12">
                        {
                            <div className="row tf-filter-container wow fadeInUp">
                                {
                                    data.map(idx => (
                                        <div key={idx.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d cyber">
                                            <div className="sc-product style2">
                                                <div className="top">
                                                    <div className="tag">{idx.title}</div>

                                                </div>
                                                <div className="bottom">
                                                    <div className="details-product">
                                                        <div className="author">
                                                            <div className="avatar">
                                                                <img src={idx.avt} alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <div className="position">Owner</div>
                                                                <div className="name"> <Link to="#">{idx.create}</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="features">
                                                    <div className="product-media">
                                                        <img src={idx.img} alt="images" />
                                                    </div>
                                                    <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                    <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                                </div>
                                                <div className="bottom-style2">
                                                    <div className="price">
                                                        <div className="icon"><img src={icon3} alt="images" /></div>
                                                        <div className="content">
                                                            <div className="name">USDC</div>
                                                            <div className="cash">{idx.price}</div>
                                                        </div>
                                                    </div>
                                                    <div className="product-button">
                                                        <Link to='' onClick={() => setModalShow(true)} className="tf-button">Purchase</Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        }



                    </div>

                </div>

                <div className="col-md-12">
                    <div className="btn-loadmore mt17 mb17 wow fadeInUp">
                        <Link to="/explore" className="tf-button loadmore style-4">Load more</Link>
                    </div>
                </div>
            </div>

            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </section>
    );
}

export default HotPick;