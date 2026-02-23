


"use client";

import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Eye, EyeOff, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

// Assuming these are in a separate file
import { ProfileHeaderSkeleton } from "./Skleton";

function FormSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-[48px] w-full bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-[48px] w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

interface ProfileFormData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  avatar: string;
}

export default function UpdatePersonalInfo() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    avatar: "/images/default-avatar.png",
  });

  const [prevAvatar, setPrevAvatar] = useState<string>(formData.avatar);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Fetch current profile ──────────────────────────────────────────────
  const { isLoading} = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const json = await res.json();
      if (!json.status || !json.data) throw new Error(json.message || "Invalid response");

      const user = json.data;

      const newFormData = {
        fullName: user.name || "",
        email: user.email || "",
        dateOfBirth: user.dob || "",
        gender: user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "",
        address:
          [user.address?.roadArea, user.address?.cityState, user.address?.country, user.address?.postalCode]
            .filter(Boolean)
            .join(", ") || "",
        avatar: user.profileImage || "/images/default-avatar.png",
      };

      setFormData(newFormData);
      setPrevAvatar(newFormData.avatar);
      return user;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // ─── Update profile mutation ────────────────────────────────────────────
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<ProfileFormData>) => {
      if (!token) throw new Error("No authentication token");

      const payload = {
        name: data.fullName,
        dob: data.dateOfBirth,
        gender: (data.gender || "").toLowerCase(),
        address: {
          roadArea: (data.address ?? "").split(", ")[0] || "",
          cityState: (data.address ?? "").split(", ")[1] || "",
          country: (data.address ?? "").split(", ")[2] || "",
          postalCode: (data.address ?? "").split(", ")[3] || "",
        },
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  // ─── Change password mutation ───────────────────────────────────────────
  const changePasswordMutation = useMutation({
    mutationFn: async (payload: { oldPassword: string; newPassword: string }) => {
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = "Failed to change password";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setPasswords({ current: "", newPass: "", confirm: "" });
      setShowPasswords({ current: false, newPass: false, confirm: false });
    },
    onError: (err) => {
      toast.error(err.message || "Could not change password. Please try again.");
    },
  });

  // ─── Upload avatar mutation ─────────────────────────────────────────────
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!token) throw new Error("Not authenticated");

      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file (jpg, png, etc.)");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size should be less than 5MB");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("profileImage", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/upload-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        let message = "Failed to upload avatar";
        try {
          const err = await res.json();
          message = err.message || message;
        } catch {}
        throw new Error(message);
      }

      return res.json();
    },

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (response: any) => {
      const newUrl =
        response?.data?.profileImage ||
        response?.data?.avatar ||
        response?.profileImage ||
        response?.avatar ||
        response?.url ||
        response?.image ||
        formData.avatar;

      setFormData((prev) => ({ ...prev, avatar: newUrl }));
      setPrevAvatar(newUrl);

      toast.success("Avatar uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },

    onError: (err) => {
      toast.error(err.message || "Avatar upload failed");
      // Revert preview
      setFormData((prev) => ({ ...prev, avatar: prevAvatar }));
    },
  });

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPrevAvatar(formData.avatar);           // save old for revert
    setFormData((prev) => ({ ...prev, avatar: previewUrl }));

    uploadAvatarMutation.mutate(file);

    // Cleanup
    e.target.value = "";
    setTimeout(() => URL.revokeObjectURL(previewUrl), 1500);
  };

  const handleSubmit = () => {
    updateProfileMutation.mutate(formData);
  };

  const handlePasswordSave = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwords.newPass !== passwords.confirm) {
      toast.error("New password and confirmation do not match");
      return;
    }

    if (passwords.newPass.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    changePasswordMutation.mutate({
      oldPassword: passwords.current,
      newPassword: passwords.newPass,
    });
  };

  const labelClass = "text-base font-medium text-[#707070]";
  const inputClass = "h-[48px] rounded-[4px] border-[#0000001A] text-base text-[#272727] placeholder:text-base placeholder:text-[#272727]";
  const selectClass = "h-[48px] rounded-[4px] border-[#0000001A] text-base text-[#272727] [&>span]:text-base [&>span]:text-[#272727]";

  return (
    <div className="min-h-screen px-2 py-8">
      <h1 className="text-[24px] font-semibold text-[#272727] mb-2 mt-0">Setting</h1>

      <div className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-6">
        <span className="text-[#595959] text-base cursor-pointer hover:text-[#595959]/90 transition-colors">
          Dashboard
        </span>
        <span className="text-[#595959] text-base">›</span>
        <span className="text-[#595959] text-base font-medium">Setting</span>
      </div>

      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <div className="rounded-xl px-7 py-5 flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-[120px] h-[120px] shrink-0">
              <Image
                width={120}
                height={120}
                src={formData.avatar}
                alt="Profile"
                className="w-[120px] h-[120px] rounded-full object-cover border-2 border-gray-200"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadAvatarMutation.isPending}
                className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 hover:bg-blue-700 border-2 border-white rounded-full flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                title="Change photo"
              >
                {uploadAvatarMutation.isPending ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Pencil className="w-[10px] h-[10px] text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <p className="font-bold text-[20px] text-[#131313] leading-tight">
                {formData.fullName || "User"}
              </p>
              <p className="text-[16px] text-[#616161] mt-0.5">@{formData.email.split("@")[0] || "user"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#595959] text-[#595959] hover:bg-transparent bg-transparent medium text-base h-[43px] px-5"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </Button>
            <Button
              disabled={updateProfileMutation.isPending}
              onClick={handleSubmit}
              className="bg-[#0024DA] hover:bg-[#0024DA]/90 text-white font-semibold text-base h-[43px] px-5 flex items-center gap-2"
            >
              <Pencil className="w-3.5 h-3.5" />
              {updateProfileMutation.isPending ? "Saving..." : "Update Profile"}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Full Name</Label>
            <Input
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Email (read-only) */}
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Email</Label>
            <Input
              type="email"
              value={formData.email}
              disabled
              className={`${inputClass} bg-gray-50 cursor-not-allowed`}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Date of Birth</Label>
            <Input
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              placeholder="YYYY-MM-DD"
              className={inputClass}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Gender</Label>
            <Select value={formData.gender} onValueChange={(val) => handleChange("gender", val)}>
              <SelectTrigger className={selectClass}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label className={labelClass}>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your full address"
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      <Dialog
        open={showPasswordModal}
        onOpenChange={(open) => {
          setShowPasswordModal(open);
          if (!open) {
            setShowPasswords({ current: false, newPass: false, confirm: false });
          }
        }}
      >
        <DialogContent className="sm:max-w-[440px] p-7">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-gray-900">Change Password</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1.5">
              <Label className={labelClass}>Current Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707070] hover:text-[#272727]"
                  aria-label={showPasswords.current ? "Hide" : "Show"} 
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className={labelClass}>New Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.newPass ? "text" : "password"}
                  value={passwords.newPass}
                  onChange={(e) => setPasswords((p) => ({ ...p, newPass: e.target.value }))}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, newPass: !prev.newPass }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707070] hover:text-[#272727]"
                  aria-label={showPasswords.newPass ? "Hide" : "Show"}
                >
                  {showPasswords.newPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className={labelClass}>Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707070] hover:text-[#272727]"
                  aria-label={showPasswords.confirm ? "Hide" : "Show"}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                disabled={changePasswordMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordSave}
                disabled={changePasswordMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
              >
                {changePasswordMutation.isPending ? "Changing..." : "Save Password"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}