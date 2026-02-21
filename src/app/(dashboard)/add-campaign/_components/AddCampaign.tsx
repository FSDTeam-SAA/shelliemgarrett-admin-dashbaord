"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload, ImagePlus, X } from "lucide-react";
import Image from "next/image";

export default function AddCampaign() {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [raisedGoals, setRaisedGoals] = useState("");
  const [studentFile, setStudentFile] = useState<File | null>(null);
  const [isDragOverDoc, setIsDragOverDoc] = useState(false);
  const [isDragOverImg, setIsDragOverImg] = useState(false);
  const [campaignPhotos, setCampaignPhotos] = useState<
    { file: File; preview: string }[]
  >([]);

  const docInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  // --- Document drag & drop ---
  const handleDocDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverDoc(true);
  }, []);
  const handleDocDragLeave = useCallback(() => setIsDragOverDoc(false), []);
  const handleDocDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverDoc(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setStudentFile(file);
  }, []);
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setStudentFile(file);
  };

  // --- Image drag & drop ---
  const handleImgDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverImg(true);
  }, []);
  const handleImgDragLeave = useCallback(() => setIsDragOverImg(false), []);
  const handleImgDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverImg(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    addPhotos(files);
  }, []);
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addPhotos(files);
  };

  const addPhotos = (files: File[]) => {
    const newPhotos = files.slice(0, 5 - campaignPhotos.length).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setCampaignPhotos((prev) => [...prev, ...newPhotos].slice(0, 5));
  };

  const removePhoto = (index: number) => {
    setCampaignPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handlePublish = () => {
    if (!campaignName.trim()) {
      alert("Please enter a campaign name.");
      return;
    }
    alert("Campaign published successfully!");
  };

  // Build 5 photo slots
  const photoSlots = Array.from(
    { length: 5 },
    (_, i) => campaignPhotos[i] || null,
  );

  return (
    <div className="min-h-screen px-6 py-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-bold text-gray-900">Add Campaign</h1>
        <Button
          onClick={handlePublish}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm h-[38px] px-5 flex items-center gap-2"
        >
          Publish Campaign
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Top Form Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
        {/* Campaign Name */}
        <div className="mb-4">
          <Label className="text-[13px] font-medium text-gray-600 mb-1.5 block">
            Campaign Name
          </Label>
          <Input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Type Product name here ..."
            className="border-gray-200 focus-visible:ring-blue-500 text-gray-800 text-sm h-[42px]"
          />
        </div>

        {/* Campaign Description */}
        <div className="mb-4">
          <Label className="text-[13px] font-medium text-gray-600 mb-1.5 block">
            Campaign Description
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type Product description here ..."
            rows={4}
            className="border-gray-200 focus-visible:ring-blue-500 text-gray-800 text-sm resize-none"
          />
        </div>

        {/* Raised Goals */}
        <div className="mb-5">
          <Label className="text-[13px] font-medium text-gray-600 mb-1.5 block">
            Raised Goals
          </Label>
          <Input
            value={raisedGoals}
            onChange={(e) => setRaisedGoals(e.target.value)}
            placeholder="Enter Amount"
            type="number"
            className="border-gray-200 focus-visible:ring-blue-500 text-gray-800 text-sm h-[42px]"
          />
        </div>

        {/* Upload Student List */}
        <div>
          <Label className="text-[13px] font-medium text-gray-600 mb-1.5 block">
            Upload student list
          </Label>
          <div
            onDragOver={handleDocDragOver}
            onDragLeave={handleDocDragLeave}
            onDrop={handleDocDrop}
            onClick={() => docInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer transition-colors select-none ${
              isDragOverDoc
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5 text-blue-500" />
            </div>
            {studentFile ? (
              <p className="text-sm font-medium text-blue-600">
                {studentFile.name}
              </p>
            ) : (
              <p className="text-sm text-gray-400">Drag and drop doc here</p>
            )}
            <input
              ref={docInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
              className="hidden"
              onChange={handleDocChange}
            />
          </div>
        </div>
      </div>

      {/* Campaign Photos Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <Label className="text-[13px] font-medium text-gray-600 mb-3 block">
          Campaign Photos
        </Label>

        {/* Main Drop Zone */}
        <div
          onDragOver={handleImgDragOver}
          onDragLeave={handleImgDragLeave}
          onDrop={handleImgDrop}
          onClick={() => imgInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-14 cursor-pointer transition-colors select-none mb-4 ${
            isDragOverImg
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <ImagePlus className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-400">
            Drag and drop image here, or click add image
          </p>
          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImgChange}
          />
        </div>

        {/* Photo Slots Row */}
        <div className="grid grid-cols-5 gap-3">
          {photoSlots.map((photo, index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden relative bg-gray-50"
            >
              {photo ? (
                <>
                  <Image
                    width={300}
                    height={400}
                    src={photo.preview}
                    alt={`image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <span className="text-[11px] text-gray-400">
                  image {index + 1}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
