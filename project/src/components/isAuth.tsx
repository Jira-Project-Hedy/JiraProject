"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useDataContext } from "@/context/data.context";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { user } = useDataContext()


    useEffect(() => {
      if (!user) {
        return redirect("/");
      }
    }, [user]);


    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}