import Top from "@/app/components/top/Top"
import TopList from "@/app/components/top/TopList"
import Loading from "@/app/loading"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import { Suspense } from "react"
import LayoutWithSidebar from "../components/layout/LayoutWithSidebar"

export const revalidate = 0

// メインページ
const HomePage = async () => {
  // 非同期で複数のデータを同時に取得
  const [latestBlogs, recommendedBlogs, specialBlogs] = await Promise.all([
    // 最新のブログ記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        orders: "-publishedAt",
        limit: 10,
      },
    }),

    // オススメ記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: "isRecommended[equals]true",
      },
    }),

    // 特集記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: "isSpecial[equals]true",
      },
    }),
  ])

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-10 mb-10">
        <Top blogs={recommendedBlogs.contents} />
        <LayoutWithSidebar>
          <TopList
            latestBlogs={latestBlogs.contents}
            recommendedBlogs={recommendedBlogs.contents}
            specialBlogs={specialBlogs.contents}
          />
        </LayoutWithSidebar>
      </div>
    </Suspense>
  )
}

export default HomePage
