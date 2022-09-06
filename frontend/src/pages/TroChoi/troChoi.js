import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./troChoi.css";
import GhepTheMenu from "./ghepThe";
import React from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "primereact/button";

function TroChoi() {
  const [visibleOptions, setVisibleOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div id="info-game">
        {!visibleOptions && (
          <>
            <div className="p-grid">
              <div className=" p-col-2"></div>
              <h1 className="p-col-8 p-text-left fw-bold mt-70"> DANH SÁCH TRÒ CHƠI </h1>
              <div className=" p-col-2 "></div>
            </div>
          </>
        )}
        {visibleOptions && (
          <>
            <Button
              label="Quay lại"
              icon="pi pi-arrow-left"
              onClick={() => {
                setVisibleOptions(false);
              }}
              className="p-button-text"
              id="no-play-game"
            />
            <div className="p-grid ta-center">
              <div className=" p-col-2"></div>
              <h1 className="p-col-8 p-text-left fw-bold mt-70"> CHỌN CẤP ĐỘ TRÒ CHƠI </h1>
              <div className=" p-col-2 "></div>
            </div>
          </>
        )}

        <div className="p-grid game-level-box">
          <div className="p-col-2"></div>
          <div className="p-col-8">
            
            {!visibleOptions && (
              <div className="p-grid flexcard game-body">
                <div className="p-col-12 p-sm-6">
                  <Card className="link-game">
                    <div
                      className="img-game"
                      onClick={() => navigate("/trochoi/gheptu")}
                    >
                      <img
                        src={
                          require("../../assets/images/10wordschallenge.jpg")
                            .default
                        }
                      />
                    </div>
                    {/* <div className="p-card-title p-text-bold">
                      THỬ THÁCH 10 TỪ
                    </div> */}
                  </Card>
                </div>
                <div className="p-col-12 p-sm-6">
                  <Card className="link-game">
                    <div
                      className="img-game"
                      // onClick={() => navigate("/trochoi/ghepthebon")}
                      onClick={() => setVisibleOptions(true)}
                    >
                      <img
                        src={
                          require("../../assets/images/game.jpg")
                            .default
                        }
                      />
                    </div>
                    {/* <div className="p-card-title p-text-bold">
                      GHÉP THẺ <p style={{ color: "#026670" }}> </p>
                    </div> */}
                  </Card>
                </div>
              </div>
            )}
            {visibleOptions && <GhepTheMenu />}
          </div>
          <div className="p-col-2"></div>
        </div>
      </div>
    </div>
  );
}
export default TroChoi;
