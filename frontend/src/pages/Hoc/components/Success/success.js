import React from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import "./success.css";
import { Card } from 'primereact/card';

const Success = () => {
    const header = (
        <img className="p-col-12" src={require('../../../../assets/images/banner.jpg').default} />
    );

    return (
        <div className="success-page p-grid">
            <div className="success-card p-col-3"></div>
            <div className="success-card p-col-6">
                <Card header={header}>
                    <p className="p-m-0 cl-darkgreen" style={{ lineHeight: '' }}>Chúc mừng bạn đã hoàn thành bài học</p>
                    <h3 className="cl-darkgreen">Điểm</h3>
                    <h1 className="cl-darkgreen">100</h1>

                    <Button className="sucess-action-btn return " label="Quay lại" />
                    <Button className="sucess-action-btn continue" label="Tiếp tục khám phá bài học mới" />
                </Card>
            </div>
            <div className="success-card p-col-3"></div>

        </div>

    )
}

export default Success
