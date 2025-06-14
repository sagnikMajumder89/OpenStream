"use client";

import PasswordDialog from "@/components/player/password-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "video.js/dist/types/tech/middleware";

export default function SeriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [password, setPassword] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const handlePasswordChange = (newPassword: string) => {
    document.cookie = `feedback=${newPassword}; path=/; max-age=2592000;`;
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setPassword(true);
  };

  useEffect(() => {
    const password = document.cookie
      .split("; ")
      .find((row) => row.startsWith("feedback="))
      ?.split("=")[1];
    if (password) setPassword(true);
    const check = async () => {
      try {
        await axios.get("/api/check");
      } catch {
        document.cookie = "feedback=; path=/; max-age=0;";
        setPassword(false);
        setIsDialogOpen(true);
      }
    };
    check();
  });

  if (!password) {
    return (
      <PasswordDialog
        open={isDialogOpen}
        setPassword={handlePasswordChange}
        onClose={handleDialogClose}
      />
    );
  }

  return <div>{children}</div>;
}
