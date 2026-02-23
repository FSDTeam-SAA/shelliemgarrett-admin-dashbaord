"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import Image from "next/image";

interface ProfileData {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  avatar: string;
}

export default function UpdatePersonalInfo() {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Mr. Raja",
    userName: "raja123",
    email: "raja123@gmail.com",
    phoneNumber: "+1 (888) 000-0000",
    dateOfBirth: "15 April 2001",
    gender: "Male",
    address: "00000 Artesia Blvd, Suite A-000",
    avatar: "/images/profile.jpg",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleSubmit = () => {
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handlePasswordSave = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      alert("Please fill in all fields.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    setShowPasswordModal(false);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setSuccessMsg("Password changed successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="min-h-screen px-10 py-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-1">
        <span className="text-gray-500 cursor-pointer hover:text-blue-600 transition-colors">
          Dashboard
        </span>
        <span className="text-gray-300">›</span>
        <span className="text-gray-600 font-medium">Setting</span>
      </div>

      <h1 className="text-[22px] font-bold text-gray-900 mb-6 mt-0">Setting</h1>

      {/* Success Message */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 text-sm font-medium mb-5">
          ✓ {successMsg}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl px-7 py-5 flex items-center justify-between mb-6 shadow-sm flex-wrap gap-4">

        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="relative w-[68px] h-[68px] shrink-0">
            <Image
            width={300}
            height={300}
              src={profile.avatar}
              alt="avatar"
              className="w-[68px] h-[68px] rounded-full object-cover border-2 border-gray-200"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 hover:bg-blue-700 border-2 border-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              title="Change photo"
            >
              <Pencil className="w-[10px] h-[10px] text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div>
            <p className="font-bold text-[17px] text-gray-900 leading-tight">
              {profile.fullName}
            </p>
            <p className="text-[13px] text-gray-400 mt-0.5">
              @{profile.userName}
            </p>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm h-[38px] px-5"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm h-[38px] px-5 flex items-center gap-2"
            onClick={handleSubmit}
          >
            <Pencil className="w-3.5 h-3.5" />
            Update Profile
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl p-7 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-5">

          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-gray-600">
              Full Name
            </Label>
            <Input
              value={profile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter full name"
              className="border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-400 text-gray-800 text-sm h-[44px]"
            />
          </div>

          {/* User Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-gray-600">
              User Name
            </Label>
            <Input
              value={profile.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              placeholder="Enter username"
              className="border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-400 text-gray-800 text-sm h-[44px]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-gray-600">
              Email
            </Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
              className="border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-400 text-gray-800 text-sm h-[44px]"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-gray-600">
              Phone Number
            </Label>
            <Input
              value={profile.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="+1 (000) 000-0000"
              className="border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-400 text-gray-800 text-sm h-[44px]"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-gray-600">
              date of Birth
            </Label>
            <Input
              value={profile.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              placeholder="DD Month YYYY"
              className="border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-400 text-gray-800 text-sm h-[44px]"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-gray-600">
              Gender
            </Label>
            <Select
              value={profile.gender}
              onValueChange={(val) => handleChange("gender", val)}
            >
              <SelectTrigger className="border-gray-200 focus:ring-blue-500 text-gray-800 text-sm h-[44px]">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address — full width */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label className="text-[13px] font-medium text-gray-600">
              Address
            </Label>
            <Input
              value={profile.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your address"
              className="border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-400 text-gray-800 text-sm h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-[440px] p-7">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-gray-900">
              Change Password
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-1">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-medium text-gray-600">
                Current Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, current: e.target.value }))
                }
                className="border-gray-200 focus-visible:ring-blue-500 text-sm h-[44px]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-medium text-gray-600">
                New Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwords.newPass}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, newPass: e.target.value }))
                }
                className="border-gray-200 focus-visible:ring-blue-500 text-sm h-[44px]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-medium text-gray-600">
                Confirm New Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, confirm: e.target.value }))
                }
                className="border-gray-200 focus-visible:ring-blue-500 text-sm h-[44px]"
              />
            </div>

            <div className="flex justify-end gap-3 mt-1">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 font-medium text-sm"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm"
                onClick={handlePasswordSave}
              >
                Save Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}