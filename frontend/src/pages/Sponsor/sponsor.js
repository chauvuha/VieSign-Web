import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./sponsor.css";

import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const TaiTro = () => {
  const [activeIndex1, setActiveIndex1] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="about-tabview">
      <div className="about-tabview-content">
        <div className="about-tabview-content-section p-grid">
          <div className="about-tabview-content-buttons p-col-0 p-sm-2"></div>
          <div className="about-navigate-button p-col-12 p-sm-2">
            <div className=" ">
              <Button
                className="p-button-about p-text-bold p-button-text"
                onClick={() => {
                  setActiveIndex1(0);
                }}
              >
                <i className="pi pi-angle-right"></i>
                <span className="txt">{t("sponsor-sidebar-one")}</span>
              </Button>
            </div>
            {/* <div className="">
              <Button
                className="p-button-about p-text-bold p-button-text"
                onClick={() => { setActiveIndex1(1); }}
              >
                <i className="pi pi-angle-right"></i>
                <span className="txt">{t('sponsor-sidebar-two')}</span>
              </Button>
            </div> */}
            <div className="">
              <Button
                className=" p-button-about p-text-bold p-button-text"
                onClick={() => {
                  setActiveIndex1(2);
                }}
              >
                <i className="pi pi-angle-right"></i>
                <span className="txt">{t("sponsor-sidebar-three")}</span>
              </Button>
            </div>
          </div>
          <div className="about-tabview-content-active p-col-12 p-sm-7">
            <TabView
              activeIndex={activeIndex1}
              onTabChange={(e) => {
                setActiveIndex1(e.index);
              }}
              sponsor-content
            >
              <TabPanel className="sponsor-content">
                <h1 className="cl-darkgreen fw-bold">
                  {" "}
                  {t("sponsor-sidebar-one")}
                </h1>
                <div className="sponsor-content">
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-one-one")}
                  </h5>
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-one-two")}
                  </h5>
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-one-three")}
                  </h5>
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-one-four")}
                  </h5>
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-one-five")}
                  </h5>
                  <h5 className="fw-bold">
                    Website của EU:&nbsp;
                    <a
                      href="http://europa.eu"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      http://europa.eu
                    </a>
                  </h5>
                  <h5 className="fw-bold">
                    MXH của EU:&nbsp;
                    <a
                      href="https://www.facebook.com/EUandVietnam/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.facebook.com/EUandVietnam/
                    </a>
                  </h5>
                  
                  <h5 className="fw-bold">
                    Website của Oxfam:&nbsp;
                    <a
                      href="https://vietnam.oxfam.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://vietnam.oxfam.org/
                    </a>
                  </h5>
                  
                  <h5 className="fw-bold">
                    MXH của EU JULE:&nbsp;
                    <a
                      href="https://www.facebook.com/EUJULE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.facebook.com/EUJULE
                    </a>
                  </h5>
                </div>
              </TabPanel>
              <TabPanel>
                <h1 className="cl-darkgreen fw-bold">
                  {t("aboutus-sponsors")}
                </h1>
                <div className="sponsor mb-10 fw-bold">
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-two-one")}
                  </h5>
                  <h5 className="fw-bold">
                    {t("aboutus-sponsors-text-two-two")}
                  </h5>
                </div>
              </TabPanel>
              <TabPanel>
                <h2 className="cl-darkgreen fw-bold">
                  {t("sponsor-sidebar-three")}
                </h2>
                <h5 id="about-us-text-three" className="fw-bold">{t("aboutus-sponsors-text-three")}</h5>
              </TabPanel>
            </TabView>
          </div>
          <div className="p-col-12 p-sm-1"></div>
        </div>
      </div>
    </div>
  );
};

export default TaiTro;
