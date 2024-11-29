// import "./home.css";
// import {
//   Col,
//   Form,
//   Row,
//   Card,
//   Container,
//   OverlayTrigger,
//   Popover,
//   Tooltip,
//   Modal,
// } from "react-bootstrap";

// import placeHolder from "../../assets/holderimg.png";
// import { BsChat } from "react-icons/bs";
// import emoji from "../../assets/icons/emoji 1.svg";
// import addEmoji from "../../assets/icons/addEmoji.svg";
// import like from "../../assets/icons/Like-emoji group.svg";
// import Repost from "../../assets/icons/Re-post icon.png";
// import edit from "../../assets/icons/edit.svg";
// import iconReposted from "../../assets/icons/icon-reposted.png";
// import DetailedPost from "./detailedPost.js";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { baseUrl } from "../../services/baseQuery";
// import {
//   useCreateCommentMutation,
//   useUpdatePostMutation,
// } from "../../services/posts";

// function UserContent({ post }) {

//   const postId = post._id
//   const user = useSelector((state) => state.user);
//   const threshold = 150;
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [displayText, setDisplayText] = useState("");
//   const CommentEditButton = () => <EditButton label="Edit comment" />;
//   // Effect to truncate text initially if it's longer than the threshold
//   React.useEffect(() => {
//     if (post.description.length > threshold) {
//       setDisplayText(`${post.description.substring(0, threshold)}... `);
//     } else {
//       setDisplayText(post.description);
//     }
//   }, [post.description, threshold]);
//   const [showModal, setShowModal] = useState(false);
//   const [comment, setComment] = useState("");
//   const [editPost, setEdited] = useState("");

