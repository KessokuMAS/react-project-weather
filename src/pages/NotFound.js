import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>입력하신 주소가 잘못되었거나, 존재하지 않는 페이지입니다.</p>
      <Link to="/">메인 페이지로 돌아가기</Link>
    </div>
  );
}

export default NotFound;
