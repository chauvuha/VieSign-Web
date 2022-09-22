const template = (email, url) => {
  return `<!DOCTYPE html>
<html lang="en" style="width: 100%;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;padding: 0;margin: 0;">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body style="width: 100%;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;font-family: helvetica, &quot;helvetica neue&quot;, arial, verdana, sans-serif;padding: 0;margin: 0;">
    <td class="esd-structure es-p40t es-p20r es-p20l" style="background-color: transparent;padding-left: 20px;padding-right: 20px;padding-top: 40px;" bgcolor="transparent" align="left">
      <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse;border-spacing: 0px;">
        <tbody>
          <tr style="border-collapse: collapse;">
            <td class="esd-container-frame" width="560" valign="top" align="center" style="padding: 0;margin: 0;">
              <table style="background-position: left top;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse;border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr style="border-collapse: collapse;">
                    <td class="esd-block-image es-p5t es-p5b" align="center" style="font-size: 0;padding: 0;margin: 0;padding-top: 5px;padding-bottom: 5px;">
                      <a target="_blank" style="-webkit-text-size-adjust: none;-ms-text-size-adjust: none;mso-line-height-rule: exactly;text-decoration: none;">
                        <img src="https://tlr.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt style="display: block;border: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" width="175">
                      </a>
                    </td>
                  </tr>
                  <tr style="border-collapse: collapse;">
                    <td class="esd-block-text es-p15t es-p15b" align="center" style="padding: 0;margin: 0;padding-top: 15px;padding-bottom: 15px;">
                      <h1 style="color: #333333;font-size: 20px;margin: 0;line-height: 120%;mso-line-height-rule: exactly;font-family: arial, &quot;helvetica neue&quot;, helvetica, sans-serif;font-style: normal;font-weight: normal;">
                        <strong>Thay đổi mật khẩu</strong>
                      </h1>
                      <h1 style="color: #333333;font-size: 20px;margin: 0;line-height: 120%;mso-line-height-rule: exactly;font-family: arial, &quot;helvetica neue&quot;, helvetica, sans-serif;font-style: normal;font-weight: normal;">
                        <strong>&nbsp;Bạn muốn đổi mật khẩu???</strong>
                      </h1>
                    </td>
                  </tr>
                  <tr style="border-collapse: collapse;">
                    <td class="esd-block-text es-p35r es-p40l" align="left" style="padding: 0;margin: 0;padding-right: 35px;padding-left: 40px;">
                      <p style="text-align: center;margin: 0;-webkit-text-size-adjust: none;-ms-text-size-adjust: none;mso-line-height-rule: exactly;font-family: helvetica, &quot;helvetica neue&quot;, arial, verdana, sans-serif;line-height: 150%;">
                        Xin chào ${email}, chúng tôi nhận được yêu cầu đổi mật khẩu của bạn
                      </p>
                    </td>
                  </tr>
                  <tr style="border-collapse: collapse;">
                    <td class="esd-block-text es-p25t es-p40r es-p40l" align="center" style="padding: 0;margin: 0;padding-top: 25px;padding-left: 40px;padding-right: 40px;">
                      <p style="margin: 0;-webkit-text-size-adjust: none;-ms-text-size-adjust: none;mso-line-height-rule: exactly;font-family: helvetica, &quot;helvetica neue&quot;, arial, verdana, sans-serif;line-height: 150%;">
                        Nếu bạn chưa thực hiện yêu cầu này, chỉ cần bỏ qua email này. 
                        Nếu không, vui lòng nhấp vào nút bên dưới để thay đổi mật khẩu của bạn: 
                      </p>
                    </td>
                  </tr>
                  <tr style="border-collapse: collapse;">
                    <td class="esd-block-button es-p40t es-p40b es-p10r es-p10l" align="center" style="padding: 0;margin: 0;padding-left: 10px;padding-right: 10px;padding-top: 40px;padding-bottom: 40px;">
                      <span class="es-button-border" style="border-style: solid solid solid solid;border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3;background: #ffffff;border-width: 2px 2px 2px 2px;display: inline-block;border-radius: 10px;width: auto;">
                        <a href="${url}" class="es-button" target="_blank" style="-webkit-text-size-adjust: none;-ms-text-size-adjust: none;mso-line-height-rule: exactly;text-decoration: none !important;border-style: solid;border-color: #ffffff;border-width: 15px 20px 15px 20px;display: inline-block;background: #ffffff;border-radius: 10px;font-size: 14px;font-family: arial, &quot;helvetica neue&quot;, helvetica, sans-serif;font-weight: bold;font-style: normal;line-height: 120%;color: #3d5ca3;width: auto;text-align: center;mso-style-priority: 100 !important;">
                          THAY ĐỔI MẬT KHẨU
                        </a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </body>
</html>`;
};

module.exports = template;
