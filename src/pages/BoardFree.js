import { useState, useEffect, useRef } from "react";
import {
  MdAdd,
  MdRemoveCircleOutline,
  MdEdit,
  MdCheck,
  MdClose,
} from "react-icons/md";
import { AutoSizer, List } from "react-virtualized";
import { Link } from "react-router-dom";
import { getRandomPostContent } from "./Utils";
import "./Board.scss";

// 초기에 불러올 게시글 수
const postLoad = 50;
// 스크롤 시 추가로 불러올 게시글 수
const scrollLoadCount = 50;

const BoardFree = () => {
  // 입력창의 텍스트 값
  const [value, setValue] = useState("");
  // 게시글 배열
  const [posts, setPosts] = useState([]);
  // 게시글 불러오는 중 여부
  const [loading, setLoading] = useState(true);
  // 현재 수정 중인 게시글 ID
  const [editingId, setEditingId] = useState(null);
  // 수정 중인 게시글의 텍스트 값
  const [editValue, setEditValue] = useState("");
  // 지금까지 불러온 게시글 수
  const loadedCountRef = useRef(0);

  // 컴포넌트 마운트 시 더미 게시글 생성
  useEffect(() => {
    const initialPosts = Array.from({ length: postLoad }, (_, index) => ({
      id: index,
      content: getRandomPostContent(), // 임시로 자연스러운 게시물 내용 생성
    }));
    setPosts(initialPosts);
    loadedCountRef.current = postLoad;
    setLoading(false);
  }, []);

  // 입력값 변경 핸들러
  const onChange = (e) => setValue(e.target.value);

  // 게시글 추가 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const newPost = { id: Date.now(), content: value };
    setPosts((prev) => [newPost, ...prev]);
    setValue("");
  };

  // 게시글 삭제 핸들러
  const onRemove = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  // 게시글 추가 핸들러 (엔터키로 제출)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  // 게시글 수정 모드 진입
  const onEdit = (id, currentContent) => {
    setEditingId(id);
    setEditValue(currentContent);
  };

  // 수정 중 텍스트 변경
  const onEditChange = (e) => setEditValue(e.target.value);

  // 수정 취소
  const onEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  // 수정 저장
  const onEditSave = (id) => {
    if (!editValue.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, content: editValue } : post
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  // 스크롤 시 더 많은 게시글 로드
  const loadMoreItems = () => {
    if (loading || loadedCountRef.current >= 5000000) return;
    setLoading(true);

    setTimeout(() => {
      const nextItems = Array.from({ length: scrollLoadCount }, (_, i) => {
        const index = loadedCountRef.current + i;
        return {
          id: index,
          content: getRandomPostContent(), // 임시로 자연스러운 게시물 내용 생성
        };
      });

      setPosts((prev) => [...prev, ...nextItems]);
      loadedCountRef.current += scrollLoadCount;
      setLoading(false);
    }, 200);
  };

  // 게시글 렌더링하는 함수 (react-virtualized용)
  const rowRenderer = ({ index, style }) => {
    const post = posts[index];
    const isEditing = editingId === post.id;

    return (
      <div key={post.id} style={style} className="PostItem">
        {isEditing ? (
          <div className="EditArea">
            <input
              value={editValue}
              onChange={onEditChange}
              className="EditInput"
            />
            <button onClick={() => onEditSave(post.id)}>
              <MdCheck />
            </button>
            <button onClick={onEditCancel}>
              <MdClose />
            </button>
          </div>
        ) : (
          <>
            <span className="PostContent">{post.content}</span>
            <div className="PostButtons">
              <button onClick={() => onEdit(post.id, post.content)}>
                <MdEdit />
              </button>
              <button onClick={() => onRemove(post.id)}>
                <MdRemoveCircleOutline />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  // 스크롤 하단 도달 시 게시글 추가 로드
  const onRowsRendered = ({ stopIndex }) => {
    if (stopIndex >= posts.length - 1) {
      loadMoreItems();
    }
  };

  return (
    <div className="BoardWrapper">
      {/* 게시판 이동 */}
      <div className="BoardTopNav">
        <div className="BoardTitle">💬 자유 게시판 💬</div>
        <Link to="/board/food" className="MoveToFoodBoard">
          🍽️ 맛집 게시판으로 이동
        </Link>
      </div>

      {/* 글 작성 폼 */}
      <form className="Board" onSubmit={onSubmit}>
        <textarea
          placeholder="내용을 입력하세요"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          rows={1}
        />
        <button type="submit">
          <MdAdd />
        </button>
      </form>

      {/* 게시글이 없는 경우 */}
      {!loading && posts.length === 0 && <div>게시글이 없습니다.</div>}

      {/* 게시글 목록 (가상 스크롤 리스트) */}
      <div
        className="PostList"
        style={{
          width: "100%",
          height: "580px",
          margin: "20px",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={posts.length}
              rowHeight={60}
              rowRenderer={rowRenderer}
              onRowsRendered={onRowsRendered}
              style={{ outline: "none" }}
            />
          )}
        </AutoSizer>
        {loading && posts.length > 0 && (
          <div className="LoadingMore">불러오는 중...</div>
        )}
      </div>
    </div>
  );
};

export default BoardFree;
