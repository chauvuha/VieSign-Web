import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./troChoi.css";

import React from "react";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

function GhepTheMenu() {
  return (
    <div>
      <div id="info-game">
        <div className="p-grid">
          <div className="p-col-12">
            <div className="p-grid flexcard game-body">
              <div className="p-col-12 p-sm-4">
                <Link to="/trochoi/ghepthebon" style={{ textDecoration: "none" }}>
                  <Card className="link-game">
                    <div className="img-game">
                      <img
                        src={
                          require("../../assets/images/students-with-puzzles.png")
                            .default
                        }
                      />
                    </div>
                    <div className="p-card-title p-text-bold">
                      NỐI THẺ - 4 CẶP
                    </div>
                  </Card>
                </Link>
              </div>
              <div className="p-col-12 p-sm-4">
                <Link to="/trochoi/ghepthesau" style={{ textDecoration: "none" }}>
                  <Card className="link-game">
                    <div className="img-game">
                      <img
                        src={
                          require("../../assets/images/students-with-puzzles.png")
                            .default
                        }
                      />
                    </div>
                    <div className="p-card-title p-text-bold">
                      NỐI THẺ - 6 CẶP
                    </div>
                  </Card>
                </Link>
              </div>

              <div className="p-col-12 p-sm-4">
                <Link to="/trochoi/ghepthetam" style={{ textDecoration: "none" }}>
                  <Card className="link-game">
                    <div className="img-game">
                      <img
                        src={
                          require("../../assets/images/students-with-puzzles.png")
                            .default
                        }
                      />
                    </div>
                    <div className="p-card-title p-text-bold">
                      NỐI THẺ - 8 CẶP
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GhepTheMenu;
