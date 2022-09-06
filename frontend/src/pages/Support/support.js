import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import "./support.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

const Support = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);

    const onClick = (itemIndex) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];

        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        }
        else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            }
            else {
                _activeIndex.splice(index, 1);
            }
        }

        setActiveIndex(_activeIndex);
    }

    return (
        <div className="main-body">
            <div className="main-first-section vnmese p-grid cl-darkgreen bg-yellow pb-40">
                <div className="p-col-2"></div>
                <h2 className="p-col-8 main-second-section-text fw-bold fs-lg mt-30 ">
                    {/* {t('support-first-section-text')}</h2> */}
                    Trợ giúp & Các câu hỏi thường gặp</h2>
            </div>

            <div className="support-second-section p-grid p-30">
                <Accordion className="p-col-12">
                    <AccordionTab header="1. Làm thế nào để tôi đăng ký và sử dụng khóa học?  ">
                        <div className="p-col-12 p-sm-12 cl-darkgreen support-second-section-text fw-bold ">
                            {/* <h2 className="fs-lg fw-bold">{t('main-second-section-text-one')}</h2> */}
                            <p>Bước 1: Truy cập <a href="https://viesign.org/">https://viesign.org/</a> </p>
                            <img className="" src={require('../../assets/images/support/buoc1.1.png').default} />
                            <p>Bước 2: Nhấp vào “Đăng ký" trên thanh điều hướng. Điền đầy đủ các thông tin mục đăng ký, sau đó ấn “Đăng ký"
                            </p>
                            <img className="" src={require('../../assets/images/support/buoc1.2.png').default} />
                            <p>Bước 3: Nhấp vào “Đăng nhập". Nhập email và mật khẩu bạn đã vừa đăng ký tại bước 2.
                            </p>
                            <img className="" src={require('../../assets/images/support/buoc1.3.png').default} />
                            <p>Bước 4: Vậy là bạn đã đăng ký tài khoản thành công! Bây giờ, truy cập trang <a href="https://viesign.org/hoc">https://viesign.org/hoc</a> và nhấp vào bài học đầu tiên để bắt đầu chương trình học.
                            </p>
                            <img className="" src={require('../../assets/images/support/buoc1.4.1.png').default} />
                            <img className="" src={require('../../assets/images/support/buoc1.4.2.png').default} />
                            <img className="" src={require('../../assets/images/support/buoc1.4.3.png').default} />
                            <p>Bước 5: Ngoài việc học các bài học tại trang <a href="https://viesign.org/hoc">https://viesign.org/hoc</a>, các bạn có thể củng cố và luyện tập kiến thức với các trò chơi của VieSign tại trang <a href="https://viesign.trochoi/">https://viesign.org/trochoi</a>.
                            </p>
                            <img className="" src={require('../../assets/images/support/buoc1.5.png').default} />
                        </div>
                    </AccordionTab>
                    <AccordionTab header="2. Làm thế nào để tôi có thể xem các bài học đã học? ">
                        <div className="p-col-12 p-sm-12 cl-darkgreen support-second-section-text fw-bold ">
                            <p>Bước 1: Đăng nhập vào tài khoản đã đăng ký. </p>
                            <p>Bước 2: Nhấp vào tên tài khoản trên thanh điều hướng để đến trang cá nhân của bạn.
                            </p>
                            <img className="" src={require('../../assets/images/support/buoc2.png').default} />
                            <p>Bước 3: Kiểm tra lại những phần bài học đã học bằng cách ấn vào “Bài học" </p>
                            <img className="" src={require('../../assets/images/support/buoc2.1.png').default} />
                        </div>
                    </AccordionTab>
                    <AccordionTab header="3. Làm thế nào để tôi có thể chỉnh sửa thông tin của mình?">
                        <div className="p-col-12 p-sm-12 cl-darkgreen support-second-section-text fw-bold ">
                            <p>Bước 1: Đăng nhập vào tài khoản đã đăng ký. </p>
                            <p>Bước 2: Nhấp vào tên tài khoản trên thanh điều hướng để đến trang cá nhân của bạn.
                            </p>
                            <img className="" src={require('../../assets/images/support/buoc2.png').default} />
                            <p>Bước 3: Kiểm tra lại thông tin cá nhân bằng cách ấn vào “Thông tin". Bạn có thể tùy chỉnh thông tin của tài khoản tại đây: </p>
                            <img className="" src={require('../../assets/images/support/buoc3.png').default} />
                        </div>
                    </AccordionTab>
                    <AccordionTab header="4. Làm thế nào để tôi có thể hỏi/ xin trợ giúp khác?">
                        <div className="p-col-12 p-sm-12 cl-darkgreen support-second-section-text fw-bold ">
                            <p>Bạn có thể liên hệ với đội ngũ trợ giúp của chúng tôi qua những thông tin liên lạc dưới đây:
                            </p>
                            <p>Điện thoại: (+84) 90894 0990
                            </p>
                            <p>Email: viesign.team@gmail.com</p>
                            <p>Cảm ơn bạn, chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc bạn có.
                            </p>
                        </div>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>

    )
}

export default Support