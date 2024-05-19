import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import "./trangChu.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'


function TrangChu() {
  const { t } = useTranslation()
  const navigate = useNavigate();

  return (
    <div className="main-body">
      <div className="main-first-top-picture p-grid">
        <img alt="img" className="p-col-12 p-sm-12" src={require('../../assets/images/banner2.png').default} />
      </div>
      <div className="main-first-section vnmese p-grid cl-darkgreen bg-yellow pb-40">
        <div className="p-col-2"></div>
        <h2 className="p-col-8 main-second-section-text fw-bold fs-lg mt-30 ">
          {t('main-first-section-text')}</h2>
        <div className="p-col-2"></div>
        <div className="main-learn-button-section p-col-12">
          <Button className="main-learn-button" label={t('learn-now-button')} onClick={() => navigate("/hoc")} />
        </div>
      </div>

      <div className="main-second-section p-grid p-30">
        <div className="p-col-12 p-sm-2"></div>
        {/* <img alt="img" className="p-col-6 p-30 p-sm-4" src={require('../../assets/images/connection.svg').default} /> */}
        <video
          className="answer-video main-video p-col-6 p-30 p-sm-4"
          muted
          autoPlay
          loop
          disablePictureInPicture
          playsInline
        >
          <source
            src='https://drive.google.com/uc?export=download&amp;id=1sOqpbuWg1MwaMS1i3fgSbeI2QpYlucfR'
            type="video/mp4"
          />
        </video>
        <div className="p-col-12 p-sm-4 cl-darkgreen main-second-section-text fw-bold ">
          <h2 className="fs-lg fw-bold">{t('main-second-section-text-one')}</h2>
          <div className="main-learn-button-section p-col-12">
            <Button className="main-learn-button" label={t('learn-more-about-us')} onClick={() => navigate("/thongtin")} />
          </div>
        </div>
        <div className="p-col-12 p-sm-2"></div>
      </div>
      <div className="main-second-section p-grid p-30">
        <div className="p-col-12 p-sm-2"></div>
        <div className="p-col-12 p-sm-4 cl-darkgreen main-second-section-text fw-bold ">
          <h2 className="fs-lg fw-bold">{t('main-second-section-text-two')}</h2>
        </div>
        <img alt="img" className="p-col-6 p-sm-4 p-30" src={require('../../assets/images/game.svg').default} />
      </div>
      <div className="main-third-section p-grid bg-yellow cl-darkgreen pb-40">
        <div className="p-col-12">
          <h1 className="fw-bold mt-30">{t('main-third-section-heading')}</h1>
        </div>
        <div className="our-team ta-center pb-40 p-col-12" id="our-team">
          <div className="programming-team ">
            <div className="team-members mb-20 p-grid">
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/duyuyen.jpg').default} />
                </div>
                <div className="member-name-main">
                  Phan Bình Duy Uyên
                </div>
                <div className="member-name-main">
                  {t('main-role-programmer')}
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/vuhachau.jpg').default} />
                </div>
                <div className="member-name-main">
                  Vũ Hà Châu
                </div>
                <div className="member-name-main">
                  {t('main-role-programmer')}
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/huynhviha.jpeg').default} />
                </div>
                <div className="member-name-main">
                  Huỳnh Vĩ Hà
                </div>
                <div className="member-name-main">
                  {t('main-role-programmer')}
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/TranUy.png').default} />
                </div>
                <div className="member-name-main">
                  Trần Khánh Gia Uy
                </div>
                <div className="member-name-main">
                  {t('main-role-programmer')}
                </div>
              </div>
            </div>
          </div>
          <div className="er-team">
            <div className="team-members p-grid">
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/kimngan.png').default} />
                </div>
                <div className="member-name-main">
                  Nguyễn Ngọc Kim Ngân
                </div>
                <div className="member-name-main">
                  {t('main-role-er')}
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/ngocquy.jpg').default} />
                </div>
                <div className="member-name-main">
                  Ngô Lê Ngọc Quý
                </div>
                <div className="member-name-main">
                  {t('main-role-er')}
                </div>
              </div>
            </div>
          </div>
          <div className="ced fs-25 cl-darkgreen">
            <h1 className="cl-darkgreen fw-bold">{t('aboutus-ced-name')}</h1>
          </div>
          <div className="team-members mb-20 p-grid">
            <div className="member p-col-12 p-sm-2">
              <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/ced/duongphuonghanh.png').default} />
              </div>
              <div className="member-name-main">
                Dương Phương Hạnh
              </div>
              <div className="member-name-main">
                {t('main-ced-one')}
              </div>
            </div>
            <div className="member p-col-12 p-sm-2">
              <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/ced/tothibichphuong.png').default} />
              </div>
              <div className="member-name-main">
                Tô Thị Bích Phương
              </div>
              <div className="member-name-main">
                {t('main-ced-two')}
              </div>
            </div>
            <div className="member p-col-12 p-sm-2">
              <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/ced/buithingoc.jpg').default} />
              </div>
              <div className="member-ced-four">
                Bùi Thị Ngọc
              </div>
              <div className="member-name-main">
                {t('main-ced-three')}
              </div>
            </div>
          </div>
          <div className="team-members mb-20 p-grid">
            <div className="member p-col-12 p-sm-2">
              <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/ced/trieuthuymi.png').default} />
              </div>
              <div className="member-name-main">
                Triệu Thuý Mi
              </div>
              <div className="member-name-main">
                {t('main-ced-four')}
              </div>
            </div>
            <div className="member p-col-12 p-sm-2">
              <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/ced/phamthuyduong.jpg').default} />
              </div>
              <div className="member-name-main">
                Phạm Thùy Dương
              </div>
              <div className="member-name-main">
                {t('main-ced-five')}
              </div>
            </div>
            <div className="member p-col-12 p-sm-2">
              <div className="member-photo-main">
                <img alt="img" src={require('../../assets/images/ced/huakimhuong.png').default} />
              </div>
              <div className="member-name-main">
                Hứa Kim Hương
              </div>
              <div className="member-name-main">
                {t('main-ced-six')}
              </div>
            </div>
          </div>
          <div className="mentor cl-darkgreen p-grid">
            <h1 className="cl-darkgreen p-col-12 fw-bold">Mentor</h1>
          </div>
          <div className="mentor-team ">
            <div className="team-members p-grid">
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/longtran.jpg').default} />
                </div>
                <div className="member-name">
                  <div className="member-name-main">
                    Trần Đạo Hoàng Long
                  </div>
                  <div className="member-name-main">
                    {t('main-mentor-one')}
                  </div>
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/vuthuytrang-main.png').default} />
                </div>
                <div className="member-name">
                  <div className="member-name-main">
                    Vũ Thùy Trang
                  </div>
                  <div className="member-name-main">
                    {t('main-mentor-two')}
                  </div>
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/lemaithanhduc.jpeg').default} />
                </div>
                <div className="member-name">
                  <div className="member-name-main">
                    Lê Mai Thanh Đức
                  </div>
                  <div className="member-name-main">
                    {t('main-mentor-three')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="designer cl-darkgreen p-grid">
            <h1 className="cl-darkgreen p-col-12 fw-bold">{t('designer')}</h1>
          </div>
          <div className="designer-team ">
            <div className="team-members p-grid">
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/Khang.png').default} />
                </div>
                <div className="member-name">
                  <div className="member-name-main">
                    Diệp Xương Khang
                  </div>
                  <div className="member-name-main">
                    {t('designer')}
                  </div>
                </div>
              </div>
              <div className="member p-col-12 p-sm-2">
                <div className="member-photo-main">
                  <img alt="img" src={require('../../assets/images/tranthaihoa.jpg').default} />
                </div>
                <div className="member-name">
                  <div className="member-name-main">
                    Trần Thái Hòa
                  </div>
                  <div className="member-name-main">
                    {t('designer')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-learn-button-section p-col-12">
          <Button className="main-learn-button" label={t('learn-more-about-us')} onClick={() => navigate("/thongtin")} />
        </div>
      </div>
    </div>
  )
}

export default TrangChu;