//   const [addComment, {}] = useCreateCommentMutation();
//   const [updatePost, {}] = useUpdatePostMutation();

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handlePostChange = (event) => {
//     setEdited(event.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token"); // token reader
//       if (!token) {
//         throw new Error("No token found! User not authenticated.");
//       }

//       console.log("COMMENT", comment);

//       console.log("PASSING", { postId, comment });
//       const response = await addComment({ postId, comment });

//       console.log("REPSONSE COMMENTs", response);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       console.log("Result:", result);

//       if (result.status === "ok" && result.post) {
//         setPosts(result.posts);
//       } else {
//         console.error("Error fetching posts: Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const handleUpdatePostSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token"); // token reader
//       if (!token) {
//         throw new Error("No token found! User not authenticated.");
//       }

//       console.log("POST CONTENT", editPost);

//       console.log("PASSING", { postId, comment });
//       const response = await updatePost({ postId, comment });

//       console.log("REPSONSE UPDATE", response);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       console.log("Result:", result);

//       if (result.status === "ok" && result.post) {
//         setPosts(result.posts);
//       } else {
//         console.error("Error fetching posts: Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };
//   // console.log(user.userId);
//   // console.log(post.userId);
//   return (
//     <Container className=" p-0 my-3 round-l">
//       <Row className="post-row">
//         <Col
//           lg={7}
//           className="post-image-container"
//           style={{ height: "299px" }}
//         >
//           <img
//             src={post.image?.data || placeHolder}
//             style={{ width: "100%", height: "100%", objectFit: "contain" }}
//           ></img>
//         </Col>
//         <Col
//           lg={5}
//           className="d-flex flex-column g-0 px-2"
//           style={{ height: "auto" }}
//         >
//           <Row className="mx-2 my-3">
//             <Col lg={2} xs={5}>
//               <img
//                 className="avatar shadow"
//                 src={post.userDetails.picture}
//                 width={61}
//                 height={61}
//               ></img>
//             </Col>
//             <Col lg={8} xs={7} className="mx-2">
//               <Row>
//                 <Col>
//                   <p className="nopadding fs-15 fw-500">{post.userDetails.username}</p>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <p className="nopadding fs-12 fw-400">{post.desc}</p>
//                 </Col>
//               </Row>
//             </Col>
//             <Col lg={1}>
//               {/* {post.userId === user.userId ? ( */}
//               <button
//                 className="editpost-usercontent"
//                 onClick={() => setShowModal(true)}
//               >
//                 <img src={edit} width={25} height={25}></img>
//               </button>
//               {/* ) : (
//                 ""
//               )} */}
//             </Col>
//           </Row>

//           <Row className="mx-2">
//             <Col className="col-post-text-body">
//               <p className="fs-12 fw-400">{displayText}</p>

//               <span
//                 className="fs-12 fw-400"
//                 style={{ color: "blue", cursor: "pointer" }}
//                 onClick={() => setShowModal(true)}
//               >
//                 See More
//               </span>
//             </Col>
//             {showModal && (
//               <DetailedPost
//                 show={showModal}
//                 onHide={() => setShowModal(false)}
//                 avatar={post.userDetails.picture || placeHolder}
//                 user={post.userDetails.username}
//                 desc={post.userDescription}
//                 body={post.description}
//                 img={post.image?.data || placeHolder}
//               />
//             )}
//           </Row>

//           <Row className="mx-2 my-3 row-icons">
//             <button
//               className="btn btn-outline-0 pe-2"
//               style={{
//                 /* thumbs up emoji group */

//                 width: "53px",
//                 height: "32px",
//                 display: "flex",
//                 /* Inside auto layout */
//                 flex: "none",
//                 order: 0,
//                 flexGrow: 0,
//                 borderRadius: "100px",
//                 background: "white",
//                 gap: "10px",
//                 alignContent: "flexStart",
//                 padding: "5px",
//               }}
//             >
//               <img src={emoji} className="icon-userContent" />
//               {post.likes}
//             </button>
//             <button className="btn btn-outline-0 px-2 icon-button-userContent">
//               <img src={addEmoji}></img>{" "}
//             </button>
//             <button className="btn btn-outline-0 px-2 icon-button-userContent">
//               <img src={like} style={{ width: "19px", height: "18px" }}></img>{" "}
//             </button>
//             <button className="btn btn-outline-0 px-2 icon-button-userContent">
//               <img src={Repost}></img>{" "}
//             </button>
//           </Row>

//           <Row className="mb-3">
//             <Col className="mx-2">
//               {/* <div className="my-2 overline"></div> */}
//               <Form>
//                 <div className="input-group">
//                   <input
//                     className="form-control border-0 comment"
//                     type="text"
//                     placeholder="Add a comment..."
//                     onChange={handleCommentChange}
//                   />
//                   <span className="input-group-append">
//                     <button className="btn border-0 comment" type="button" onClick={handleCommentSubmit}>
//                       <BsChat className="flip" size={20} />
//                     </button>
//                   </span>
//                 </div>
//               </Form>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default UserContent;
import "./home.css";
import {
  Col,
  Form,
  Row,
  Container,
  Modal,
} from "react-bootstrap";
import axios from "axios"; // Added missing import
import placeHolder from "../../assets/holderimg.png";
import { BsChat } from "react-icons/bs";
import emojiIcon from "../../assets/icons/emoji 1.svg";
import addEmojiIcon from "../../assets/icons/addEmoji.svg";
import likeIcon from "../../assets/icons/Like-emoji group.svg";
import RepostIcon from "../../assets/icons/Re-post icon.png";
import editIcon from "../../assets/icons/edit.svg";
import DetailedPost from "./detailedPost.js";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function UserContent({ post }) {
  const postId = post._id;
  const user = useSelector((state) => state.user);
  const threshold = 150;

  // State variables
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Update displayed text based on post description length
  useEffect(() => {
    if (post?.description?.length > threshold) {
      setDisplayText(`${post.description.substring(0, threshold)}...`);
    } else {
      setDisplayText(post?.description || "No description available");
    }
  }, [post?.description]);

  // Handle comment change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Submit comment
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return; // Avoid submitting empty comments
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated.");

      const response = await axios.post("http://localhost:8080/api/comments", {
        postId,
        comment,
      });

      if (response.data.success) {
        console.log("Comment added:", response.data);
        setComment(""); // Clear input on success
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Toggle like reaction
  const toggleLike = async () => {
    const newLike = likeCount === 0 ? 1 : 0;
    setLikeCount(newLike);
    await handleEmojiReaction("👍", newLike === 1);
  };

  // Toggle heart reaction
  const toggleHeart = async () => {
    const newHeart = heartCount === 0 ? 1 : 0;
    setHeartCount(newHeart);
    await handleEmojiReaction("❤️", newHeart === 1);
  };

  // Toggle emoji dropdown
  const toggleEmojiDropdown = () => {
    setShowEmojiDropdown((prev) => !prev);
  };

  // Handle emoji reactions
  const handleEmojiReaction = async (emoji, isAdding) => {
    try {
      const reactionData = {
        username: user?.username || "Guest User",
        post: postId,
        emoji: isAdding ? emoji : "",
      };

      const response = await axios.post(
        "http://localhost:8080/api/reactions/add",
        reactionData
      );

      if (response.data.success) {
        setSelectedEmoji(isAdding ? emoji : null);
        console.log(
          isAdding ? "Reaction added successfully" : "Reaction removed",
          response.data
        );
      } else {
        throw new Error("Failed to update emoji reaction");
      }
    } catch (error) {
      console.error("Error with emoji reaction:", error.message);
    }
  };

  // Add custom emoji
  const addCustomEmoji = (emoji) => {
    handleEmojiReaction(emoji, selectedEmoji !== emoji);
    setShowEmojiDropdown(false);
  };

  return (
    <Container className="p-0 my-3 round-l">
      <Row className="post-row">
        <Col lg={7} className="post-image-container" style={{ height: "299px" }}>
          <img
            src={post?.image?.data || placeHolder}
            alt="Post"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Col>
        <Col lg={5} className="d-flex flex-column px-2">
          <Row className="mx-2 my-3">
            <Col lg={2}>
              <img
                className="avatar shadow"
                src={post?.userDetails?.picture || placeHolder}
                alt="User Avatar"
                width={61}
                height={61}
              />
            </Col>
            <Col lg={8} className="mx-2">
              <p className="fs-15 fw-500">
                {post?.userDetails?.username || "Unknown User"}
              </p>
              <p className="fs-12 fw-400">{post?.desc}</p>
            </Col>
            <Col lg={1}>
              <button
                className="editpost-usercontent"
                onClick={() => setShowModal(true)}
              >
                <img src={editIcon} alt="Edit" width={25} height={25} />
              </button>
            </Col>
          </Row>

          <Row className="mx-2">
            <Col>
              <p className="fs-12 fw-400">{displayText}</p>
              <span
                className="fs-12 fw-400 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              >
                See More
              </span>
            </Col>
            {showModal && (
              <DetailedPost
                show={showModal}
                onHide={() => setShowModal(false)}
                avatar={post?.userDetails?.picture || placeHolder}
                user={post?.userDetails?.username || "Unknown User"}
                desc={post?.userDescription}
                body={post?.description}
                img={post?.image?.data || placeHolder}
              />
            )}
          </Row>

          <Row className="mx-2 my-3 row-icons align-items-center">
            <div className="icon-container">
              <button
                className="btn btn-outline-0 d-flex align-items-center"
                onClick={toggleLike}
              >
                <img src={emojiIcon} className="icon-userContent" alt="Like" />
                <span className="ms-1">{likeCount}</span>
              </button>
              <button
                className="btn btn-outline-0 icon-button-userContent"
                onClick={toggleEmojiDropdown}
              >
                <img src={addEmojiIcon} alt="Add Emoji" />
              </button>
              {showEmojiDropdown && (
                <div className="emoji-dropdown">
                  {["😀", "😂", "😍", "😢", "👍"].map((emoji, index) => (
                    <span key={index} onClick={() => addCustomEmoji(emoji)}>
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
              {selectedEmoji && (
                <span
                  className="selected-emoji"
                  onClick={() => handleEmojiReaction(selectedEmoji, false)}
                >
                  {selectedEmoji}
                </span>
              )}
              <button
                className="btn btn-outline-0 icon-button-userContent"
                onClick={toggleHeart}
              >
                <img src={likeIcon} alt="Heart" />
                <span className="ms-1">{heartCount}</span>
              </button>
              <button className="btn btn-outline-0 icon-button-userContent">
                <img src={RepostIcon} alt="Repost" />
              </button>
            </div>

            <Form className="d-flex align-items-center flex-grow-1">
              <input
                className="form-control border-0 comment-input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleCommentChange}
              />
              <button
                className="btn border-0"
                type="button"
                onClick={handleCommentSubmit}
              >
                <BsChat size={20} />
              </button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default UserContent;
