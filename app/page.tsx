"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingScreen from "@/components/ui/loading-screen";
import { TrendingItem } from "@/lib/interface";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendings, setTrendings] = useState<TrendingItem[]>([]);
  useEffect(() => {
    const fetchTrendings = async () => {
      try {
        const response = await axios.get("/api/trendings");
        const data = response.data;
        setTrendings(data);
      } catch {
        setError("Error fetching trendings data");
      }
      setIsFetching(false);
    };
    fetchTrendings();
  }, []);

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <main className="h-full px-3 pt-2">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold mb-4">
          Current Trendings
        </h1>
      </div>

      {/* Series & Movies */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {trendings.map((item) => (
            <Card key={item.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-[0.7rem] lg:text-sm">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-0 h-[300px]">
                <Image
                  src={item.img}
                  alt="thumbnail"
                  width={1062}
                  height={750}
                  className="h-full w-auto rounded-lg"
                />
              </CardContent>
              <CardFooter className="flex justify-center items-center">
                {item.type ? (
                  <CardAction className="cursor-pointer">
                    View {item.type}
                  </CardAction>
                ) : (
                  <CardAction className="cursor-pointer">View</CardAction>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
