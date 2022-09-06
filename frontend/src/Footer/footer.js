import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./footer.css";
import React from "react";
import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native'


function Footer() {
  const { t } = useTranslation()
  return (
    <div className="p-grid" id="footer">
      {/* <div className="p-col-2"></div> */}
      {/* <div className="p-col-4">
        <div className="p-text-normal p-text-left fw-bold">{t('footer-contact')}</div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-md-10">
            <InputText
              id="email"
              type="txt"
              placeholder={t('footer-email')}
              className="name-footer"
            />
          </div>
          <div className="p-md-10">
            <InputTextarea
              id="feedback"
              type="text"
              rows="4"
              placeholder={t('footer-contact')}
              className="txt-footer"
            />
          </div>
        </div>
        <Button type="button" label={t('footer-send')} id="btn-footer" />
      </div> */}
      <div className="p-col-1"></div>
      <div className="p-col-10">
        <div className="p-text-normal ta-center fw-bold"> {t('footer-connect')}</div>

        <div className="btn-socials">
          <Button
            //icon="pi pi-facebook"
            className="p-button-rounded"
            onClick={() => {
              window.open(
                'http://facebook.com',
                '_blank' 
              );
            }}
          ><i class="pi pi-facebook"></i></Button>

          <Button
            //icon="pi pi-envelope"
            className="p-button-rounded "
            onClick={() => Linking.openURL('mailto:viesign.team@gmail.com') }
          ><i class="pi pi-envelope"></i></Button>
          <Button
            //icon="pi pi-github"
            className="p-button-rounded"
            onClick={() => {
              window.open(
                'https://github.com/VieSIGN',
                '_blank' 
              );
            }}
          ><i class="pi pi-github"></i></Button>
        </div>
      </div>
      <div className="p-col-1"></div>

    </div>
  );
}

export default Footer;
