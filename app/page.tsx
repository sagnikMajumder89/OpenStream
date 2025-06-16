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
import Error from "@/components/ui/error";
import LoadingScreen from "@/components/ui/loading-screen";
import { TrendingData } from "@/lib/interface";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [trendings, setTrendings] = useState<TrendingData[]>([]);
  useEffect(() => {
    const fetchTrendings = async () => {
      try {
        const response = await axios.get("/api/trendings");
        const data = response.data;
        setTrendings(data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { error?: string })?.error ||
            "Error fetching trendings data"
        );
      }
      setIsFetching(false);
    };
    fetchTrendings();
  }, []);

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="h-full px-5 pt-2 pb-4">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold mb-4">
          Current Trendings
        </h1>
      </div>

      {/* Series & Movies */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trendings.map((item) => (
            <Card
              key={`${item.type}-${item.id}`}
              className="w-full cursor-pointer hover:opacity-82 transition-opacity duration-300"
              onClick={() => {
                router.push(`/${item.type.toLowerCase()}/${item.id}`);
              }}
            >
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-[0.7rem] lg:text-sm line-clamp-2">
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
                <CardAction className="cursor-pointer">
                  View {item.type}
                </CardAction>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
