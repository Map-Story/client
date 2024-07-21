"use client";
import { nextArrow, plus, prevArrow } from "@/public/upload";
import Image from "next/image";
import React, { useRef, useState } from "react";

const UploadPage = () => {
  const count = 1;
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };
  const handleChange = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    // 합체!
    setImages((prev) => prev.concat(selectedFiles));
  };

  return (
    <div className="pt-[48px]">
      <header className="flex px-4 h-[70px] justify-between items-center">
        <div className="flex gap-[10px]">
          <Image
            src={prevArrow}
            width={25}
            height={19}
            alt="뒤로가기"
            className="my-auto"
          />
          <p className="ml-[10px] text-[26px] font-semibold">
            {"앨범에서 선택"}
          </p>
        </div>
        <button className="font-semibold">취소</button>
      </header>
      <main className="mt-[516px] border-main border-t-2 px-[14px] flex flex-col h-full gap-[31px] py-[28px]">
        <div className="flex justify-between">
          <p>1~12개 사진을 선택하세요</p>
          <button className="p-3 bg-main rounded-[27px] w-[89px] h-[37px] flex justify-center items-center text-white font-semibold gap-2">
            다음
            <Image
              src={nextArrow}
              width={17}
              height={13}
              alt="다음화살표"
              className="my-auto"
            />
          </button>
        </div>
        <form className="flex gap-3 overflow-x-scroll overflow-y-hidden scrolling-touch whitespace-nowrap ms-overflow-none scrollbar-hide">
          {images.map((url, idx) => (
            <div
              key={url}
              className="bg-gray min-w-[125px] h-[125px] rounded-xl overflow-hidden"
            >
              <Image
                src={url}
                alt={`image${idx}`}
                width={125}
                height={125}
                //sizes="100%"
              />
            </div>
          ))}
          <div
            className="bg-gray min-w-[125px] h-[125px] rounded-xl flex justify-center items-center cursor-pointer"
            onClick={handleClick}
          >
            <div className="border-2 border-black border-dashed w-[100px] h-[100px] rounded-xl flex justify-center items-center">
              <Image src={plus} alt="추가버튼" width={30} height={30} />
              <input
                onChange={handleChange}
                ref={fileRef}
                accept="image/*"
                multiple
                type="file"
                className="hidden"
              />
            </div>
          </div>
        </form>
        <div className="flex gap-6">
          <button className="w-[189px] h-[57px] bg-main rounded-2xl text-white font-bold text-[20px]">
            임시저장
          </button>
          <button className="w-[189px] h-[57px] bg-main rounded-2xl text-white font-bold text-[20px]">
            업로드({count})
          </button>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
