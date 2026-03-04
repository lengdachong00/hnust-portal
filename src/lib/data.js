import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/data/articles');

export function getAllArticles() {
    if (!fs.existsSync(articlesDirectory)) return [];
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...data,
        };
    });
    return allArticlesData;
}

export function getArticleData(slug) {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(articlesDirectory, `${decodedSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
        slug: decodedSlug,
        content,
        ...data,
    };
}
