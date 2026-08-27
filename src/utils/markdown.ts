export interface InsightPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

// Custom lightweight frontmatter parser for the browser
const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /^---(?:\r?\n)([\s\S]*?)(?:\r?\n)---(?:\r?\n)?([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: fileContent };
  }
  
  const frontmatterStr = match[1];
  const content = match[2];
  
  const data: Record<string, string> = {};
  
  frontmatterStr.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });
  
  return { data, content };
};

export const getInsights = (): InsightPost[] => {
  const files = import.meta.glob('../content/insights/*.md', { query: '?raw', import: 'default', eager: true });
  
  const posts: InsightPost[] = [];

  for (const path in files) {
    const filename = path.replace('../content/insights/', '').replace('.md', '');
    const fileContent = files[path] as string;
    
    try {
      const { data, content } = parseFrontmatter(fileContent);
      posts.push({
        slug: filename,
        title: data.title || '',
        category: data.category || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        image: data.image || '',
        content: content,
      });
    } catch (e) {
      console.error("Error parsing markdown file:", path, e);
    }
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getInsightBySlug = (slug: string): InsightPost | undefined => {
  const posts = getInsights();
  return posts.find((p) => p.slug === slug);
};
