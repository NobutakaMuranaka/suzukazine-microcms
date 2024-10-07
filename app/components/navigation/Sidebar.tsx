"use client"

import { microcms } from "@/lib/microcms"
import {
  BlogType,
  CategoryCountType,
  SidebarData,
} from "@/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

// サイドバーのデータを取得する関数
const fetchSidebarData = async (): Promise<SidebarData> => {
  const allBlogs = await microcms.getAllContents<BlogType>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
    },
  })

  // 最新の5件を取得
  const latestBlogs = allBlogs.slice(0, 5)

  // カテゴリごとの記事数を取得
  const extractCategoryCounts = (blogs: BlogType[]): CategoryCountType[] => {
    const categoryCounts = new Map<string, CategoryCountType>()
    blogs.forEach((blog) => {
      const { id, name } = blog.category
      const current = categoryCounts.get(id) || { id, name, count: 0 }
      categoryCounts.set(id, { ...current, count: current.count + 1 })
    })
    return Array.from(categoryCounts.values()).sort((a, b) => b.count - a.count)
  }

  return {
    latestBlogs,
    categoryCounts: extractCategoryCounts(allBlogs),
  }
}

// サイドバー
const Sidebar = () => {
  const { data: sidebarData, isLoading } = useQuery({
    queryKey: ["sidebarData"],
    queryFn: fetchSidebarData,
    staleTime: 1000 * 60 * 5, // 5分間キャッシュを保持
    refetchOnWindowFocus: true, // フォーカス時に再フェッチ
  })

  const latestBlogs = sidebarData?.latestBlogs || []
  const categoryCounts = sidebarData?.categoryCounts || []

  return (
    <div className="space-y-10">
      <div className="border flex flex-col items-center justify-center p-5 space-y-5">
        <Link href="/about">
          <Image
            src="/default.png"
            width={120}
            height={120}
            alt="avatar"
            className="rounded-full"
            priority={false}
          />
        </Link>

        <div className="font-bold text-xl">村中</div>

        <div className="text-sm">
          1999年生。三重県出身。筑波大学在学中、エンジニア社長のもとでSEOを1年間修行。個人でもゼロから立ち上げたWEBメディアを2年半かけてグロースさせ、法人に事業譲渡。新卒でBtoB SaaSの事業会社に就職し、オウンドメディアSEO、リスティング広告、ディスプレイ広告など幅広い業務のインハウス運用に従事（現職）。.jsとMicroCMSを使用したブログサイト構築チュートリアルです。技術ブログなど、すぐに運用できるようになっています。
        </div>
      </div>

      {/* 新着記事 */}
      <div className="space-y-5">
        <div className="font-bold border-l-4 border-black pl-2">新着記事</div>

        <div className="border text-sm">
          {isLoading ? (
            <div className="p-3 animate-pulse">Loading...</div>
          ) : (
            latestBlogs.map((blog, index, array) => (
              <Link
                href={`/blog/${blog.id}`}
                className={`grid grid-cols-3 hover:text-gray-500 group ${
                  index !== array.length - 1 ? "border-b" : ""
                }`}
                key={index}
              >
                <div className="col-span-1">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={blog.image.url}
                      fill
                      alt="new blog"
                      className="object-cover transition-transform duration-100 ease-in-out group-hover:scale-105"
                      loading="lazy"
                      priority={false}
                      sizes="100%"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-5">{blog.title}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* カテゴリ */}
      <div className="space-y-5">
        <div className="font-bold border-l-4 border-black pl-2">カテゴリ</div>

        <div className="border text-sm">
          {isLoading ? (
            <div className="p-3 animate-pulse">Loading...</div>
          ) : (
            categoryCounts.map((category, index, array) => (
              <Link
                href={`/category/${category.id}`}
                className={`p-3 flex items-center justify-between hover:text-gray-500 ${
                  index !== array.length - 1 ? "border-b" : ""
                }`}
                key={index}
              >
                <div>{category.name}</div>
                <div className="border py-1 px-4 text-sm">{category.count}</div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
