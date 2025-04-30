import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RiSunLine,
  RiCloudLine,
  RiRainyLine,
  RiThunderstormsLine,
  RiSnowyLine,
  RiMistLine,
  RiThermometerLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiDropLine,
  RiWindyLine,
  RiEmotionHappyLine,
} from "react-icons/ri";
import "./Weather.scss";
import KoreaMapImage from "../Images/KoreaMapImage.png";
import { Link } from "react-router-dom";

// 날씨 상태에 따라 아이콘 반환
const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <RiSunLine size={30} color="#fbc02d" />;
    case "Clouds":
      return <RiCloudLine size={30} color="#90a4ae" />;
    case "Rain":
    case "Drizzle":
      return <RiRainyLine size={30} color="#4fc3f7" />;
    case "Thunderstorm":
      return <RiThunderstormsLine size={30} color="#ff7043" />;
    case "Snow":
      return <RiSnowyLine size={30} color="#81d4fa" />;
    case "Mist":
    case "Fog":
    case "Haze":
      return <RiMistLine size={30} color="#b0bec5" />;
    default:
      return <RiSunLine size={30} />;
  }
};

// 한글 지역명을 API용 영문 이름으로 변환
const regionMap = {
  서울: "Seoul",
  부산: "Busan",
  대구: "Daegu",
  인천: "Incheon",
  광주: "Gwangju",
  대전: "Daejeon",
  속초: "sokcho",
  강릉: "Gangneung",
  울산: "Ulsan",
  제주: "Jeju",
  여수: "Yeosu",
  포항: "Pohang",
  전주: "Jeonju",
  청주: "Cheongju",
  수원: "Suwon",
  구미: "Gumi",
  춘천: "Chuncheon",
  영주: "Yeongju",
};

// 지도 위 클릭 가능한 지역 버튼
const RegionButton = ({ name, top, left, selectedRegion, onClick }) => (
  <button
    className={`RegionButton ${selectedRegion === name ? "active" : ""}`}
    style={{ top, left }}
    onClick={() => onClick(name)}
  >
    {name}
  </button>
);

