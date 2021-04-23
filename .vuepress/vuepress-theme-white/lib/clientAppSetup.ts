import { provide } from 'vue';
import { defineClientAppSetup, pagesData, resolvePageData } from '@vuepress/client';
export default defineClientAppSetup(() => {
    const tags: { [k: string]: number } = {}
    const titleList = []
    for (const v in pagesData.value) {
        resolvePageData(v).then(({ frontmatter }) => {
            const tag = frontmatter.tag as string
            const title = frontmatter.title
            title && titleList.push(String(title))
            if (tag) {
                if (tags[tag]) {
                    tags[tag]++
                } else {
                    tags[tag] = 1
                }
            }
        })
    }
    provide("titleList", titleList)
    provide("tags", tags)
});
