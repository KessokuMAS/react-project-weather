import React, { useState } from "react";
import {
  RiSunLine,
  RiCloudLine,
  RiRainyLine,
  RiSnowyLine,
  RiMistLine,
} from "react-icons/ri";
import "./Poll.scss";

// 날씨 문자열에 따른 아이콘 반환 함수
const getIcon = (weather) => {
  switch (weather) {
    case "맑음":
      return <RiSunLine size={20} color="#fbc02d" />;
    case "흐림":
      return <RiCloudLine size={20} color="#90a4ae" />;
    case "비":
      return <RiRainyLine size={20} color="#4fc3f7" />;
    case "눈":
      return <RiSnowyLine size={20} color="#81d4fa" />;
    case "안개":
      return <RiMistLine size={20} color="#b0bec5" />;
    default:
      return null;
  }
};

// 지역 선택 버튼 컴포넌트
const RegionButton = ({ name, top, left, selectedRegion, onChange }) => (
  <label
    className={`RegionButton ${selectedRegion === name ? "selected" : ""}`}
    style={{ top, left }}
    onClick={() => onChange(name)}
  >
    {name}
  </label>
);

// 지역 좌표 리스트
const regionList = [
  { name: "서울", top: "90px", left: "195px" },
  { name: "부산", top: "320px", left: "330px" },
  { name: "대구", top: "260px", left: "290px" },
  { name: "인천", top: "95px", left: "145px" },
  { name: "광주", top: "320px", left: "170px" },
  { name: "대전", top: "220px", left: "210px" },
  { name: "속초", top: "40px", left: "300px" },
  { name: "강릉", top: "90px", left: "325px" },
  { name: "울산", top: "280px", left: "365px" },
  { name: "제주", top: "470px", left: "140px" },
  { name: "수원", top: "130px", left: "210px" },
  { name: "청주", top: "190px", left: "225px" },
  { name: "전주", top: "270px", left: "190px" },
  { name: "여수", top: "350px", left: "240px" },
  { name: "포항", top: "235px", left: "370px" },
  { name: "구미", top: "230px", left: "280px" },
  { name: "춘천", top: "65px", left: "250px" },
  { name: "영주", top: "170px", left: "310px" },
];

// 투표 컴포넌트
const Poll = () => {
  const [votes, setVotes] = useState({
    맑음: 0,
    흐림: 0,
    비: 0,
    눈: 0,
    안개: 0,
  });
  const [selectedWeather, setSelectedWeather] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleVote = () => {
    if (!selectedRegion) {
      setMessage("⚠️ 지역을 선택해주세요.");
      setMessageType("error");
      return;
    }

    if (!selectedWeather) {
      setMessage("🌤️ 날씨를 선택해주세요.");
      setMessageType("error");
      return;
    }

    if (hasVoted) return;

    const confirmed = window.confirm(
      `정말 '${selectedRegion}' 지역의 내일 날씨를 '${selectedWeather}'(으)로 투표하시겠습니까?`
    );
    if (!confirmed) return;

    setVotes({ ...votes, [selectedWeather]: votes[selectedWeather] + 1 });
    setHasVoted(true);
    setMessage("🎉 투표가 완료되었습니다!");
    setMessageType("success");
  };

  return (
    <div className="PollBlock">
      <h1 className="PollTitle">내일의 날씨 투표</h1>
      <h2 className="PollSubtitle">💰 투표하고 포인트를 받아가세요! 💰</h2>
      <p className="PollTimeInfo">
        한국 시간 오후 12시 기준으로 투표를 진행합니다
      </p>

      <div className="RegionContainer">
        {regionList.map((region) => (
          <RegionButton
            key={region.name}
            name={region.name}
            top={region.top}
            left={region.left}
            selectedRegion={selectedRegion}
            onChange={setSelectedRegion}
          />
        ))}
      </div>

      <h2 className="SelectedRegion">
        📍 선택된 지역 : <strong>{selectedRegion}</strong>
      </h2>

      {message && <div className={`Message ${messageType}`}>{message}</div>}

      <form className="WeatherForm">
        {Object.keys(votes).map((weather) => (
          <label
            key={weather}
            className={`WeatherOption ${
              selectedWeather === weather ? "selected" : ""
            } ${hasVoted ? "disabled" : ""}`}
          >
            <input
              type="radio"
              name="weather"
              value={weather}
              disabled={hasVoted}
              onChange={(e) => setSelectedWeather(e.target.value)}
              style={{ display: "none" }}
            />
            <div>{getIcon(weather)}</div>
            <div>{weather}</div>
          </label>
        ))}
      </form>

      <button
        onClick={handleVote}
        disabled={!selectedWeather || hasVoted}
        className={`VoteButton ${hasVoted ? "disabled" : ""}`}
      >
        ✏️ 투표하기
      </button>

      <h2 className="VoteResults">📊 투표 진행 결과</h2>
      <ul className="VoteResultItem">
        {Object.entries(votes).map(([weather, count]) => (
          <li key={weather}>
            {getIcon(weather)} {weather} : <strong>{count}표</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poll;
