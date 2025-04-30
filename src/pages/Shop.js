import React, { useState } from "react";
import "./Shop.scss";

// 이미지 파일 import
import StarbucksLogo from "../Images/StarbucksLogo.png";
import MegacoffeeLogo from "../Images/MegacoffeeLogo.png";

// 개별 상품 항목 컴포넌트
const ShopList = ({ article, onBuy }) => {
  const {
    title = "",
    description = "",
    Image = null,
    price = "0pt",
  } = article || {};

  return (
    <div className="ShopItem">
      {Image && (
        <div className="Thumbnail">
          <img src={Image} alt="thumbnail" />
        </div>
      )}
      <div className="Contents">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="Price">{price}</div>
        <button className="BuyButton" onClick={() => onBuy(article)}>
          구매하기
        </button>
      </div>
    </div>
  );
};

// 샵에서 판매하는 상품 목록
const shopItems = [
  {
    title: "스타벅스 5000원 상품권",
    description: "전국 스타벅스 매장에서 사용 가능한 디지털 쿠폰입니다.",
    Image: StarbucksLogo,
    price: "5,000pt",
    point: 5000,
  },
  {
    title: "스타벅스 10000원 상품권",
    description: "전국 스타벅스 매장에서 사용 가능한 디지털 쿠폰입니다.",
    Image: StarbucksLogo,
    price: "10,000pt",
    point: 10000,
  },
  {
    title: "메가커피 5000원 상품권",
    description: "전국 메가커피 매장에서 사용 가능한 디지털 쿠폰입니다.",
    Image: MegacoffeeLogo,
    price: "5,000pt",
    point: 5000,
  },
];

// 메인 샵 페이지 컴포넌트
const Shop = () => {
  const [userPoints, setUserPoints] = useState(10000000); // 초기 포인트 설정 (테스트용)

  // 구매 처리 함수
  const handleBuy = (item) => {
    const confirmBuy = window.confirm(
      `${item.title}을(를) 정말 구매하시겠습니까?`
    );
    if (!confirmBuy) return;

    if (userPoints >= item.point) {
      setUserPoints((prev) => prev - item.point);
      window.alert(`${item.title} 구매 완료!`);
    } else {
      window.alert("포인트가 부족합니다.");
    }
  };

  return (
    <div className="ShopPage">
      <h2>보유 포인트 : {userPoints.toLocaleString()}pt</h2>

      {/* 상품 목록 렌더링 */}
      {shopItems.map((item, index) => (
        <ShopList key={index} article={item} onBuy={handleBuy} />
      ))}
    </div>
  );
};

export default Shop;
