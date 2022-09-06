import React from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import "./fail.css";
import { Card } from 'primereact/card';

const Fail = () => {
    const header = (
        <img className="p-col-12" src={require('../../../../assets/images/banner.jpg').default} />
    );

    return (
        <div className="fail-page p-grid">
            <div className="fail-card p-col-3"></div>
            <div className="fail-card p-col-6">
                <Card header={header}>
                    <p className="p-m-0 cl-darkgreen" style={{ lineHeight: '' }}>Rất tiếc! Bạn chưa vượt qua bài học</p>
                    <h3 className="cl-darkgreen">Điểm</h3>
                    <h1 className="cl-darkgreen">40</h1>

                    <Button className="fail-action-btn return " label="Quay lại" />
                    <Button className="fail-action-btn redo" label="Luyệp tập lại" />
                </Card>
            </div>
            <div className="fail-card p-col-3"></div>

        </div>

    )
}

export default Fail
