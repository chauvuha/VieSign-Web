/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import TrangChu from "./pages/TrangChu/trangChu";
import ThongTin from "./pages/ThongTin/thongTin";
import Hoc from "./pages/Hoc/hoc";
import TroChoi from "./pages/TroChoi/troChoi";
import GiaoTiep from "./pages/GiaoTiep/giaoTiep";
import TaiKhoanUser from "./pages/User/tkUser";
import  TaiTro from  "./pages/Sponsor/sponsor"
import  TaiTro2 from  "./pages/Sponsor2/sponsor"
import ThongTinUser from "./pages/User/components/ThongTinUser/ttUser";
import DSBH from "./pages/User/components/DSBH/dsbh";
import TroGiup from "./pages/User/components/TroGiup/troGiup";
import TroChoi1 from "./pages/TroChoi/components/TroChoi1/troChoi1";
import TroChoi2_1 from "./pages/TroChoi/components/TroChoi2/TroChoi2_1/troChoi2_1";
import TaiKhoanAdmin from "./pages/Admin/admin";
import Understand from "./pages/Hoc/components/Understand/understand";
import Success from "./pages/Hoc/components/Success/success";
import Fail from "./pages/Hoc/components/Fail/fail";
import Level from "./pages/Hoc/components/Level/level";
import VideoVideo from "./pages/Hoc/components/VideoVideo/videoVideo";
import VideoText from "./pages/Hoc/components/VideoText/videoText";
import TextVideo from "./pages/Hoc/components/TextVideo/textVideo";
import axios from "axios";
import config from "./config";
import Support from "./pages/Support/support"



function App() {
  const [user, setUser] = useState({});
  const [topics, setTopics] = useState([]);
  const defaultTime = useRef(Date.now())

  useEffect(() => {
    if (window.localStorage.getItem("id") !== null) {
      axios
        .get(`${config.APP_API}/user/get-user-id`, {
          params: { id: JSON.parse(window.localStorage.getItem("id")) },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios.get(`${config.APP_API}/video/list-topic`).then((res) => {
      setTopics(res.data.listTopic);
    });
  }, []);
  


  return (
    <Router>
      <div className="App">
        {window.location.pathname !== "/admin" && <Header user={user} />}
        <Routes>
          <Route path="/admin" element={<TaiKhoanAdmin />}></Route>
          <Route path="/" element={<TrangChu />}></Route>
          <Route path="/thongtin" element={<ThongTin />}></Route>
          <Route path="/hoc" element={<Hoc topics={topics} />}></Route>
          <Route path="/understand" element={<Understand />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/fail" element={<Fail />}></Route>
          <Route path="/level" element={<Level />}></Route>
          <Route path="/videovideo" element={<VideoVideo />}></Route>
          <Route path="/videotext" element={<VideoText />}></Route>
          <Route path="/textvideo" element={<TextVideo />}></Route>

          <Route path="/trochoi" element={<TroChoi user={user} />}></Route>
          <Route path="/giaotiep" element={<GiaoTiep />}></Route>
          <Route path="/sponsor" element={<TaiTro />}></Route>
          <Route path="/sponsor2" element={<TaiTro2 />}></Route>
          <Route path="/support" element={<Support />}></Route>

          <Route
            path="/taikhoan"
            element={<TaiKhoanUser user={user} topics={topics} />}
          ></Route>
          <Route path="/profile" element={<ThongTinUser user={user} />}></Route>
          <Route
            path="/dsbh"
            element={<DSBH topics={topics} />}
          ></Route>
          <Route path="/trogiup" element={<TroGiup />}></Route>
          <Route
            path="/trochoi/gheptu"
            element={
              <TroChoi1 topic={user.topic} timeLeft={defaultTime.current + 180000} />
            }
          ></Route>
          <Route
            path="/trochoi/ghepthebon"
            element={<TroChoi2_1 topic={user.topic} amount={4} />}
          ></Route>
          <Route
            path="/trochoi/ghepthesau"
            element={<TroChoi2_1 topic={user.topic} amount={6} />}
          ></Route>
          <Route
            path="/trochoi/ghepthetam"
            element={<TroChoi2_1 topic={user.topic} amount={8} />}
          ></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