// 메인 날씨 컴포넌트
const Weather = () => {
  const [weather, setWeather] = useState(null); // 현재 날씨 데이터
  const [forecast3, setForecast3] = useState(null); // 3시간 뒤 예보
  const [forecast6, setForecast6] = useState(null); // 6시간 뒤 예보
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [region, setRegion] = useState("서울"); // 선택된 지역
  const [currentTime, setCurrentTime] = useState(""); // 현재 시간 상태

  // 현재 시간을 HH:MM 형식으로 반환
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 1초마다 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 현재 날씨 정보 API 호출
  const fetchWeather = async (selectedRegion) => {
    setLoading(true);
    try {
      const engRegion = regionMap[selectedRegion];
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${engRegion}&appid=API_KEY&units=metric&lang=kr`
      );
      setWeather(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // 예보 정보 API 호출
  const fetchForecast = async (selectedRegion) => {
    try {
      const engRegion = regionMap[selectedRegion];
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${engRegion}&appid=API_KEY&units=metric&lang=kr`
      );
      const data = response.data;
      setForecast3(data.list[0]); // 3시간 뒤
      setForecast6(data.list[1]); // 6시간 뒤
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // 지역 변경 시 날씨/예보 재요청

  useEffect(() => {
    fetchWeather(region);
    fetchForecast(region);
  }, [region]);

  // 날짜 형식화 함수
  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[today.getDay()];
    return `${year}년 ${month}월 ${date}일 (${day})`;
  };

  // 로딩 중 처리
  if (loading) {
    return <div className="WeatherBlock">정보를 불러오는 중...</div>;
  }

  // 날씨 정보 없음 처리
  if (!weather) {
    return (
      <div className="WeatherBlock">
        <h1>오늘은 {getFormattedDate()} 입니다.</h1>
        <p>현재 시간: {currentTime}</p>
        <p>날씨 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 지도에 표시할 지역 리스트
  const regionList = [
    { name: "서울", top: "100px", left: "155px" },
    { name: "부산", top: "330px", left: "290px" },
    { name: "대구", top: "270px", left: "250px" },
    { name: "인천", top: "105px", left: "105px" },
    { name: "광주", top: "330px", left: "130px" },
    { name: "대전", top: "230px", left: "170px" },
    { name: "속초", top: "50px", left: "260px" },
    { name: "강릉", top: "100px", left: "285px" },
    { name: "울산", top: "290px", left: "325px" },
    { name: "제주", top: "480px", left: "100px" },
    { name: "수원", top: "140px", left: "170px" },
    { name: "청주", top: "200px", left: "185px" },
    { name: "전주", top: "280px", left: "145px" },
    { name: "여수", top: "360px", left: "180px" },
    { name: "포항", top: "245px", left: "330px" },
    { name: "구미", top: "240px", left: "240px" },
    { name: "춘천", top: "75px", left: "210px" },
    { name: "영주", top: "180px", left: "270px" },
  ];

  return (
    <div className="WeatherBlock">
      <h1>오늘은 {getFormattedDate()} 입니다.</h1>
      <h1>현재 시간 : {currentTime}</h1>
      <div className="RegionMapContainer">
        {/* 지도 이미지와 버튼 배치 */}
        <div
          className="MapWrapper"
          style={{ backgroundImage: `url(${KoreaMapImage})` }}
        >
          {regionList.map((regionData) => (
            <RegionButton
              key={regionData.name}
              name={regionData.name}
              top={regionData.top}
              left={regionData.left}
              selectedRegion={region}
              onClick={setRegion}
            />
          ))}
        </div>

        {/* 선택 지역 날씨 정보 표시 */}
        <div className="WeatherInfo">
          <h2>{region}의 현재 날씨</h2>
          <p>
            {getWeatherIcon(weather.weather[0].main)}
            날씨 : {weather.weather[0].description}
          </p>
          <p>
            <RiThermometerLine size={30} />
            현재 온도 : {weather.main.temp.toFixed(1)}°C
          </p>
          <p>
            <RiEmotionHappyLine size={30} />
            체감 온도 : {weather.main.feels_like.toFixed(1)}°C
          </p>
          <p>
            <RiArrowDownLine size={30} />
            오늘 최저 기온 : {weather.main.temp_min.toFixed(1)}°C
          </p>
          <p>
            <RiArrowUpLine size={30} />
            오늘 최고 기온 : {weather.main.temp_max.toFixed(1)}°C
          </p>
          <p>
            <RiDropLine size={30} />
            현재 습도 : {weather.main.humidity}%
          </p>
          <p>
            <RiWindyLine size={30} />
            현재 풍속 : {weather.wind.speed} m/s
          </p>
          <p style={{ fontSize: "16px", color: "#000000", marginTop: "10px" }}>
            💰투표에 참여하고 포인트를 받아보세요!💰
          </p>
          <div className="VoteButtonContainer">
            <Link to="/poll" className="VoteButton">
              투표하기
            </Link>
          </div>
        </div>
      </div>

      <div className="ForecastContainer">
        <div className="ForecastLeft">
          <h2>3시간 뒤 예보</h2>
          {forecast3 ? (
            <>
              <p>
                {getWeatherIcon(forecast3.weather[0]?.main)} 날씨 :{" "}
                {forecast3.weather[0]?.description}
              </p>
              <p>
                <RiThermometerLine size={30} /> 예보 온도 :{" "}
                {forecast3.main?.temp?.toFixed(1)}°C
              </p>
              <p>
                <RiDropLine size={30} /> 습도 : {forecast3.main?.humidity}%
              </p>
              <p>
                <RiWindyLine size={30} /> 풍속 : {forecast3.wind?.speed} m/s
              </p>
            </>
          ) : (
            <p>3시간 뒤 예보를 불러오는 중...</p>
          )}
        </div>

        <div className="ForecastRight">
          <h2>6시간 뒤 예보</h2>
          {forecast6 ? (
            <>
              <p>
                {getWeatherIcon(forecast6.weather[0]?.main)} 날씨 :{" "}
                {forecast6.weather[0]?.description}
              </p>
              <p>
                <RiThermometerLine size={30} /> 예보 온도 :{" "}
                {forecast6.main?.temp?.toFixed(1)}°C
              </p>
              <p>
                <RiDropLine size={30} /> 습도 : {forecast6.main?.humidity}%
              </p>
              <p>
                <RiWindyLine size={30} /> 풍속 : {forecast6.wind?.speed} m/s
              </p>
            </>
          ) : (
            <p>6시간 뒤 예보를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
