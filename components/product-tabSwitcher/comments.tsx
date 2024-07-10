"use client";
import { useEffect, useState } from "react";
import { getDataFromCookie } from "@/helpers/cookie";
import useCommentStore from "@/store/comments";
import TextArea from "antd/es/input/TextArea";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CommentData } from "@/types/comment-types";
import { smileEmojiIcon } from "@/assets/icons/global";
import { useRouter } from "next/navigation";

const CommentsTab = () => {
  const router = useRouter();
  const token = getDataFromCookie("access_token");
  const prID: any = getDataFromCookie("product_id");
  const { getComments, countComment, dataComments, createComment } =
    useCommentStore();
  const [comment, setComment] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function getCm() {
      if (prID) {
        await getComments(prID);
      }
    }
    getCm();
  }, [prID, getComments]);

  const handleEmojiSelect = (emoji: any) => {
    setComment((prevComment) => prevComment + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      if (prID) {
        setIsSubmitting(true);
        const resStatus = await createComment({
          comment,
          product_id: parseInt(prID, 10),
        });
        if (resStatus === 201) {
          setComment("");
        }
        setIsSubmitting(false);
      }
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="w-full p-8 rounded-lg bg-white grid gap-3">
      {dataComments.length > 0 ? (
        <>
          <h1>Hamma sharhlar, {countComment || 0} sharh</h1>
          <div
            className={`${
              dataComments.length > 0 ? `h-[500px]` : `h-[30px]`
            } border p-5 overflow-y-scroll`}
          >
            {dataComments?.map((item: CommentData, i: number) => (
              <div key={i} className="border-b-2 py-5">
                <div className="flex gap-10 items-center mb-3">
                  <b className="block">
                    {item.user_id.first_name} {item.user_id.last_name}
                  </b>
                  <small className="text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <span>{item.comment}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span className="text-gray-400 text-center">
          Sharhlar hali mavjud emas
        </span>
      )}

      <div>
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <TextArea
            rows={2}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Shu yerda o'z fikringizni yozing..."
            className="text-[18px] py-0 md:py-2"
          />
          <div className="flex justify-between gap-3 relative">
            <button
              type="button"
              className="rounded-lg p-1 px-5 bg-[#f0f0f0]"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {smileEmojiIcon}
            </button>
            <div className="absolute z-50 top-10">
              {showEmojiPicker && (
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              )}
            </div>
            <button
              type="submit"
              className="bg-[#FF6F14] text-white rounded-lg p-1 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Yuborilmoqda" : "Yuborish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsTab;
