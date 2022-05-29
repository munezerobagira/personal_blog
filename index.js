const fs = require("fs");
const matter = require("gray-matter");
const { resolve: resolvePath } = require("path");
const blogs = {
  published: [],
  unplished: [],
};
fs.readdirSync(resolvePath(__dirname, "blogs")).forEach(function (file) {
  if (file.endsWith(".md")) {
    const filePath = resolvePath(__dirname, "blogs", file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const { title, date, categories, published, _id } = data;
    if (_id) {
      blogs.published.push(_id);
    } else {
      blogs.unplished.push(file);
    }
    const slug = file.replace(".md", "");
    const blog = {
      title,
      date,
      tags,
      slug,
      content,
    };
    blogs.push(blog);
  }
});
blogs.unplished.forEach(() => {});
console.log(blogs);

