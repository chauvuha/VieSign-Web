import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./thongTin.css";

import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next'

const ThongTin = () => {
  const [activeIndex1, setActiveIndex1] = useState(1);
  const { t } = useTranslation()


  return (
    <div className="about-tabview">
      <div className="about-tabview-content">
        <div className="about-tabview-content-section p-grid">
          <div className="about-tabview-content-buttons p-col-0 p-sm-2"></div>
          <div className="about-navigate-button p-col-12 p-sm-2">
            {/* <Button onClick={() => { setActiveIndex1(0); }} className="p-button-about" label={t('aboutus-sidebar-one')} icon="pi pi-angle-right" iconPos="right" />
            <Button onClick={() => { setActiveIndex1(1); }} className="p-button-about" label={t('aboutus-sidebar-two')} icon="pi pi-angle-right" iconPos="right" />
            <Button onClick={() => { setActiveIndex1(2); }} className="p-button-about" label={t('aboutus-sidebar-three')} icon="pi pi-angle-right" iconPos="right" /> */}
            <div className=" ">
              <Button
                className="p-button-about p-text-bold p-button-text"
                onClick={() => { setActiveIndex1(0); }}
              >
                <i class="pi pi-angle-right"></i>
                <span className="txt">{t('aboutus-sidebar-one')}</span>
              </Button>
            </div>
            <div className="">
              <Button
                className="p-button-about p-text-bold p-button-text"
                onClick={() => { setActiveIndex1(1); }}
              >
                <i class="pi pi-angle-right"></i>
                <span className="txt">{t('aboutus-sidebar-two')}</span>
              </Button>
            </div>
            <div className="">
              <Button
                className=" p-button-about p-text-bold p-button-text"
                onClick={() => { setActiveIndex1(2); }}
              >
                <i class="pi pi-angle-right"></i>
                <span className="txt">{t('aboutus-sidebar-three')}</span>
              </Button>
            </div>

          </div>

          <div className="about-tabview-content-active p-col-12 p-sm-7">
            <TabView activeIndex={activeIndex1} onTabChange={(e) => { setActiveIndex1(e.index); }}>
              <TabPanel >
                <h1 className="cl-darkgreen fw-bold"> {t('aboutus-sidebar-one')}</h1>
                <div className="mission mission-one mb-40">
                  <p> {t('aboutus-goal-one')}</p>
                </div>
                <div className="mission mission-two mb-40">
                  <p>{t('aboutus-goal-two')}</p>
                </div>
                <div className="mission mission-three">
                  <p>{t('aboutus-goal-three')}</p>
                  <img className="hand-detection" src={require('../../assets/images/handetection.png').default} />
                </div>

              </TabPanel>
              <TabPanel >
                <h1 className="cl-darkgreen fw-bold">{t('aboutus-sidebar-two')}</h1>
                <div className="our-team ta-center" id="our-team">
                  <div className="programming-team mb-10">
                    <h1 className="cl-darkgreen fw-bold">{t('aboutus-programmingteam')}</h1>
                    <div className="team-members mb-10">
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/duyuyen.jpg').default} />
                        </div>
                        <div className="member-name">
                          Phan Bình Duy Uyên
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/vuhachau.jpg').default} />
                        </div>
                        <div className="member-name">
                          Vũ Hà Châu
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/huynhviha.jpeg').default} />
                        </div>
                        <div className="member-name">
                          Huỳnh Vĩ Hà
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                        <img src={require('../../assets/images/TranUy.png').default} />
                        </div>
                        <div className="member-name">
                          Trần Khánh Gia Uy
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="er-team mb-10">
                    <h1 className="cl-darkgreen fw-bold">{t('aboutus-erteam')}</h1>
                    <div className="team-members mb-10">
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/kimngan.jpg').default} />
                        </div>
                        <div className="member-name">
                          Nguyễn Ngọc Kim Ngân
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ngocquy.jpg').default} />
                        </div>
                        <div className="member-name">
                          Ngô Lê Ngọc Quý
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ced fs-25 cl-darkgreen">
                    <h1 className="cl-darkgreen mb-10 fw-bold">{t('aboutus-ced-name')}</h1>
                    <div className="statement mb-10"> {t('main-ced')}</div>
                    <Button className="button-ced cl-white mb-10"
                      label="CED Website"
                      onClick={() => {
                        window.open(
                          'https://ced.org.vn/',
                          '_blank'
                        );
                      }}>
                    </Button>
                    <div className="team-members mb-10">
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ced/duongphuonghanh.png').default} />
                        </div>
                        <div className="member-name">
                          Dương Phương Hạnh
                        </div>
                        <div className="member-name-main">
                          {t('main-ced-one')}
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ced/tothibichphuong.png').default} />
                        </div>
                        <div className="member-name">
                          Tô Thị Bích Phương
                        </div>
                        <div className="member-name-main">
                          {t('main-ced-two')}
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ced/buithingoc.jpg').default} />
                        </div>
                        <div className="member-name">
                          Bùi Thị Ngọc
                        </div>
                        <div className="member-name-main">
                          {t('main-ced-three')}
                        </div>
                      </div>
                    </div>
                    <div className="team-members mb-10">
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ced/trieuthuymi.png').default} />
                        </div>
                        <div className="member-name">
                          Triệu Thúy Mi
                        </div>
                        <div className="member-name-main">
                          {t('main-ced-four')}
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ced/phamthuyduong.jpg').default} />
                        </div>
                        <div className="member-name">
                          Phạm Thùy Dương
                        </div>
                        <div className="member-name-main">
                          {t('main-ced-five')}
                        </div>
                      </div>
                      <div className="member">
                        <div className="member-photo">
                          <img src={require('../../assets/images/ced/huakimhuong.png').default} />
                        </div>
                        <div className="member-name">
                          Hứa Kim Hương
                        </div>
                        <div className="member-name-main">
                          {t('main-ced-six')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mentor cl-darkgreen mb-10">
                    <h1 className="cl-darkgreen fw-bold">Mentor</h1>
                    <div className="statement mb-10"> {t('main-mentor')}</div>
                  </div>
                </div>
                <div className="mentor-team">
                  <div className="team-members mb-10">
                    <div className="member">
                      <div className="member-photo">
                        <img src={require('../../assets/images/longtran.jpg').default} />
                      </div>
                      <div className="member-name">
                        <div className="member-name">
                          Trần Đạo Hoàng Long
                        </div>
                        <div className="member-name">
                          {t('main-mentor-one')}
                        </div>
                      </div>
                    </div>
                    <div className="member">
                      <div className="member-photo">
                        <img src={require('../../assets/images/vuthuytrang.jpg').default} />
                      </div>
                      <div className="member-name">
                        <div className="member-name">
                          Vũ Thùy Trang
                        </div>
                        <div className="member-name">
                          {t('main-mentor-two')}
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="team-members mb-10">
                    <div className="member">
                      <div className="member-photo">
                        <img src={require('../../assets/images/lemaithanhduc.jpeg').default} />
                      </div>
                      <div className="member-name">
                        <div className="member-name">
                          Lê Mai Thanh Đức
                        </div>
                        <div className="member-name">
                          {t('main-mentor-three')}
                        </div>

                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="designer cl-darkgreen">
                  <h1 className="cl-darkgreen fw-bold">{t('designer')}</h1>
                </div>
                <div className="team-members mb-10">
                  <div className="member">
                    <div className="member-photo">
                      <img src={require('../../assets/images/tranthaihoa.jpg').default} />
                    </div>
                    <div className="member-name">
                      <div className="member-name">
                        Trần Thái Hòa
                      </div>
                      <div className="member-name">
                        {t('designer')}
                      </div>
                    </div>
                  </div>
                  <div className="member">
                    <div className="member-photo">
                      <img src={require('../../assets/images/Khang.png').default} />
                    </div>
                    <div className="member-name">
                      <div className="member-name">
                        Diệp Xương Khang
                      </div>
                      <div className="member-name">
                        {t('designer')}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel >

                <h2 className="cl-darkgreen fw-bold">{t('aboutus-sidebar-three')}</h2>
                <h3>(+84) 90894 0990</h3>
                <h3>viesign.team@gmail.com</h3>

              </TabPanel>
            </TabView>
          </div>
          <div className="p-col-12 p-sm-1"></div>

        </div>
      </div>
    </div >

  )
}

export default ThongTin




